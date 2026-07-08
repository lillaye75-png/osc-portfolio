"use client";

import { Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

export function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-charcoal py-20 md:py-32">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/40 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
        <Reveal>
          <h2 className="mb-6 font-serif text-3xl font-bold text-white md:text-5xl">
            Prêt à Construire Votre Projet&nbsp;?
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mx-auto mb-10 max-w-xl font-sans text-base leading-relaxed text-gray-400 md:text-lg">
            Contactez-nous dès aujourd&apos;hui pour un devis gratuit et sans engagement.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="flex flex-col items-center gap-6">
            <Button href="/contact" variant="primary" size="lg">
              Demander un devis gratuit
            </Button>
            <a
              href="tel:+221771234567"
              className="inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-gold"
            >
              <Phone className="h-4 w-4" />
              +221 77 123 45 67
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
