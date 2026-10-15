// Translation audit: every key referenced through t("...") must exist, and every defined key should be used.
// Locale parity (same keys in en/es) is already enforced by `satisfies Translations` at type-check time.
// Usage: node scripts/i18n-audit.mjs [--strict]
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const sourceRoot = join(root, "src");
const locales = ["en", "es"];
const sourceExtensions = new Set([".astro", ".ts", ".mjs"]);
const translationCall = /\bt\(\s*["'`]([^"'`]+)["'`]\s*\)/g;
// Keys read as whole objects/arrays through `ui[lang]...` instead of t().
const directAccess = /\bui\[lang\]\.([\w.]+)/g;

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

function flatten(value, prefix = "") {
  if (Array.isArray(value) || value === null || typeof value !== "object")
    return prefix ? [prefix] : [];
  return Object.entries(value).flatMap(([key, child]) =>
    flatten(child, prefix ? `${prefix}.${key}` : key)
  );
}

const keysByLocale = new Map();
for (const locale of locales) {
  const { default: data } = await import(
    pathToFileURL(join(sourceRoot, "i18n", "locales", `${locale}.ts`)).href
  );
  keysByLocale.set(locale, new Set(flatten(data)));
}

const used = new Map();
const usedPrefixes = new Set();
for (const file of walk(sourceRoot)) {
  if (!sourceExtensions.has(file.slice(file.lastIndexOf(".")))) continue;
  const source = readFileSync(file, "utf8");
  for (const [, key] of source.matchAll(translationCall)) {
    used.set(key, [...(used.get(key) ?? []), relative(root, file)]);
  }
  for (const [, prefix] of source.matchAll(directAccess)) usedPrefixes.add(prefix);
}

const defined = new Set([...keysByLocale.values()].flatMap((keys) => [...keys]));
const isUsed = (key) =>
  used.has(key) || [...usedPrefixes].some((p) => key === p || key.startsWith(`${p}.`));
const unused = [...defined].filter((key) => !isUsed(key)).sort();
const unknown = [...used.keys()].filter((key) => !defined.has(key)).sort();
const missing = locales.flatMap((locale) =>
  [...defined].filter((key) => !keysByLocale.get(locale).has(key)).map((key) => `${locale}: ${key}`)
);

console.info(`i18n audit: ${used.size} keys referenced, ${defined.size} defined.`);
const report = (title, list) =>
  list.length && console.info(`\n${title}:\n${list.map((x) => `  - ${x}`).join("\n")}`);
report("Unused keys", unused);
report(
  "Unknown keys",
  unknown.map((key) => `${key} (${used.get(key).join(", ")})`)
);
report("Missing keys", missing);

const failed =
  unknown.length > 0 ||
  missing.length > 0 ||
  (process.argv.includes("--strict") && unused.length > 0);
console.info(failed ? "\n❌ i18n audit failed" : "\n✅ i18n audit passed");
process.exit(failed ? 1 : 0);
