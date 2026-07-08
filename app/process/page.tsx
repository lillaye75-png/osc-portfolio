"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { processSteps } from "@/lib/data";

function StepCard({
  step,
  index,
}: {
  step: (typeof processSteps)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="relative flex gap-6 sm:gap-10">
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold text-lg font-bold text-white shadow-md"
        >
          {step.number}
        </motion.div>
        {index < processSteps.length - 1 && (
          <div className="mt-2 h-full w-0.5 bg-gold/20" />
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="mb-12 flex-1"
      >
        <h3 className="mb-2 text-xl font-bold text-charcoal">{step.title}</h3>
        <p className="leading-relaxed text-gray-600">{step.description}</p>
      </motion.div>
    </div>
  );
}

export default function ProcessPage() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-gold">
            Comment Nous Travaillons
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-charcoal sm:text-5xl">
            Notre Processus
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-gray-500">
            Une méthodologie éprouvée en 7 étapes, de la première consultation à la livraison
            de votre projet clé en main.
          </p>
        </div>

        <div className="ml-1">
          {processSteps.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </div>

        <div className="mt-16 rounded-xl bg-off-white p-10 text-center">
          <h2 className="mb-3 text-2xl font-bold text-charcoal">
            Prêt à Démarrer Votre Projet&nbsp;?
          </h2>
          <p className="mb-6 text-gray-500">
            Suivez notre processus et donnez vie à votre projet de construction.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-gold px-8 py-3.5 text-base font-semibold text-charcoal transition-all hover:bg-gold-light"
          >
            Commencer
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
