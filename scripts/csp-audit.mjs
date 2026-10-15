// CSP audit (adapted from the Ges2l landing): every inline <script> in the built HTML must be
// allowed by a sha256 hash in public/_headers. Runs after `astro build`; a missing hash fails the
// build so a deploy can never ship scripts the policy would block.
// Usage: node scripts/csp-audit.mjs
import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();
const outputRoot = join(root, "dist", "client");
const headersPath = join(root, "public", "_headers");
const scriptPattern = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
const inertType = /\btype\s*=\s*["'](?:application\/json|application\/ld\+json)["']/i;

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : path.endsWith(".html") ? [path] : [];
  });

if (!existsSync(outputRoot)) throw new Error("dist/client is missing; run astro build first");

const required = new Map();
for (const file of walk(outputRoot)) {
  for (const [, attributes, content] of readFileSync(file, "utf8").matchAll(scriptPattern)) {
    if (/\bsrc\s*=/i.test(attributes) || inertType.test(attributes)) continue;
    const hash = createHash("sha256").update(content, "utf8").digest("base64");
    const pages = required.get(hash) ?? new Set();
    pages.add(relative(outputRoot, file));
    required.set(hash, pages);
  }
}

const scriptSrc = readFileSync(headersPath, "utf8").match(/\bscript-src\s+([^;\n]+)/)?.[1];
if (!scriptSrc) throw new Error("public/_headers has no script-src directive");
if (/'unsafe-inline'/.test(scriptSrc)) throw new Error("script-src must not allow 'unsafe-inline'");

const declared = new Set([...scriptSrc.matchAll(/'sha256-([A-Za-z0-9+/=]+)'/g)].map((m) => m[1]));
const missing = [...required].filter(([hash]) => !declared.has(hash));
const stale = [...declared].filter((hash) => !required.has(hash));

if (missing.length > 0) {
  console.error(
    `❌ CSP audit failed. Add these hashes to script-src in public/_headers:\n${missing
      .map(
        ([hash, pages]) =>
          `  'sha256-${hash}' (${[...pages].slice(0, 3).join(", ")}${pages.size > 3 ? ", …" : ""})`
      )
      .join("\n")}`
  );
  process.exit(1);
}
if (stale.length > 0)
  console.info(
    `Stale CSP hashes (safe to remove):\n${stale.map((h) => `  'sha256-${h}'`).join("\n")}`
  );
console.info(
  `✅ CSP audit passed: ${required.size} inline script hash${required.size === 1 ? "" : "es"}.`
);
