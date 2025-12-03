import es from './translations/es.json';
import en from './translations/en.json';

export const languages = {
  en: 'English',
  es: 'Español',
};

export const defaultLang = 'en';

export const ui = {
  es,
  en,
} as const;

export function getBrowserLanguage(): 'en' | 'es' {
  if (typeof navigator === 'undefined') return 'en';
  const browserLang = navigator.language || (navigator as any).userLanguage;
  return browserLang.toLowerCase().startsWith('es') ? 'es' : 'en';
}

export function getLanguagePreference(): 'es' | 'en' {
  if (typeof localStorage === 'undefined') return defaultLang;
  return (localStorage.getItem('language') as 'es' | 'en') ?? defaultLang;
}

export function getCurrentLanguage(): 'en' | 'es' {
  if (typeof window === 'undefined') return defaultLang;
  return window.location.pathname.startsWith('/es') ? 'es' : 'en';
}

export function getLangFromUrl(url: URL) {
  const pathname = url.pathname;
  return pathname.startsWith('/es') ? 'es' : 'en';
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
