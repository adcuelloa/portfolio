// Built-output audit for canonical, hreflang, html[lang] and sitemap consistency.
// Run after `pnpm build`. Usage: node scripts/hreflang-audit.mjs
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();
const out = join(root, "dist", "client");
const site = "https://cuello.dev";
if (!existsSync(out)) throw new Error("dist/client is missing; run pnpm build first");

const walk = (dir) =>
  readdirSync(dir).flatMap((n) =>
    statSync(join(dir, n)).isDirectory() ? walk(join(dir, n)) : [join(dir, n)]
  );

/** dist/client/es.html → /es ; index.html → / (matches `build.format: "file"` + `trailingSlash: "never"`) */
const toPath = (file) => {
  const rel = `/${relative(out, file).replace(/\\/g, "/")}`.replace(/\.html$/, "");
  return rel === "/index" ? "/" : rel.replace(/\/index$/, "");
};

const attr = (tag, name) => tag.match(new RegExp(`${name}="([^"]*)"`))?.[1];
const pages = new Map();
for (const file of walk(out).filter((f) => f.endsWith(".html"))) {
  const html = readFileSync(file, "utf8");
  const head = html.match(/<head>([\s\S]*?)<\/head>/)?.[1] ?? "";
  pages.set(toPath(file), {
    lang: html.match(/<html[^>]*\blang="([^"]+)"/)?.[1],
    canonical: attr(head.match(/<link[^>]*rel="canonical"[^>]*>/)?.[0] ?? "", "href"),
    robots: attr(head.match(/<meta[^>]*name="robots"[^>]*>/)?.[0] ?? "", "content") ?? "",
    alternates: [...head.matchAll(/<link[^>]*rel="alternate"[^>]*hreflang="[^"]*"[^>]*>/g)].map(
      ([tag]) => ({
        hreflang: attr(tag, "hreflang"),
        href: attr(tag, "href"),
      })
    ),
  });
}

const errors = [];
const urlToPath = (href) => new URL(href).pathname;
const exists = (href) => pages.has(urlToPath(href));

for (const [path, page] of pages) {
  const noindex = page.robots.includes("noindex");
  const expectedLang = path === "/es" || path.startsWith("/es/") ? "es" : "en";
  if (page.lang !== expectedLang)
    errors.push(`${path}: html lang="${page.lang}", expected "${expectedLang}"`);

  if (noindex) {
    if (page.canonical) errors.push(`${path}: noindex page should not declare a canonical`);
    if (page.alternates.length) errors.push(`${path}: noindex page should not declare hreflang`);
    continue;
  }

  const self = new URL(path, site).href;
  if (page.canonical !== self) errors.push(`${path}: canonical ${page.canonical} ≠ ${self}`);
  for (const { hreflang, href } of page.alternates) {
    if (/.\/$/.test(new URL(href).pathname))
      errors.push(`${path}: hreflang ${hreflang} has a trailing slash (redirects): ${href}`);
    if (!exists(href))
      errors.push(`${path}: hreflang ${hreflang} → ${href} does not exist in the build`);
  }
  const langs = page.alternates.filter((a) => a.hreflang !== "x-default");
  if (langs.length) {
    if (!langs.some((a) => a.href === self))
      errors.push(`${path}: hreflang set does not include itself`);
    if (!page.alternates.some((a) => a.hreflang === "x-default"))
      errors.push(`${path}: missing x-default`);
    for (const alt of langs.filter((a) => a.href !== self)) {
      const target = pages.get(urlToPath(alt.href));
      if (target && !target.alternates.some((a) => a.href === self))
        errors.push(`${path}: ${alt.href} does not link back (hreflang not reciprocal)`);
    }
  }
}

// Sitemap: every URL must be a built, indexable page; every indexable page must be listed.
const sitemapUrls = walk(out)
  .filter((f) => /sitemap-\d+\.xml$/.test(f))
  .flatMap((f) =>
    [...readFileSync(f, "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, loc]) => loc)
  );
for (const loc of sitemapUrls) {
  const page = pages.get(urlToPath(loc));
  if (!page) errors.push(`sitemap: ${loc} is not a built page`);
  else if (page.robots.includes("noindex")) errors.push(`sitemap: ${loc} is noindex`);
}
for (const [path, page] of pages) {
  if (page.robots.includes("noindex")) continue;
  if (!sitemapUrls.includes(new URL(path, site).href))
    errors.push(`sitemap: indexable page ${path} is missing`);
}

console.info(`hreflang audit: ${pages.size} pages, ${sitemapUrls.length} sitemap URLs.`);
if (errors.length) {
  console.info(`\n${errors.map((e) => `  ❌ ${e}`).join("\n")}\n\n❌ hreflang audit failed`);
  process.exit(1);
}
console.info("✅ hreflang audit passed");
