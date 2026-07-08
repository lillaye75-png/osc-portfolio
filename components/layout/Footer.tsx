import Link from "next/link";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";

const servicesLinks = [
  { label: "Conception 2D/3D", href: "/services/conception" },
  { label: "Études Structurelles", href: "/services/etudes-structurelles" },
  { label: "Estimation & Devis", href: "/services/estimation" },
  { label: "Supervision de Chantier", href: "/services/supervision" },
  { label: "Rénovation", href: "/services/renovation" },
];

const realisationsLinks = [
  { label: "Résidentiel", href: "/realisations?categorie=residential" },
  { label: "Commercial", href: "/realisations?categorie=commercial" },
  { label: "Institutionnel", href: "/realisations?categorie=institutionnel" },
  { label: "Industriel", href: "/realisations?categorie=industriel" },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "#",
    icon: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29.4 29.4 0 0 0 1 12a29.4 29.4 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29.4 29.4 0 0 0 23 12a29.4 29.4 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-6">
            <Link href="/" className="font-serif text-3xl font-bold tracking-wider text-gold">
              OSC
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              Oscar Sénégal Construction &mdash; votre partenaire de confiance pour tous vos projets
              de construction, rénovation et aménagement au Sénégal.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/60 transition-colors hover:border-gold hover:text-gold"
                >
                  <social.icon />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-6 font-sans text-xs font-semibold uppercase tracking-widest text-gold">
              Services
            </h3>
            <ul className="space-y-3">
              {servicesLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-gold"
                  >
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-6 font-sans text-xs font-semibold uppercase tracking-widest text-gold">
              Réalisations
            </h3>
            <ul className="space-y-3">
              {realisationsLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-gold"
                  >
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-6 font-sans text-xs font-semibold uppercase tracking-widest text-gold">
              Contact
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+221771234567"
                  className="flex items-start gap-3 text-sm text-gray-400 transition-colors hover:text-gold"
                >
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <span>+221 77 123 45 67</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@osc-senegal.com"
                  className="flex items-start gap-3 text-sm text-gray-400 transition-colors hover:text-gold"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <span>contact@osc-senegal.com</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-sm text-gray-400">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <span>
                    Dakar, Sénégal<br />
                    BP 12345 Dakar Fann
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 md:flex-row md:px-8">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Oscar Sénégal Construction. Tous droits réservés.
          </p>
          <Link
            href="/mentions-legales"
            className="text-xs text-gray-500 transition-colors hover:text-gold"
          >
            Mentions Légales
          </Link>
        </div>
      </div>
    </footer>
  );
}
