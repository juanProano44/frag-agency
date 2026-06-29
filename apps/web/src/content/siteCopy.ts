import type { Language } from '../providers/LocaleProvider';

type SiteCopy = {
  nav: {
    home: string;
    work: string;
    services: string;
    contact: string;
  };
  actions: {
    themeLight: string;
    themeDark: string;
    languageLabel: string;
    english: string;
    spanish: string;
  };
  loading: string;
  home: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    stats: Array<{ label: string; value: string }>;
    featuredTitle: string;
    featuredSubtitle: string;
    servicesTitle: string;
    servicesSubtitle: string;
  };
  work: {
    eyebrow: string;
    title: string;
    subtitle: string;
    alternatingTitle: string;
    alternatingSubtitle: string;
    stripTitle: string;
    stripSubtitle: string;
    galleryTitle: string;
    gallerySubtitle: string;
  };
  services: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    subtitle: string;
    emailLabel: string;
    emailValue: string;
    nameLabel: string;
    emailFieldLabel: string;
    messageLabel: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    helper: string;
    send: string;
    sending: string;
    successTitle: string;
    successBody: string;
    errorTitle: string;
    errorBody: string;
  };
  footer: {
    brand: string;
    copy: string;
  };
};

export const siteCopy: Record<Language, SiteCopy> = {
  es: {
    nav: {
      home: 'Inicio',
      work: 'Portafolio',
      services: 'Servicios',
      contact: 'Contacto',
    },
    actions: {
      themeLight: 'Claro',
      themeDark: 'Oscuro',
      languageLabel: 'Idioma',
      english: 'EN',
      spanish: 'ES',
    },
    loading: 'Preparando la experiencia...',
    home: {
      eyebrow: 'Frag Agency / Fotografía y dirección visual',
      title: 'Fotografía con estructura, ritmo e impacto comercial.',
      subtitle:
        'Creamos narrativas visuales de alto impacto para marcas líderes. Dirección de arte y fotografía editorial diseñadas para destacar en medios digitales.',
      primaryCta: 'Ver portafolio',
      secondaryCta: 'Escribir al estudio',
      stats: [
        { label: 'Piezas curadas', value: '23' },
        { label: 'Campañas globales', value: '12+' },
        { label: 'Premios de diseño', value: '8' },
      ],
      featuredTitle: 'Selección destacada',
      featuredSubtitle:
        'Proyectos insignia que definen nuestra visión: estética rigurosa, iluminación precisa y narrativa de marca.',
      servicesTitle: 'Capacidades',
      servicesSubtitle:
        'Dirección creativa integral para campañas, catálogos y plataformas interactivas de alto rendimiento.',
    },
    work: {
      eyebrow: 'Archivo visual',
      title: 'Nuestro trabajo',
      subtitle:
        'Una muestra detallada de nuestros proyectos editoriales, explorando la relación entre el espacio, el sujeto y la luz.',
      alternatingTitle: 'Narrativas en secuencia',
      alternatingSubtitle:
        'Proyectos de retrato y paisaje editorial diseñados bajo una curaduría estética coherente.',
      stripTitle: 'Luz y movimiento',
      stripSubtitle:
        'Tomas panorámicas que capturan momentos efímeros bajo una dirección de arte precisa.',
      galleryTitle: 'Archivo completo',
      gallerySubtitle:
        'Explora nuestra colección completa de obras de arte digital, paisaje contemporáneo y fotografía de moda.',
    },
    services: {
      eyebrow: 'Servicios',
      title: 'Servicios',
      subtitle:
        'Nuestras capacidades cubren identidad visual corporativa, dirección artística para campañas publicitarias y producción fotográfica.',
    },
    contact: {
      eyebrow: 'Contacto',
      title: 'Hablemos del proyecto',
      subtitle:
        'Inicia tu próximo proyecto visual. Cuéntanos tu idea o envíanos tu brief para ponernos en contacto.',
      emailLabel: 'Correo de contacto',
      emailValue: 'juanjobabu@gmail.com',
      nameLabel: 'Nombre',
      emailFieldLabel: 'Correo',
      messageLabel: 'Mensaje',
      namePlaceholder: 'Tu nombre',
      emailPlaceholder: 'correo@dominio.com',
      messagePlaceholder: 'Cuéntanos qué necesitas, plazos y tipo de sesión.',
      helper: 'Responderemos desde el estudio apenas llegue el correo.',
      send: 'Enviar mensaje',
      sending: 'Enviando...',
      successTitle: 'Mensaje enviado',
      successBody:
        'Tu mensaje ha sido recibido con éxito. Un director de arte del estudio se pondrá en contacto en menos de 24 horas.',
      errorTitle: 'No fue posible enviar',
      errorBody:
        'Revisa la conexión y vuelve a intentarlo. Si persiste, puedes escribirnos directamente al correo del estudio.',
    },
    footer: {
      brand: 'Frag Agency',
      copy: '© 2026 Frag Agency. Todos los derechos reservados. Dirección de arte y producción visual.',
    },
  },
  en: {
    nav: {
      home: 'Home',
      work: 'Portfolio',
      services: 'Services',
      contact: 'Contact',
    },
    actions: {
      themeLight: 'Light',
      themeDark: 'Dark',
      languageLabel: 'Language',
      english: 'EN',
      spanish: 'ES',
    },
    loading: 'Preparing the experience...',
    home: {
      eyebrow: 'Frag Agency / Photography and visual direction',
      title: 'Photography with structure, rhythm and commercial impact.',
      subtitle:
        'We create high-impact visual narratives for leading brands. Art direction and editorial photography designed to stand out in digital media.',
      primaryCta: 'View portfolio',
      secondaryCta: 'Contact the studio',
      stats: [
        { label: 'Curated pieces', value: '23' },
        { label: 'Global campaigns', value: '12+' },
        { label: 'Design awards', value: '8' },
      ],
      featuredTitle: 'Featured selection',
      featuredSubtitle:
        'Flagship projects that define our vision: rigorous aesthetics, precise lighting, and brand narrative.',
      servicesTitle: 'Capabilities',
      servicesSubtitle:
        'Comprehensive creative direction for campaigns, catalogs, and high-performance interactive platforms.',
    },
    work: {
      eyebrow: 'Visual archive',
      title: 'Our work',
      subtitle:
        'A detailed showcase of our editorial projects, exploring the relationship between space, subject, and light.',
      alternatingTitle: 'Sequential Narratives',
      alternatingSubtitle:
        'Editorial portrait and landscape projects designed under a coherent aesthetic curation.',
      stripTitle: 'Light and Motion',
      stripSubtitle:
        'Panoramic shots capturing fleeting moments under precise art direction.',
      galleryTitle: 'Full archive',
      gallerySubtitle:
        'Explore our complete collection of digital art, contemporary landscapes, and fashion photography.',
    },
    services: {
      eyebrow: 'Services',
      title: 'Services',
      subtitle:
        'Our capabilities cover corporate visual identity, art direction for advertising campaigns, and photographic production.',
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Let us talk about the project',
      subtitle:
        'Start your next visual project. Tell us your idea or send us your brief to get in touch.',
      emailLabel: 'Contact email',
      emailValue: 'juanjobabu@gmail.com',
      nameLabel: 'Name',
      emailFieldLabel: 'Email',
      messageLabel: 'Message',
      namePlaceholder: 'Your name',
      emailPlaceholder: 'name@domain.com',
      messagePlaceholder: 'Tell us what you need, timing and session type.',
      helper: 'We will reply from the studio as soon as the message arrives.',
      send: 'Send message',
      sending: 'Sending...',
      successTitle: 'Message sent',
      successBody:
        'Your message has been successfully received. An art director from the studio will contact you within 24 hours.',
      errorTitle: 'Could not send',
      errorBody:
        'Check the connection and try again. If it keeps failing, you can write directly to the studio email.',
    },
    footer: {
      brand: 'Frag Agency',
      copy: '© 2026 Frag Agency. All rights reserved. Art direction and visual production.',
    },
  },
};