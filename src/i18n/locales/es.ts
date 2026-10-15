import type { Translations } from "./types";

export default {
  common: {
    skip: "Saltar al contenido",
    nav: {
      label: "Principal",
      work: "Proyectos",
      experience: "Experiencia",
      writing: "Artículos",
      about: "Sobre mí",
    },
    language: {
      switchLabel: "English",
      switchAria: "Read this page in English",
    },
    theme: {
      toggle: "Tema oscuro",
    },
    footer: {
      role: "Desarrollador web · Colombia, UTC−5",
      email: "Correo",
      backToTop: "Volver arriba",
    },
    kinds: {
      employment: "Empleo",
      independent: "Proyecto independiente",
      openSource: "Código abierto",
      education: "Formación",
    },
    status: {
      live: "En producción",
      development: "En desarrollo",
      experimental: "Experimental",
    },
    links: {
      visit: "Ver sitio",
      repository: "Repositorio",
      caseStudy: "Leer el caso de estudio",
    },
    notFound: {
      heading: "Esta página no existe.",
      body: "Puede que el enlace sea antiguo o que la dirección tenga un error.",
      home: "Volver al inicio",
    },
  },
  home: {
    hero: {
      availability: "Disponible para trabajo remoto",
      titleBefore: "Construyo sitios web rápidos, ",
      titleMark: "fáciles de encontrar",
      titleAfter: ", y experiencias web modernas.",
      lead: "Soy desarrollador web y trabajo en remoto desde Colombia. Construyo sitios de marketing, landing pages y blogs con Astro, TypeScript y Cloudflare, y me ocupo desde el primer día del SEO técnico, la internacionalización, el rendimiento y la accesibilidad. Cuando un proyecto lo necesita, también trabajo con React y en desarrollo full stack.",
      ctaPrimary: "Ver proyectos",
      ctaSecondary: "Contactar",
      facts: {
        basedLabel: "Ubicación",
        basedValue: "Colombia · UTC−5",
        languagesLabel: "Idiomas",
        languagesValue: "Español (nativo), inglés (profesional)",
        stackLabel: "Stack principal",
        stackValue: "Astro · TypeScript · Cloudflare",
      },
    },
    work: {
      eyebrow: "Proyectos",
      title: "Lo que he construido",
      lead: "Cada proyecto indica lo que es: empleo, proyecto independiente o código abierto. Las capturas son de los sitios públicos en producción.",
      screenshotOf: "Captura de",
      statusLabel: "Estado",
      mockupNote: "El panel de esta captura es una maqueta ilustrativa del sitio de marketing público, no datos de una institución que use la plataforma.",
      builtLabel: "Tecnologías",
      more: "Más trabajo de ingeniería",
    },
    capabilities: {
      eyebrow: "Fortalezas",
      title: "En qué soy bueno y dónde comprobarlo",
      items: [
        {
          title: "SEO técnico e i18n",
          body: "URLs canónicas, hreflang, datos estructurados y sitemaps, verificados con scripts de auditoría en el build.",
          proof: "Astro Cloudflare Starter · este sitio",
        },
        {
          title: "Rendimiento web",
          body: "Páginas estáticas primero, imágenes responsivas con Cloudflare y muy poco JavaScript.",
          proof: "ItsFluxo · este sitio",
        },
        {
          title: "Plataforma Cloudflare",
          body: "Workers, Durable Objects, R2, Turnstile, cabeceras de seguridad y política de seguridad de contenido.",
          proof: "RoveLink · ItsFluxo",
        },
        {
          title: "Producto full stack",
          body: "Datos multi-tenant, autenticación y frontends en React sobre un backend con NestJS y PostgreSQL.",
          proof: "Ges2l",
        },
      ],
    },
    experience: {
      eyebrow: "Trayectoria",
      title: "Experiencia y formación",
      employer: "We Are Solutions, Inc.",
      employmentPeriod: "Mar. 2024 – sep. 2026",
      employmentDetail: "Medio tiempo de marzo a agosto de 2024 y tiempo completo desde septiembre de 2024.",
      roles: [
        {
          title: "Webmaster",
          period: "Sep. 2025 – sep. 2026",
          note: "Cargo oficial registrado para este periodo.",
        },
      ],
      school: "Corporación Universitaria Remington",
      degree: "Ingeniería de Sistemas",
      degreeStatus: "En curso",
    },
    writing: {
      eyebrow: "Artículos",
      title: "Notas sobre construir para la web",
      empty:
        "Estoy escribiendo mis primeros artículos, sobre Astro, Cloudflare, SEO técnico y rendimiento web. Aparecerán aquí cuando estén publicados.",
      all: "Todos los artículos",
    },
    about: {
      eyebrow: "Sobre mí",
      title: "Un poco sobre mí",
      paragraphs: [
        "Soy Andrés, desarrollador web en Colombia. Trabajo en español e inglés, y casi todo lo que construyo está pensado para leerse en ambos idiomas.",
        "Me importan las partes de un sitio web que solo se notan cuando fallan: los metadatos que leen los buscadores, el primer render en un teléfono lento, el recorrido con teclado por una página.",
        "También estudio Ingeniería de Sistemas en la Corporación Universitaria Remington.",
      ],
      portraitAlt: "Retrato de Andrés Cuello",
    },
    contact: {
      eyebrow: "Contacto",
      title: "¿Buscas a alguien para un rol web o frontend remoto?",
      body: "El correo es la forma más directa de contactarme. También puedes escribirme por LinkedIn o agendar una llamada corta.",
      emailAria: "Enviar un correo a andres@cuello.dev",
      linkedin: "Escríbeme en LinkedIn",
      github: "GitHub",
      call: "Agendar una llamada",
      newTab: "se abre en una pestaña nueva",
    },
  },
  caseStudy: {
    eyebrow: "Caso de estudio",
    titleSuffix: "caso de estudio",
    back: "Todos los proyectos",
    linksLabel: "Enlaces",
    home: "Inicio",
  },
  writing: {
    title: "Artículos",
    lead: "Artículos sobre Astro, Cloudflare, SEO técnico y rendimiento web.",
    empty: "Todavía no hay artículos publicados. Los primeros están en preparación.",
    published: "Publicado",
    updated: "Actualizado",
    back: "Todos los artículos",
  },
  seo: {
    home: {
      title: "Andrés Cuello — Desarrollador web: Astro, TypeScript, Cloudflare",
      description:
        "Desarrollador web en Colombia: sitios rápidos y fáciles de encontrar con Astro, TypeScript y Cloudflare. SEO técnico, i18n, rendimiento y accesibilidad.",
    },
    writing: {
      title: "Artículos — Andrés Cuello, desarrollador web",
      description:
        "Artículos de Andrés Cuello sobre Astro, Cloudflare, SEO técnico, internacionalización y rendimiento web, a partir de sitios bilingües reales.",
    },
    notFound: {
      title: "Página no encontrada — Andrés Cuello",
      description: "Esta página no existe.",
    },
  },
} as const satisfies Translations;
