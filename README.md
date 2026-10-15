# cuello.dev

Personal site of Andrés Cuello, web engineer. English at `/`, Spanish at `/es`.

Static Astro site deployed on Cloudflare Pages. Images are served from R2 through Cloudflare image transformations (`PUBLIC_CDN_URL`).

## Commands

| Command | What it does |
| --- | --- |
| `pnpm dev` | Local dev server |
| `pnpm build` | Production build to `dist/client` |
| `pnpm preview` | Preview the production build |
| `pnpm typecheck` | `astro check` |
| `pnpm i18n:audit` | Translation keys: unknown, missing or unused |
| `pnpm seo:audit` | Title/description lengths and brand spelling |
| `pnpm hreflang:audit` | Canonical, hreflang, `lang` and sitemap checks on the built HTML |
| `pnpm verify` | All of the above, in order |

## Structure

- `src/i18n/` — routes (`routes.ts`), typed translations (`locales/`), helpers (`utils.ts`)
- `src/content/` — projects and articles, one folder per locale; the same file name pairs translations
- `src/views/` — page bodies shared by the English and Spanish routes in `src/pages/`
- `src/lib/` — SEO helpers, content queries, the Cloudflare image service
