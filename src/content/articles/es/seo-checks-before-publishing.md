---
title: "SEO técnico: revisar el HTML antes de publicar"
seoTitle: "SEO técnico: revisar el HTML antes de publicar"
description: "Las comprobaciones de SEO técnico que uso en este portafolio: metadatos por idioma, enlaces entre traducciones y revisión del HTML generado."
pubDate: 2026-10-15
tags: [SEO, Astro, i18n]
draft: false
---

Una página puede verse terminada y seguir teniendo errores en su título, su URL canónica o el enlace a su traducción. Esas partes también pertenecen al producto, aunque no aparezcan en la captura de pantalla.

En este portafolio las compruebo desde dos lugares: los datos que alimentan las páginas y el HTML que sale de la compilación. Cada revisión responde una pregunta distinta.

## Revisar los datos antes del render

El script de auditoría de SEO recorre los textos por idioma y los metadatos de los casos de estudio. Comprueba que títulos y descripciones estén dentro de los rangos definidos para este proyecto. También detecta una escritura incorrecta de la marca Ges2l.

Esos rangos son una regla editorial local. Pasar la auditoría no demuestra que un título sea bueno ni que un buscador vaya a mostrarlo completo. La utilidad del script es señalar datos ausentes, textos desproporcionados y errores repetibles antes de publicar.

Las traducciones tienen otra auditoría: verifica las claves utilizadas y las compara con las definidas. Una descripción válida en inglés no compensa una clave que falta en español.

## Revisar las relaciones entre páginas

Una URL canónica y un enlace `hreflang` describen relaciones diferentes. En el layout de este sitio, cada página indexable construye su canónica a partir de su propia ruta. Las alternativas de idioma se reciben por separado.

Para un artículo, la alternativa solo existe cuando hay una traducción publicada con el mismo nombre de archivo. Esto evita generar un enlace hacia un borrador o hacia una ruta que aún no existe.

La reciprocidad también se revisa sobre el resultado compilado: si una página anuncia una traducción, la otra debe devolver esa relación. La [guía de Google sobre versiones localizadas](https://developers.google.com/search/docs/specialty/international/localized-versions) documenta esa condición y el uso de URLs absolutas.

## La compilación es una frontera útil

El comando de verificación del proyecto une las auditorías de traducciones y SEO con la compilación, la revisión de CSP y la comprobación de `hreflang`. Así puedo revisar el contenido y después comprobar lo que realmente se generó.

Todavía hace falta abrir las páginas. Un script no decide si una descripción representa bien el trabajo ni si el selector de idioma resulta comprensible. Tampoco mide posiciones en buscadores.

El objetivo de estas comprobaciones es más concreto: que los errores mecánicos aparezcan mientras todavía estoy editando, con un archivo y una causa que pueda corregir.
