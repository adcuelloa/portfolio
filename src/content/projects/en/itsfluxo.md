---
title: ItsFluxo
summary: A bilingual marketing site for ItsFluxo, a Colombian business that offers websites, content, Meta Ads and automations.
kind: independent
status: live
statusNote: Live at itsfluxo.com in Spanish and English.
highlights:
  - Prerendered Astro pages in Spanish and English, served from Cloudflare Workers
  - An on-demand contact endpoint protected by Cloudflare Turnstile and sent through Resend
  - The marketing pixel loads only after visitors accept marketing cookies
  - Images served from R2 through Cloudflare image transformations
stack: [Astro, TypeScript, Cloudflare Workers, R2, Turnstile, Resend]
links:
  live: https://itsfluxo.com/en
image: https://cdn.cuello.dev/images/work/itsfluxo-home-en.webp
imageAlt: Home page of itsfluxo.com in English, with the headline “Websites, content and ads that help you sell”.
imageSource: itsfluxo.com/en
featured: true
order: 1
seoDescription: "Marketing site for a Colombian business offering websites, content, Meta Ads and automations: prerendered Astro on Cloudflare Workers, bilingual and fast."
---
## Context

ItsFluxo sells websites, content, Meta Ads and automations to businesses in Colombia. The site has to load quickly on mobile, rank for local searches and turn visits into booked calls, without a CMS or a heavy JavaScript framework.

## What I built

- **Prerendered pages** for home, services, results, process, contact and the legal documents, with Spanish as the default language and an English home page. Legal texts live in an Astro content collection.
- **A contact endpoint on demand.** Everything is static except `/api/contact`, which runs on Cloudflare Workers, checks a Cloudflare Turnstile token and sends the message through Resend. Secrets stay in the Worker runtime.
- **Consent first.** Cookie preferences use Vanilla CookieConsent in Spanish, and the Meta Pixel loads only after the visitor accepts the *Marketing* category.
- **Motion with restraint.** Simple reveals use CSS scroll-driven animations with a `prefers-reduced-motion` fallback. GSAP is reserved for the more complex sequences, with cleanup on every client-router navigation.
- **Images from R2** (`cdn.itsfluxo.com`) through Cloudflare image transformations, plus a sitemap and JSON-LD from a small SEO helper.

## Decisions

- **Static first, one server route.** Only the form needs a server, so the rest of the site is plain HTML from the edge.
- **One lifecycle module** (`pageLifecycle.ts`) owns scroll, hashes and navigation events, so components don't each reinvent them.
- **Typed i18n catalogs** with localized slugs. Alternate-language links are published only for pages that really have a translation.

## Status

Live at itsfluxo.com.
