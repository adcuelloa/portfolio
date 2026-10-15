---
title: "Contenido bilingüe en Astro sin añadir un CMS"
seoTitle: "Contenido bilingüe en Astro sin añadir un CMS"
description: "Cómo organizo artículos en español e inglés con Markdown, colecciones de Astro y un estado de borrador que controla qué llega al sitio público."
pubDate: 2026-10-15
tags: [Astro, i18n, contenido]
draft: false
---

Un portafolio necesita presentar el trabajo con claridad. Para este sitio, eso incluye poder leerlo en español e inglés. La pregunta práctica es cómo mantener ambas versiones sin convertir cada artículo en una nueva pieza de infraestructura.

Aquí el contenido vive en archivos Markdown y las reglas comunes están en una colección de Astro. El texto se revisa junto al código; el título, la descripción y la fecha tienen un esquema que la compilación puede validar.

## Un archivo por idioma

La organización es sencilla:

```text
src/content/articles/
  en/bilingual-content-without-a-cms.md
  es/bilingual-content-without-a-cms.md
```

El nombre compartido identifica las dos versiones del artículo. La carpeta identifica su idioma. Esto permite buscar la traducción sin mantener una tabla adicional de parejas.

En este portafolio, el slug del artículo es el mismo en ambos idiomas, aunque el segmento de la sección cambia: `/writing/…` en inglés y `/es/articulos/…` en español. Es una decisión de organización, no una obligación de Astro. Si necesitara traducir también cada slug, tendría que introducir una relación explícita entre las versiones.

## El borrador es parte del modelo

Cada artículo declara `draft: true` mientras está en revisión. La función que obtiene los artículos publicados filtra esos borradores antes de que lleguen a los listados y a la generación de páginas.

La búsqueda de traducciones aplica el mismo filtro. Tener un archivo en inglés no basta para anunciarlo como alternativa: también debe estar publicado. Así, una traducción a medio terminar no aparece en el selector de idioma de un artículo público.

El sitemap merece su propia comprobación. Si todavía no hay artículos publicados, el índice de artículos se mantiene fuera de él. Son decisiones relacionadas, pero afectan salidas diferentes del sitio.

## El límite de esta solución

Markdown encaja con este proyecto porque la edición ocurre en el repositorio. No ofrece por sí solo una interfaz editorial, permisos para colaboradores ni publicación programada.

Si la edición pasara a personas que no trabajan con Git, ese sería un motivo concreto para evaluar un CMS. Mientras tanto, una colección, dos carpetas y una regla de publicación cubren el recorrido que necesito.

La [documentación de colecciones de Astro](https://docs.astro.build/en/guides/content-collections/) explica los loaders, los esquemas y las consultas que sostienen este enfoque.
