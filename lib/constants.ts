export const SITE = {
  name: "Oscar Sénégal Construction",
  shortName: "OSC",
  tagline: "Architecture • Ingénierie • Construction",
  phone: "+221 33 000 00 00",
  email: "contact@osc-senegal.com",
  address: "Dakar, Sénégal",
  whatsapp: "+221 77 000 00 00",
} as const;

export const NAV_ITEMS = [
  { label: "Accueil", href: "/" },
  { label: "À propos", href: "/a-propos" },
  { label: "Services", href: "/services" },
  { label: "Réalisations", href: "/realisations" },
  { label: "Contact", href: "/contact" },
] as const;

export const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com/osc-senegal" },
  { label: "Facebook", href: "https://facebook.com/osc-senegal" },
  { label: "LinkedIn", href: "https://linkedin.com/company/osc-senegal" },
] as const;

export const SEO = {
  title: `${SITE.name} — ${SITE.tagline}`,
  description:
    "Cabinet d'architecture, ingénierie et construction au Sénégal. Conception 2D/3D, plans béton, devis et supervision de projets.",
  url: "https://osc-senegal.com",
  locale: "fr_SN",
} as const;
