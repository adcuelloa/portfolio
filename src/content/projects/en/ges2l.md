---
title: Ges2l
summary: A multi-tenant platform for educational institutions, with single sign-on, an administrative panel, an academic module and a bilingual marketing site. My most substantial full-stack application.
kind: independent
status: development
statusNote: In development and user-acceptance testing. The marketing site is public; the platform is not yet in production use by institutions.
highlights:
  - NestJS and Fastify API on PostgreSQL with PgBouncer and Drizzle ORM
  - React 19 and Vite frontends that share auth, i18n and UI packages in a pnpm and Turborepo monorepo
  - Single sign-on across subdomains with Redis-backed sessions
  - Astro marketing site with typed i18n and automated SEO, i18n and CSP audits
stack: [NestJS, Fastify, React, PostgreSQL, Drizzle, Redis, Astro, Turborepo]
links:
  live: https://ges2l.com/en
image: https://cdn.cuello.dev/images/work/ges2l-landing-en.webp
imageAlt: Home page of the Ges2l marketing site in English. The product panel shown on it is an illustrative mock-up with sample data.
imageSource: ges2l.com/en, public marketing site
illustrativeMockup: true
featured: true
order: 2
seoDescription: "Ges2l: a multi-tenant platform for educational institutions built with NestJS, React, PostgreSQL and Astro. In development and user-acceptance testing."
---
## Context

Schools and academic institutions often run administration and academics in separate tools. Ges2l brings them into one platform: an administrative panel (campuses, users, roles, academic years) and an academic module (periods, groups, attendance, grades), behind a single account system.

## What I built

- **A NestJS 12 API on Fastify**, with PostgreSQL 18 behind PgBouncer and Drizzle ORM for schema, migrations and seeds.
- **Multi-tenant data and role-based access**, so each institution only sees its own records and each user only what their role allows.
- **Single sign-on across subdomains** (accounts, panel, academy, my account) with Redis-backed sessions, plus JWT for mobile and API clients.
- **React 19 and Vite frontends** with TanStack Query and Zustand, sharing auth, i18n, validation and UI packages in a pnpm and Turborepo monorepo.
- **An Astro marketing site** (`ges2l.com`) with typed i18n, localized routes, content collections and scripts that audit SEO metadata, translations and the content security policy hashes.
- **Docker infrastructure** for local development and deployment, with Nginx, PgBouncer and Redis.

## Decisions

- **Shared packages over copy-paste.** Auth types, validators, i18n resources and UI components live once and are consumed by every app.
- **The marketing site stays Astro-only.** React is allowed there only inside an island; today it ships no React at all.
- **Quality gates in the toolchain:** oxlint, oxfmt, syncpack and knip run across the monorepo.

## Status

In development and user-acceptance testing. The marketing site at ges2l.com is public; the platform is not yet in production use by institutions. The dashboard in the marketing screenshot is an illustrative mock-up with sample data.
