"use client";

import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";

const headingWords = ["Oscar", "Sénégal", "Construction"];

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal-mid to-charcoal" />

      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold/30 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
        <StaggerContainer staggerDelay={0.15}>
          <h1 className="mb-6 font-serif text-5xl font-bold leading-tight text-white md:text-7xl lg:text-8xl">
            {headingWords.map((word, i) => (
              <StaggerItem key={i} className="inline-block">
                <span className="inline-block">
                  {word}
                  {i < headingWords.length - 1 && "\u00A0"}
                </span>
              </StaggerItem>
            ))}
          </h1>

          <StaggerItem>
            <p className="mx-auto mb-12 max-w-2xl font-sans text-lg font-light leading-relaxed tracking-wide text-white/70 md:text-xl">
              Architecture &bull; Ingénierie &bull; Construction
            </p>
          </StaggerItem>

          <StaggerItem>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/contact" variant="primary" size="lg">
                Demander un devis
              </Button>
              <Button href="/realisations" variant="outline" size="lg">
                Voir nos réalisations
              </Button>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { duration: 0.6, delay: 2 },
          y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
      >
        <ChevronDown className="h-8 w-8 text-white/50" />
      </motion.div>
    </section>
  );
}
