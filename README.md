# cuello.dev

Personal site of Andrés Cuello, web engineer. English at `/`, Spanish at `/es`.

Static Astro site deployed as a Cloudflare Worker (`portfolio`, static assets) through Workers Builds:
every push to `main` runs `pnpm run build` and `npx wrangler deploy`. Images are served from the R2 bucket
`cuello-portfolio-assets` at `cdn.cuello.dev` through Cloudflare image transformations (`PUBLIC_CDN_URL`).

## Deployment and rollback

- **Production:** `https://cuello.dev`, the custom domain of the Worker `portfolio` (account "Andrés Cuello account").
- **Deploy:** push to `main`. Workers Builds runs `pnpm run build` (type check, build, CSP audit) and `npx wrangler deploy`.
  A failed build never replaces the live version. Work on a branch and merge to `main` only when ready to ship.
- **Rollback:** `pnpm exec wrangler deployments list` to find the last good version, then
  `pnpm exec wrangler rollback <version-id>` (or Workers → portfolio → Deployments → Rollback in the dashboard).
  Rollback is instant and does not touch Git, so follow it with a `git revert` on `main`. Never roll back to the
  versions created from the dashboard on 2026-10-15 (`94a9c3f4`, `f2321145`): they are the "Hello world" placeholder.
- **Images:** R2 bucket `cuello-portfolio-assets` at `cdn.cuello.dev` (`images/{profile,social,work}/…`). Objects are
  served with immutable caching, so upload a changed image under a new key instead of overwriting it.

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
