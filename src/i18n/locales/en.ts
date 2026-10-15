import type { Translations } from "./types";

export default {
  common: {
    skip: "Skip to content",
    nav: {
      label: "Primary",
      work: "Work",
      experience: "Experience",
      writing: "Writing",
      about: "About",
    },
    language: {
      switchLabel: "Español",
      switchAria: "Leer esta página en español",
    },
    theme: {
      toggle: "Dark theme",
    },
    footer: {
      role: "Web engineer · Colombia, UTC−5",
      backToTop: "Back to top",
    },
    kinds: {
      employment: "Employment",
      independent: "Independent project",
      openSource: "Open source",
      education: "Education",
    },
    status: {
      live: "Live",
      development: "In development",
      experimental: "Experimental",
    },
    links: {
      visit: "Visit site",
      repository: "Repository",
      caseStudy: "Read the case study",
    },
    notFound: {
      heading: "This page doesn’t exist.",
      body: "The link may be old, or the address may have a typo.",
      home: "Back to the home page",
    },
  },
  home: {
    hero: {
      availability: "Open to remote roles",
      titleBefore: "I build fast, ",
      titleMark: "discoverable",
      titleAfter: " websites and modern web experiences.",
      lead: "I’m a web engineer working remotely from Colombia. I build marketing sites, landing pages and blogs with Astro, TypeScript and Cloudflare, with technical SEO, internationalization, performance and accessibility handled from day one. When a project needs more, I also do React and full-stack product work.",
      ctaPrimary: "See selected work",
      ctaSecondary: "Get in touch",
      facts: {
        basedLabel: "Based in",
        basedValue: "Colombia · UTC−5",
        languagesLabel: "Works in",
        languagesValue: "Spanish (native), English (professional)",
        stackLabel: "Core stack",
        stackValue: "Astro · TypeScript · Cloudflare",
      },
    },
    work: {
      eyebrow: "Selected work",
      title: "Things I’ve built",
      lead: "Each project is labelled for what it is: employment, an independent project or open source. Screenshots come from the public live sites.",
      screenshotOf: "Screenshot of",
      statusLabel: "Status",
      mockupNote: "The dashboard in this screenshot is an illustrative mock-up on the public marketing site, not data from an institution using the platform.",
      builtLabel: "Built with",
      more: "More engineering work",
    },
    capabilities: {
      eyebrow: "Strengths",
      title: "What I’m good at, and where to check",
      items: [
        {
          title: "Technical SEO & i18n",
          body: "Canonical URLs, hreflang, structured data and sitemaps, verified by build-time audit scripts.",
          proof: "Astro Cloudflare Starter · this site",
        },
        {
          title: "Web performance",
          body: "Static-first pages, responsive images through Cloudflare, and very little JavaScript.",
          proof: "ItsFluxo · this site",
        },
        {
          title: "Cloudflare platform",
          body: "Workers, Durable Objects, R2, Turnstile, security headers and content security policy.",
          proof: "RoveLink · ItsFluxo",
        },
        {
          title: "Full-stack product",
          body: "Multi-tenant data, authentication and React frontends on a NestJS and PostgreSQL backend.",
          proof: "Ges2l",
        },
      ],
    },
    experience: {
      eyebrow: "Background",
      title: "Experience & education",
      employer: "We Are Solutions, Inc.",
      employmentPeriod: "Mar 2024 – Sep 2026",
      employmentDetail: "Part-time from March to August 2024, full-time from September 2024.",
      roles: [
        {
          title: "Webmaster",
          period: "Sep 2025 – Sep 2026",
          note: "Official title on record for this period.",
        },
      ],
      school: "Corporación Universitaria Remington",
      degree: "Systems Engineering",
      degreeStatus: "In progress",
    },
    writing: {
      eyebrow: "Writing",
      title: "Notes on building for the web",
      empty:
        "I’m writing my first articles, on Astro, Cloudflare, technical SEO and web performance. They’ll appear here once they’re published.",
      all: "All articles",
    },
    about: {
      eyebrow: "About",
      title: "A little about me",
      paragraphs: [
        "I’m Andrés, a web engineer based in Colombia. I work in Spanish and English, and most of what I build is meant to be read in both.",
        "I care about the parts of a website people only notice when they’re wrong: the metadata search engines read, the first paint on a slow phone, the keyboard path through a page.",
        "I’m also studying Systems Engineering at Corporación Universitaria Remington.",
      ],
      portraitAlt: "Portrait of Andrés Cuello",
    },
    contact: {
      eyebrow: "Contact",
      title: "Hiring for a remote web or frontend role?",
      body: "LinkedIn is the best way to reach me. You can also book a short call.",
      linkedin: "Message me on LinkedIn",
      github: "GitHub",
      call: "Book a call",
      newTab: "opens in a new tab",
    },
  },
  caseStudy: {
    eyebrow: "Case study",
    titleSuffix: "case study",
    back: "All work",
    linksLabel: "Links",
    home: "Home",
  },
  writing: {
    title: "Writing",
    lead: "Articles on Astro, Cloudflare, technical SEO and web performance.",
    empty: "No articles are published yet. The first ones are being written.",
    published: "Published",
    updated: "Updated",
    back: "All articles",
  },
  seo: {
    home: {
      title: "Andrés Cuello — Web Engineer: Astro, TypeScript, Cloudflare",
      description:
        "Web engineer in Colombia building fast, discoverable websites with Astro, TypeScript and Cloudflare. Technical SEO, i18n, performance and accessibility.",
    },
    writing: {
      title: "Writing — Andrés Cuello, web engineer",
      description:
        "Articles by Andrés Cuello on Astro, Cloudflare, technical SEO, internationalization and web performance, from building real bilingual websites.",
    },
    notFound: {
      title: "Page not found — Andrés Cuello",
      description: "This page doesn’t exist.",
    },
  },
} as const satisfies Translations;
