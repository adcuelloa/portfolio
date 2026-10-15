---
title: "Technical SEO: checking HTML before publishing"
seoTitle: "Technical SEO: checking HTML before publishing"
description: "The technical SEO checks I use in this portfolio: metadata per language, links between translations, and inspection of the generated HTML."
pubDate: 2026-10-15
tags: [SEO, Astro, i18n]
draft: false
---

A page can look finished and still have errors in its title, canonical URL, or link to its translation. Those details belong to the product too, even when they do not appear in a screenshot.

In this portfolio I check them in two places: the data that feeds the pages and the HTML produced by the build. Each review answers a different question.

## Check the data before rendering

The SEO audit script walks through localized copy and case study metadata. It checks titles and descriptions against the ranges defined for this project. It also catches incorrect capitalization of the Ges2l brand.

Those ranges are a local editorial rule. Passing the audit does not prove a title is good or that a search engine will display it in full. The script’s value is in flagging missing data, disproportionate copy, and repeatable mistakes before publishing.

Translations have another audit: it checks the keys used by the site against the keys defined in the locale files. A valid English description does not make up for a missing Spanish key.

## Check relationships between pages

A canonical URL and a `hreflang` link describe different relationships. In this site’s layout, each indexable page builds its canonical URL from its own route. Language alternatives are supplied separately.

For an article, an alternative exists only when there is a published translation with the same filename. This prevents generating a link to a draft or a route that does not exist yet.

Reciprocity is also checked against the compiled output: if a page advertises a translation, the other page must link back. [Google’s localized versions guide](https://developers.google.com/search/docs/specialty/international/localized-versions) documents that condition and the use of absolute URLs.

## The build is a useful checkpoint

The project’s verification command combines translation and SEO audits with the build, a CSP audit, and a `hreflang` check. I can review the content first and then check what was actually generated.

Opening the pages still matters. A script cannot decide whether a description accurately represents the work or whether the language switcher is understandable. It does not measure search rankings either.

The goal of these checks is more specific: make mechanical mistakes visible while I am still editing, with a file and a cause I can fix.
