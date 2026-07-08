"use client";

import { useState } from "react";
import Link from "next/link";
import { X, ChevronDown, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const servicesSubLinks = [
  { label: "Conception 2D/3D", href: "/services/conception" },
  { label: "Études Structurelles", href: "/services/etudes-structurelles" },
  { label: "Estimation & Devis", href: "/services/estimation" },
  { label: "Supervision de Chantier", href: "/services/supervision" },
  { label: "Rénovation", href: "/services/renovation" },
];

const realisationsSubLinks = [
  { label: "Résidentiel", href: "/realisations?categorie=residential" },
  { label: "Commercial", href: "/realisations?categorie=commercial" },
  { label: "Institutionnel", href: "/realisations?categorie=institutionnel" },
];

const navItems = [
  { label: "Services", href: "/services", subLinks: servicesSubLinks },
  { label: "Réalisations", href: "/realisations", subLinks: realisationsSubLinks },
  { label: "À propos", href: "/a-propos" },
  { label: "Processus", href: "/process" },
  { label: "Contact", href: "/contact" },
];

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggleSubMenu = (label: string) => {
    setExpanded(expanded === label ? null : label);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/50"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col bg-charcoal"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <Link
                href="/"
                onClick={onClose}
                className="font-serif text-2xl font-bold tracking-wider text-gold"
              >
                OSC
              </Link>
              <button
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Fermer le menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-6 py-8">
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.label}>
                    {"subLinks" in item && item.subLinks ? (
                      <div>
                        <button
                          onClick={() => toggleSubMenu(item.label)}
                          className="flex w-full items-center justify-between py-3 text-sm font-medium uppercase tracking-wider text-white transition-colors hover:text-gold"
                        >
                          {item.label}
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${
                              expanded === item.label ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        <AnimatePresence>
                          {expanded === item.label && (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden pl-4"
                            >
                              {item.subLinks.map((sub) => (
                                <li key={sub.href}>
                                  <Link
                                    href={sub.href}
                                    onClick={onClose}
                                    className="block py-2 text-sm text-gray-400 transition-colors hover:text-gold"
                                  >
                                    {sub.label}
                                  </Link>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="block py-3 text-sm font-medium uppercase tracking-wider text-white transition-colors hover:text-gold"
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            <div className="border-t border-white/10 px-6 py-6 space-y-4">
              <Button
                href="/contact"
                variant="primary"
                size="lg"
                className="w-full"
                onClick={onClose}
              >
                Demander un devis
              </Button>
              <a
                href="tel:+221771234567"
                className="flex items-center justify-center gap-2 text-sm text-gray-400 transition-colors hover:text-gold"
              >
                <Phone className="h-4 w-4" />
                +221 77 123 45 67
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
