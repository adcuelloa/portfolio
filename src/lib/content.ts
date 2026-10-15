import { getCollection, type CollectionEntry } from "astro:content";

import { isLocale, localizedPath, type Locale } from "@/i18n/routes";

type Entry = { id: string };

/** Locale from the entry id prefix (`en/itsfluxo` → `en`). */
export function entryLocale(entry: Entry): Locale {
  const candidate = entry.id.split("/")[0];
  if (!isLocale(candidate))
    throw new Error(`Content entry "${entry.id}" is not inside a locale folder`);
  return candidate;
}

/** Slug without the locale prefix; identical across translations. */
export function entrySlug(entry: Entry): string {
  return entry.id.replace(/^[a-z]{2}\//, "");
}

export async function getProjects(lang: Locale): Promise<CollectionEntry<"projects">[]> {
  const entries = await getCollection("projects", (entry) => entryLocale(entry) === lang);
  return entries.sort((a, b) => a.data.order - b.data.order);
}

export async function getPublishedArticles(lang: Locale): Promise<CollectionEntry<"articles">[]> {
  const entries = await getCollection(
    "articles",
    (entry) => entryLocale(entry) === lang && !entry.data.draft
  );
  return entries.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export function articlePath(entry: CollectionEntry<"articles">): string {
  return localizedPath(entryLocale(entry), "writing", entrySlug(entry));
}

/** A project gets its own page only when its entry has a written case study (a non-empty body). */
export function hasCaseStudy(entry: CollectionEntry<"projects">): boolean {
  return Boolean(entry.body?.trim());
}

export function caseStudyPath(entry: CollectionEntry<"projects">): string {
  return localizedPath(entryLocale(entry), "work", entrySlug(entry));
}
