---
title: Astro Cloudflare Landing Starter
summary: A static-first Astro starter for bilingual landing pages on Cloudflare, with typed i18n, SEO helpers, content collections, consent-gated analytics, CDN image transformations and i18n and SEO audit scripts.
kind: open-source
statusNote: Public repository on GitHub.
stack: [Astro, TypeScript, Tailwind CSS, Cloudflare]
links:
  repository: https://github.com/adcuelloa/astro-cloudflare-landing-starter
order: 4
seoDescription: "An open-source, static-first Astro starter for bilingual landing pages on Cloudflare, with typed i18n, SEO helpers, CDN images and audit scripts."
---
## Context

After building several bilingual Astro sites on Cloudflare, I kept repeating the same groundwork: translations, localized routes, metadata, image delivery and consent-gated analytics. This starter packages that groundwork so a new landing page starts from a correct base.

## What it includes

- **Typed i18n.** Translation keys are inferred from the locale files, so an unknown key fails the type check. Localized routes come with `alternateLinks()` for hreflang.
- **SEO and JSON-LD helpers**, plus content collections for a bilingual blog with authors and categories.
- **Images through Cloudflare.** A custom Astro image service turns `<Image />` into `/cdn-cgi/image` transformation URLs for masters stored on R2, so no image binaries live in the repo.
- **Consent-gated analytics** through Cloudflare Zaraz, and GSAP entry points with cleanup on view-transition navigation.
- **Audit scripts** for translation usage and parity, and for static metadata and collection frontmatter.
- **Agent-ready project docs**: coding rules, a local skill and a Cloudflare setup guide, so the next developer (human or AI) can extend it safely.

## Decisions

- **Cloudflare free-first.** Astro prerenders to static files served by Workers Static Assets, with the adapter in place for runtime routes if a project ever needs them. The README records the free-tier limits it relies on.
- **Masters on R2, not in git**, which keeps the repository small and the images replaceable.

## Status

Public repository on GitHub.
