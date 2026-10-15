export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

/**
 * Route keys mapped to their per-locale URL segment.
 * English lives at the root (`/`), Spanish under `/es`. Both URLs are already indexed.
 */
export const routeSegments = {
  home: { en: "", es: "" },
  writing: { en: "writing", es: "articulos" },
  work: { en: "work", es: "proyectos" },
} as const satisfies Record<string, Record<Locale, string>>;

export type RouteKey = keyof typeof routeSegments;

/** In-page section anchors on the home page, localized so shared links read naturally. */
export const sectionIds = {
  work: { en: "work", es: "proyectos" },
  experience: { en: "experience", es: "experiencia" },
  writing: { en: "writing", es: "articulos" },
  about: { en: "about", es: "sobre-mi" },
  contact: { en: "contact", es: "contacto" },
} as const satisfies Record<string, Record<Locale, string>>;

export type SectionKey = keyof typeof sectionIds;

export function isLocale(value: string | undefined): value is Locale {
  return locales.some((locale) => locale === value);
}

function localePrefix(locale: Locale): string {
  return locale === defaultLocale ? "" : `/${locale}`;
}

/** Path without trailing slash (the site uses `trailingSlash: "never"`), except the root `/`. */
export function localizedPath(locale: Locale, route: RouteKey, slug?: string): string {
  const parts = [localePrefix(locale), routeSegments[route][locale], slug].filter(Boolean);
  const path = parts.join("/").replace(/\/+/g, "/");
  if (!path) return "/";
  return path.startsWith("/") ? path : `/${path}`;
}

export function sectionHref(locale: Locale, section: SectionKey): string {
  const home = localizedPath(locale, "home");
  return `${home}#${sectionIds[section][locale]}`;
}

export type Alternate = { hreflang: Locale; href: string };

export function alternateLinks(route: RouteKey, site: URL): Alternate[] {
  return locales.map((locale) => ({
    hreflang: locale,
    href: new URL(localizedPath(locale, route), site).href,
  }));
}

export function otherLocale(locale: Locale): Locale {
  return locale === "en" ? "es" : "en";
}
