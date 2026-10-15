---
title: Astro Cloudflare Landing Starter
summary: Plantilla de Astro, estática primero, para landing pages bilingües en Cloudflare, con i18n tipado, utilidades de SEO, content collections, analítica sujeta a consentimiento, transformación de imágenes en CDN y scripts de auditoría de i18n y SEO.
kind: open-source
statusNote: Repositorio público en GitHub.
stack: [Astro, TypeScript, Tailwind CSS, Cloudflare]
links:
  repository: https://github.com/adcuelloa/astro-cloudflare-landing-starter
order: 4
seoDescription: "Plantilla de código abierto de Astro, estática primero, para landing pages bilingües en Cloudflare, con i18n tipado, SEO, imágenes en CDN y auditorías."
---
## Contexto

Después de construir varios sitios bilingües en Astro sobre Cloudflare, repetía siempre la misma base: traducciones, rutas localizadas, metadatos, entrega de imágenes y analítica con consentimiento. Esta plantilla empaqueta esa base para que una landing nueva arranque desde algo correcto.

## Qué incluye

- **i18n tipado.** Las claves de traducción se infieren de los archivos de idioma, así que una clave desconocida falla en la verificación de tipos. Las rutas localizadas traen `alternateLinks()` para hreflang.
- **Utilidades de SEO y JSON-LD**, y content collections para un blog bilingüe con autores y categorías.
- **Imágenes con Cloudflare.** Un servicio de imágenes de Astro convierte `<Image />` en URLs de transformación `/cdn-cgi/image` para originales guardados en R2, así que no hay binarios de imágenes en el repositorio.
- **Analítica sujeta a consentimiento** con Cloudflare Zaraz, y puntos de entrada para GSAP con limpieza en cada navegación con view transitions.
- **Scripts de auditoría** de uso y paridad de traducciones, y de metadatos estáticos y frontmatter de las colecciones.
- **Documentación lista para agentes**: reglas de código, una skill local y una guía de configuración de Cloudflare, para que la siguiente persona (o IA) pueda extenderla con seguridad.

## Decisiones

- **Cloudflare gratis primero.** Astro prerenderiza archivos estáticos servidos por Workers Static Assets, con el adaptador listo para rutas en runtime si un proyecto las necesita. El README documenta los límites del plan gratuito en los que se apoya.
- **Originales en R2, no en git**, para que el repositorio sea liviano y las imágenes reemplazables.

## Estado

Repositorio público en GitHub.
