---
title: ItsFluxo
summary: Sitio de marketing bilingüe para ItsFluxo, un negocio colombiano que ofrece páginas web, contenido, Meta Ads y automatizaciones.
kind: independent
status: live
statusNote: En producción en itsfluxo.com, en español e inglés.
highlights:
  - Páginas Astro prerenderizadas en español e inglés, servidas desde Cloudflare Workers
  - Endpoint de contacto bajo demanda protegido con Cloudflare Turnstile y enviado con Resend
  - El píxel de marketing solo se carga si el visitante acepta las cookies de marketing
  - Imágenes servidas desde R2 con transformaciones de imagen de Cloudflare
stack: [Astro, TypeScript, Cloudflare Workers, R2, Turnstile, Resend]
links:
  live: https://itsfluxo.com
image: https://cdn.cuello.dev/images/work/itsfluxo-home-es.webp
imageAlt: Página de inicio de itsfluxo.com en español, con el titular «Páginas, contenido y anuncios que ayudan a vender».
imageSource: itsfluxo.com
featured: true
order: 1
seoDescription: "Sitio de marketing para un negocio colombiano de páginas web, contenido y Meta Ads: Astro prerenderizado en Cloudflare Workers, rápido y bilingüe."
---

## Contexto

ItsFluxo ofrece páginas web, contenido, Meta Ads y automatizaciones a negocios en Colombia. El sitio debía cargar rápido en móvil, posicionar en búsquedas locales y convertir visitas en llamadas agendadas, sin un CMS ni un framework pesado de JavaScript.

## Qué construí

- **Páginas prerenderizadas** para inicio, servicios, resultados, proceso, contacto, un blog y los documentos legales, totalmente bilingües: español en la raíz y cada página en inglés bajo `/en`, enlazadas con hreflang recíproco. Los textos legales viven en una content collection de Astro.
- **Un endpoint de contacto bajo demanda.** Todo es estático excepto `/api/contact`, que corre en Cloudflare Workers, valida un token de Cloudflare Turnstile y envía el mensaje con Resend. Los secretos se quedan en el runtime del Worker.
- **Consentimiento primero.** Las preferencias de cookies usan Vanilla CookieConsent en español, y el píxel de Meta solo se carga si el visitante acepta la categoría _Marketing_.
- **Animación con mesura.** Las apariciones simples usan animaciones CSS guiadas por scroll con alternativa para `prefers-reduced-motion`. GSAP queda para las secuencias más complejas, con limpieza en cada navegación del client router.
- **Imágenes desde R2** (`cdn.itsfluxo.com`) con transformaciones de imagen de Cloudflare, además de sitemap y JSON-LD desde un pequeño helper de SEO.

## Decisiones

- **Estático primero, una sola ruta de servidor.** Solo el formulario necesita servidor, así que el resto del sitio es HTML servido desde el edge.
- **Un único módulo de ciclo de vida** (`pageLifecycle.ts`) maneja scroll, hashes y eventos de navegación, para que cada componente no lo reinvente.
- **Catálogos i18n tipados** con slugs localizados (`/servicios` ↔ `/en/services`), para que cada idioma tenga URLs naturales.

## Estado

En producción en itsfluxo.com.
