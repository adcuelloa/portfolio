/**
 * Language-neutral shape of the site's UI copy. Every locale satisfies this contract,
 * so a missing or extra key fails the type check instead of rendering a raw key.
 * Add keys here first, then in every locale.
 */
export interface Translations {
  common: {
    skip: string;
    nav: {
      label: string;
      work: string;
      experience: string;
      writing: string;
      about: string;
    };
    language: {
      /** Name of the *other* language, shown on the switch link. */
      switchLabel: string;
      switchAria: string;
    };
    theme: {
      toggle: string;
    };
    footer: {
      role: string;
      backToTop: string;
    };
    kinds: {
      employment: string;
      independent: string;
      openSource: string;
      education: string;
    };
    status: {
      live: string;
      development: string;
      experimental: string;
    };
    links: {
      visit: string;
      repository: string;
      caseStudy: string;
    };
    notFound: {
      heading: string;
      body: string;
      home: string;
    };
  };
  home: {
    hero: {
      availability: string;
      titleBefore: string;
      titleMark: string;
      titleAfter: string;
      lead: string;
      ctaPrimary: string;
      ctaSecondary: string;
      facts: {
        basedLabel: string;
        basedValue: string;
        languagesLabel: string;
        languagesValue: string;
        stackLabel: string;
        stackValue: string;
      };
    };
    work: {
      eyebrow: string;
      title: string;
      lead: string;
      screenshotOf: string;
      statusLabel: string;
      mockupNote: string;
      builtLabel: string;
      more: string;
    };
    capabilities: {
      eyebrow: string;
      title: string;
      items: Array<{ title: string; body: string; proof: string }>;
    };
    experience: {
      eyebrow: string;
      title: string;
      employer: string;
      employmentPeriod: string;
      employmentDetail: string;
      roles: Array<{ title: string; period: string; note: string }>;
      school: string;
      degree: string;
      degreeStatus: string;
    };
    writing: {
      eyebrow: string;
      title: string;
      empty: string;
      all: string;
    };
    about: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
      portraitAlt: string;
    };
    contact: {
      eyebrow: string;
      title: string;
      body: string;
      linkedin: string;
      github: string;
      call: string;
      newTab: string;
    };
  };
  caseStudy: {
    eyebrow: string;
    titleSuffix: string;
    back: string;
    linksLabel: string;
    home: string;
  };
  writing: {
    title: string;
    lead: string;
    empty: string;
    published: string;
    updated: string;
    back: string;
  };
  seo: {
    home: { title: string; description: string };
    writing: { title: string; description: string };
    notFound: { title: string; description: string };
  };
}
