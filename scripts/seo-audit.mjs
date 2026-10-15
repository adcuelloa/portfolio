// SEO copy audit: page titles and descriptions per locale, and article frontmatter.
// Usage: node scripts/seo-audit.mjs
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const TITLE = [30, 65];
const DESCRIPTION = [110, 160];
const NOINDEX = new Set(["notFound"]);
let ok = true;

const inRange = (n, [min, max]) => n >= min && n <= max;

function check(label, title, description) {
  const problems = [];
  if (!inRange(title.length, TITLE)) problems.push(`title ${title.length} chars (expected ${TITLE.join("–")})`);
  if (!inRange(description.length, DESCRIPTION))
    problems.push(`description ${description.length} chars (expected ${DESCRIPTION.join("–")})`);
  if (/GES2L/.test(title + description)) problems.push(`uses "GES2L"; the brand is written "Ges2l"`);
  if (problems.length) ok = false;
  console.info(`  ${problems.length ? "❌" : "✅"}  ${label}${problems.length ? ` — ${problems.join("; ")}` : ""}`);
}

for (const locale of ["en", "es"]) {
  const { default: data } = await import(pathToFileURL(join(root, "src/i18n/locales", `${locale}.ts`)).href);
  console.info(`\n# ${locale.toUpperCase()} pages`);
  for (const [page, seo] of Object.entries(data.seo)) {
    if (NOINDEX.has(page)) {
      console.info(`  ⏭️   ${page} (noindex)`);
      continue;
    }
    check(page, seo.title, seo.description);
  }

  // Case studies: projects with a body become pages and need search-length metadata.
  const caseSuffix = locale === "es" ? "caso de estudio" : "case study";
  const projectDir = join(root, "src/content/projects", locale);
  for (const file of readdirSync(projectDir).filter((f) => f.endsWith(".md"))) {
    const source = readFileSync(join(projectDir, file), "utf8");
    const [, frontmatter = "", body = ""] = source.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/) ?? [];
    if (!body.trim()) continue;
    const title = frontmatter.match(/^title:\s*(.*)$/m)?.[1]?.replace(/^["']|["']$/g, "") ?? "";
    const description = frontmatter.match(/^seoDescription:\s*(.*)$/m)?.[1]?.replace(/^["']|["']$/g, "") ?? "";
    check(`case study ${file}`, `${title}: ${caseSuffix} — Andrés Cuello`, description);
  }

  const dir = join(root, "src/content/articles", locale);
  const files = existsSync(dir)
    ? readdirSync(dir).filter((f) => /\.mdx?$/.test(f) && statSync(join(dir, f)).isFile())
    : [];
  for (const file of files) {
    const source = readFileSync(join(dir, file), "utf8");
    const fm = Object.fromEntries(
      [...(source.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? "").matchAll(/^(\w+):\s*(.*)$/gm)].map(([, k, v]) => [
        k,
        v.replace(/^["']|["']$/g, ""),
      ]),
    );
    if (fm.draft === "true") continue;
    check(relative(root, join(dir, file)), fm.seoTitle ?? `${fm.title} — Andrés Cuello`, fm.description ?? "");
  }
}

// Brand spelling across all public content.
const brandHits = [];
const walk = (dir) =>
  readdirSync(dir).flatMap((n) => (statSync(join(dir, n)).isDirectory() ? walk(join(dir, n)) : [join(dir, n)]));
for (const file of walk(join(root, "src"))) {
  if (!/\.(md|mdx|ts|astro)$/.test(file)) continue;
  if (/GES2L/.test(readFileSync(file, "utf8"))) brandHits.push(relative(root, file));
}
if (brandHits.length) {
  ok = false;
  console.info(`\n❌ "GES2L" found (use "Ges2l"): ${brandHits.join(", ")}`);
}

console.info(ok ? "\n✅ SEO audit passed" : "\n❌ SEO audit failed");
process.exit(ok ? 0 : 1);
