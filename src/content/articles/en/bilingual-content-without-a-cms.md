---
title: "Bilingual content in Astro without adding a CMS"
seoTitle: "Bilingual content in Astro without adding a CMS"
description: "How I organize Spanish and English articles with Markdown, Astro content collections, and a draft flag that controls what reaches the public site."
pubDate: 2026-10-15
tags: [Astro, i18n, content]
draft: false
---

A portfolio needs to present the work clearly. For this site, that includes making it readable in Spanish and English. The practical question is how to maintain both versions without turning every article into another piece of infrastructure.

Here, content lives in Markdown files and the shared rules live in an Astro collection. Text gets reviewed alongside code; the title, description, and date have a schema the build can validate.

## One file per language

The structure is simple:

```text
src/content/articles/
  en/bilingual-content-without-a-cms.md
  es/bilingual-content-without-a-cms.md
```

The shared filename identifies the two versions of the article. The folder identifies its language. This lets the site find a translation without maintaining a separate table of pairs.

In this portfolio, the article slug stays the same in both languages, while the section segment changes: `/writing/…` in English and `/es/articulos/…` in Spanish. That is an organizational choice, not an Astro requirement. Translating individual slugs would require an explicit relationship between the versions.

## Draft status belongs in the model

Each article declares `draft: true` while under review. The function that fetches published articles filters drafts before they reach listings and page generation.

Translation lookup applies the same filter. An English file existing is not enough to advertise it as an alternative: it also needs to be published. That keeps an unfinished translation out of a public article’s language switcher.

The sitemap deserves a separate check. When there are no published articles yet, the writing index stays out of it. These are related decisions, but they affect different outputs of the site.

## Where this approach stops

Markdown fits this project because editing happens in the repository. On its own, it provides no editorial interface, collaborator permissions, or scheduled publishing.

If editing moved to people who do not work with Git, that would be a concrete reason to evaluate a CMS. Until then, a collection, two folders, and a publishing rule cover the workflow I need.

The [Astro content collections documentation](https://docs.astro.build/en/guides/content-collections/) explains the loaders, schemas, and queries behind this approach.
