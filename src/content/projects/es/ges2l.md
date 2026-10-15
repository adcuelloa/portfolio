---
title: Ges2l
summary: Plataforma multi-tenant para instituciones educativas, con inicio de sesión único, panel administrativo, módulo académico y un sitio de marketing bilingüe. Mi aplicación full stack más completa.
kind: independent
status: development
statusNote: En desarrollo y pruebas de aceptación (UAT). El sitio de marketing es público; la plataforma todavía no está en uso en producción por instituciones.
highlights:
  - API con NestJS y Fastify sobre PostgreSQL con PgBouncer y Drizzle ORM
  - Frontends con React 19 y Vite que comparten paquetes de autenticación, i18n e interfaz en un monorepo con pnpm y Turborepo
  - Inicio de sesión único entre subdominios con sesiones en Redis
  - Sitio de marketing en Astro con i18n tipado y auditorías automáticas de SEO, i18n y CSP
stack: [NestJS, Fastify, React, PostgreSQL, Drizzle, Redis, Astro, Turborepo]
links:
  live: https://ges2l.com
image: https://cdn.cuello.dev/images/work/ges2l-landing-es.webp
imageAlt: Página de inicio del sitio de marketing de Ges2l en español. El panel de producto que aparece es una maqueta ilustrativa con datos de ejemplo.
imageSource: ges2l.com, sitio de marketing público
illustrativeMockup: true
featured: true
order: 2
seoDescription: "Ges2l: plataforma multi-tenant para instituciones educativas con NestJS, React, PostgreSQL y Astro. En desarrollo y pruebas de aceptación (UAT)."
---
## Contexto

Colegios e instituciones académicas suelen manejar la administración y lo académico en herramientas separadas. Ges2l los reúne en una plataforma: un panel administrativo (sedes, usuarios, roles, años lectivos) y un módulo académico (periodos, grupos, asistencia, calificaciones), detrás de un único sistema de cuentas.

## Qué construí

- **Una API con NestJS 12 sobre Fastify**, con PostgreSQL 18 detrás de PgBouncer y Drizzle ORM para esquema, migraciones y datos semilla.
- **Datos multi-tenant y control de acceso por roles**, para que cada institución vea solo sus registros y cada usuario solo lo que su rol permite.
- **Inicio de sesión único entre subdominios** (cuentas, panel, academy, mi cuenta) con sesiones en Redis, y JWT para clientes móviles y de API.
- **Frontends con React 19 y Vite**, TanStack Query y Zustand, que comparten paquetes de autenticación, i18n, validación e interfaz en un monorepo con pnpm y Turborepo.
- **Un sitio de marketing en Astro** (`ges2l.com`) con i18n tipado, rutas localizadas, content collections y scripts que auditan metadatos SEO, traducciones y los hashes de la política de seguridad de contenido.
- **Infraestructura con Docker** para desarrollo local y despliegue, con Nginx, PgBouncer y Redis.

## Decisiones

- **Paquetes compartidos en vez de copiar y pegar.** Tipos de autenticación, validadores, recursos de i18n y componentes viven en un solo lugar y los usan todas las aplicaciones.
- **El sitio de marketing es solo Astro.** React solo se permite dentro de una isla; hoy no envía nada de React.
- **Controles de calidad en el toolchain:** oxlint, oxfmt, syncpack y knip en todo el monorepo.

## Estado

En desarrollo y pruebas de aceptación (UAT). El sitio de marketing en ges2l.com es público; la plataforma todavía no está en uso en producción por instituciones. El panel de la captura del sitio de marketing es una maqueta ilustrativa con datos de ejemplo.
