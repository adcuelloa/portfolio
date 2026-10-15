// @ts-check
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

const siteUrl = (process.env.PUBLIC_SITE_URL ?? "https://cuello.dev").replace(/\/+$/, "");
const cdnBaseUrl = (process.env.PUBLIC_CDN_URL ?? "https://cdn.cuello.dev").replace(/\/+$/, "");

/** True when at least one non-draft article exists, so empty writing indexes stay out of the sitemap. */
function hasPublishedArticles() {
  const root = "./src/content/articles";
  if (!existsSync(root)) return false;
  /** @param {string} dir @returns {string[]} */
  const walk = (dir) =>
    readdirSync(dir).flatMap((name) => {
      const path = join(dir, name);
      return statSync(path).isDirectory() ? walk(path) : /\.mdx?$/.test(name) ? [path] : [];
    });
  return walk(root).some((file) => !/^draft:\s*true\s*$/m.test(readFileSync(file, "utf8")));
}

const writingIndexes = new Set(["/writing", "/es/articulos"]);
const includeWritingIndexes = hasPublishedArticles();

export default defineConfig({
  site: siteUrl,
  output: "static",
  trailingSlash: "never",
  adapter: cloudflare({ imageService: "custom" }),
  integrations: [
    sitemap({
      filter: (page) => {
        const pathname = new URL(page).pathname.replace(/\/$/, "") || "/";
        if (pathname === "/404" || pathname === "/es/404") return false;
        if (writingIndexes.has(pathname) && !includeWritingIndexes) return false;
        return true;
      },
    }),
  ],
  image: {
    domains: [new URL(cdnBaseUrl).hostname],
    service: {
      entrypoint: "./src/lib/images/cloudflareImageService.mjs",
      config: {
        baseUrl: cdnBaseUrl,
        defaultFit: "cover",
        defaultFormat: "auto",
        defaultQuality: 82,
        metadata: "none",
        onerror: "redirect",
      },
    },
  },
  build: {
    inlineStylesheets: "auto",
    format: "file",
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      assetsInlineLimit: 1024,
      target: "es2022",
      sourcemap: false,
    },
  },
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
