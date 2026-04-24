// @ts-check
import cloudflare from "@astrojs/cloudflare";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://cuello.dev",
  trailingSlash: "never",
  adapter: cloudflare({
    imageService: "cloudflare",
  }),
  image: {
    domains: ["cdn.cuello.dev"],
  },
  build: {
    inlineStylesheets: 'always',
    format: "file",
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      assetsInlineLimit: 1024,
      target: "es2022",
      sourcemap: false,
      chunkSizeWarningLimit: 800,
    },
  },
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
