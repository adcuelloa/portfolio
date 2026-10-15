import type { Alternate, Locale } from "@/i18n/routes";
import { SITE } from "@/lib/site";

type StructuredDataValue =
  | string
  | number
  | boolean
  | null
  | StructuredDataValue[]
  | { [key: string]: StructuredDataValue };

export type StructuredData = Record<string, StructuredDataValue>;

export type SeoMeta = {
  title: string;
  description: string;
  /** Alternate-language versions of this page, including itself. Omit when none exists. */
  alternates?: Alternate[];
  noindex?: boolean;
  ogType?: "website" | "article";
  image?: { url: string; alt: string };
  publishedTime?: string;
  updatedTime?: string;
  structuredData?: StructuredData[];
};

export const ogLocales: Record<Locale, string> = { en: "en_US", es: "es_CO" };

/** Social preview images already hosted on the CDN, rendered at 1200×630 by Cloudflare. */
export function defaultOgImage(lang: Locale): string {
  return `${SITE.cdnUrl}/cdn-cgi/image/width=1200,height=630,fit=cover,format=jpeg,quality=85/images/social/og-image-${lang}.png`;
}

/** Serializes JSON-LD safely: `<` is escaped so content can never close the script element. */
export function jsonLdScript(items: ReadonlyArray<StructuredData>): string {
  return items
    .map(
      (item) =>
        `<script type="application/ld+json">${JSON.stringify(item).replace(/</g, "\\u003c")}</script>`,
    )
    .join("");
}

const personId = `${SITE.url}/#person`;
const websiteId = `${SITE.url}/#website`;

export function personSchema(lang: Locale, description: string): StructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId,
    name: SITE.name,
    alternateName: SITE.fullName,
    url: SITE.url,
    image: `${SITE.cdnUrl}/images/profile/andres-cuello.webp`,
    jobTitle: lang === "es" ? "Desarrollador web" : "Web Engineer",
    description,
    knowsLanguage: ["es", "en"],
    address: { "@type": "PostalAddress", addressCountry: "CO" },
    sameAs: [SITE.links.github, SITE.links.linkedin],
  };
}

export function websiteSchema(lang: Locale, description: string): StructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    url: SITE.url,
    name: SITE.name,
    description,
    inLanguage: ["en", "es"],
    publisher: { "@id": personId },
    ...(lang === "es" ? { alternateName: "Andrés Cuello — Portafolio" } : {}),
  };
}

export function blogPostingSchema(data: {
  title: string;
  description: string;
  url: string;
  lang: Locale;
  published: Date;
  updated?: Date;
  tags: string[];
}): StructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: data.title,
    description: data.description,
    url: data.url,
    mainEntityOfPage: { "@type": "WebPage", "@id": data.url },
    datePublished: data.published.toISOString(),
    dateModified: (data.updated ?? data.published).toISOString(),
    inLanguage: data.lang,
    keywords: data.tags.join(", "),
    author: { "@id": personId, "@type": "Person", name: SITE.name, url: SITE.url },
  };
}
