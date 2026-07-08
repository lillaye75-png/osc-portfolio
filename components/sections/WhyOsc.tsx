"use client";

import { useRef } from "react";
import { useInView, animate } from "framer-motion";
import { useEffect, useState } from "react";
import { Shield, Medal, Clock, FileText } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";

interface CountUpProps {
  end: number;
  suffix?: string;
  duration?: number;
}

function CountUp({ end, suffix = "", duration = 2 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, end, {
      duration,
      ease: "easeOut",
      onUpdate: (value) => setCount(Math.floor(value)),
    });
    return () => controls.stop();
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const stats = [
  { value: 10, suffix: "+", label: "ans d'expérience" },
  { value: 50, suffix: "+", label: "projets réalisés" },
  { value: 150, suffix: "+", label: "clients satisfaits" },
];

const trustPoints = [
  { icon: Shield, title: "Équipe certifiée", description: "Professionnels qualifiés et agréés" },
  { icon: Medal, title: "Matériaux de qualité", description: "Sélection rigoureuse des fournisseurs" },
  { icon: Clock, title: "Respect des délais", description: "Planning maîtrisé et suivi rigoureux" },
  {
    icon: FileText,
    title: "Devis transparents",
    description: "Aucun frais caché, budget respecté",
  },
];

export function WhyOsc() {
  return (
    <section className="bg-charcoal py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <Reveal>
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-serif text-3xl font-bold text-white md:text-5xl">
              Pourquoi Choisir OSC
            </h2>
            <p className="mx-auto max-w-2xl font-sans text-base leading-relaxed text-gray-400 md:text-lg">
              Des années d&apos;excellence au service de vos projets de construction
            </p>
          </div>
        </Reveal>

        <div className="mb-20 grid gap-8 sm:grid-cols-3">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.15}>
              <div className="text-center">
                <p className="font-serif text-5xl font-bold text-gold md:text-6xl">
                  <CountUp end={stat.value} suffix={stat.suffix} duration={2 + i * 0.5} />
                </p>
                <p className="mt-2 font-sans text-sm font-medium uppercase tracking-wider text-gray-400">
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <StaggerContainer staggerDelay={0.15}>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trustPoints.map((point) => (
              <StaggerItem key={point.title}>
                <div className="rounded-sm border border-white/10 p-6 text-center transition-colors hover:border-gold/30">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold/10">
                    <point.icon className="h-5 w-5 text-gold" />
                  </div>
                  <h3 className="mb-2 font-sans text-sm font-semibold uppercase tracking-wider text-white">
                    {point.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-400">{point.description}</p>
                </div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
}
