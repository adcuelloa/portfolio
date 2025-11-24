import es from './translations/es.json';
import en from './translations/en.json';

export const languages = {
  es: 'Español',
  en: 'English',
};

export const defaultLang = 'es';

export const ui = {
  es,
  en,
} as const;

export function getBrowserLanguage(): 'es' | 'en' {
  if (typeof navigator === 'undefined') return 'es';
  const browserLang = navigator.language || (navigator as any).userLanguage;
  return browserLang.toLowerCase().startsWith('en') ? 'en' : 'es';
}

export function getLanguagePreference(): 'es' | 'en' {
  if (typeof localStorage === 'undefined') return defaultLang;
  return (localStorage.getItem('language') as 'es' | 'en') ?? defaultLang;
}

export function getCurrentLanguage(): 'es' | 'en' {
  if (typeof window === 'undefined') return defaultLang;
  return window.location.pathname.startsWith('/en') ? 'en' : 'es';
}

export function getLangFromUrl(url: URL) {
  const pathname = url.pathname;
  return pathname.startsWith('/en') ? 'en' : 'es';
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: string) {
    const keys = key.split('.');
    let value: any = ui[lang];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key;
      }
    }

    return value as string;
  };
}

export function getLocalizedPath(path: string, lang: 'es' | 'en'): string {
  const slugs = ui[lang].slugs as Record<string, string>;

  // Traducir los anchors/hashes en la URL
  let localizedPath = path;

  // Map de slugs español -> clave
  const slugMap: Record<string, string> = {
    'experiencia': 'experience',
    'proyectos': 'projects',
    'sobre-mi': 'about',
    'contacto': 'contact'
  };

  // Reemplazar cada slug en el path
  Object.entries(slugMap).forEach(([esSlug, key]) => {
    const translatedSlug = slugs[key];
    localizedPath = localizedPath.replace(`#${esSlug}`, `#${translatedSlug}`);
  });

  // Si es inglés, agregar /en/ al inicio
  if (lang === 'en' && !localizedPath.startsWith('/en')) {
    if (localizedPath.startsWith('/')) {
      return `/en${localizedPath}`;
    }
    return `/en/${localizedPath}`;
  }

  return localizedPath;
}
