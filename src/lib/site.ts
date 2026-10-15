const siteUrl = (import.meta.env.PUBLIC_SITE_URL ?? "https://cuello.dev").replace(/\/+$/, "");
const cdnUrl = (import.meta.env.PUBLIC_CDN_URL ?? "https://cdn.cuello.dev").replace(/\/+$/, "");

export const SITE = {
  name: "Andrés Cuello",
  fullName: "Andrés David Cuello Acosta",
  url: siteUrl,
  cdnUrl,
  email: "andres@cuello.dev",
  twitter: "@adcuelloa",
  timeZone: "America/Bogota",
  links: {
    github: "https://github.com/adcuelloa",
    linkedin: "https://www.linkedin.com/in/adcuelloa",
    calendly: "https://calendly.com/adcuelloa/schedule",
  },
} as const;

/** Absolute URL of an object in the R2 bucket behind the CDN domain. */
export function cdn(key: string): string {
  return `${SITE.cdnUrl}/${key.replace(/^\/+/, "")}`;
}
