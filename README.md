# cuello.dev

Personal site of Andrés Cuello, web engineer. English at `/`, Spanish at `/es`.

Static Astro site deployed as a Cloudflare Worker (`portfolio`, static assets) through Workers Builds:
every push to `main` runs `pnpm run build` and `npx wrangler deploy`. Images are served from the R2 bucket
`cuello-portfolio-assets` at `cdn.cuello.dev` through Cloudflare image transformations (`PUBLIC_CDN_URL`).

## Commands

| Command | What it does |
| --- | --- |
| `pnpm dev` | Local dev server |
| `pnpm build` | `astro check`, production build to `dist/`, then the CSP audit |
| `pnpm preview` | Preview the production build |
| `pnpm deploy` | Build and deploy with Wrangler (normally done by Workers Builds) |
| `pnpm wrangler:types` | Regenerate Worker runtime types |
| `pnpm i18n:audit` | Translation keys: unknown, missing or unused |
| `pnpm seo:audit` | Title/description lengths and brand spelling |
| `pnpm hreflang:audit` | Canonical, hreflang, `lang` and sitemap checks on the built HTML |
| `pnpm csp:audit` | Every inline script is allowed by a hash in `public/_headers` |
| `pnpm verify` | All audits plus the build |

When an inline script changes, `pnpm build` fails and prints the new `sha256-…` hash to add to the
`script-src` directive in `public/_headers`.

## Structure

- `src/i18n/` — routes (`routes.ts`), typed translations (`locales/`), helpers (`utils.ts`)
- `src/content/` — projects (case studies) and articles, one folder per locale; the same file name pairs translations
- `src/views/` — page bodies shared by the English and Spanish routes in `src/pages/`
- `src/lib/` — SEO helpers, content queries, page lifecycle, the Cloudflare image service
