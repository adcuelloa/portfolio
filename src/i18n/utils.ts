import en from "./locales/en";
import es from "./locales/es";
import type { Translations } from "./locales/types";
import { defaultLocale, isLocale, type Locale } from "./routes";

export const ui: Record<Locale, Translations> = { en, es };

type Primitive = string | number | boolean | null;

type LeafPaths<T> = T extends Primitive
  ? never
  : T extends readonly unknown[]
    ? never
    : {
        [K in Extract<keyof T, string>]: T[K] extends Primitive | readonly unknown[]
          ? K
          : `${K}.${LeafPaths<T[K]>}`;
      }[Extract<keyof T, string>];

export type TranslationKey = LeafPaths<Translations>;

type PathValue<T, P extends string> = P extends `${infer K}.${infer Rest}`
  ? K extends keyof T
    ? PathValue<T[K], Rest>
    : never
  : P extends keyof T
    ? T[P]
    : never;

/** The locale is decided by the first path segment only (`/es/...`), never by deeper slugs. */
export function getLangFromUrl(url: URL): Locale {
  const first = url.pathname.split("/").filter(Boolean)[0]?.replace(/\.html$/, "");
  return isLocale(first) ? first : defaultLocale;
}

function getByPath(source: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, part) => {
    return typeof acc === "object" && acc !== null ? (acc as Record<string, unknown>)[part] : undefined;
  }, source);
}

export function useTranslations(lang: Locale) {
  return function t<K extends TranslationKey>(key: K): PathValue<Translations, K> {
    const value = getByPath(ui[lang], key);
    if (value === undefined) throw new Error(`Missing translation "${key}" for locale "${lang}"`);
    return value as PathValue<Translations, K>;
  };
}
