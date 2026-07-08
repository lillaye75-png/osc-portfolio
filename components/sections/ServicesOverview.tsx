"use client";

import Link from "next/link";
import { ArrowRight, PenTool, Eye, HardHat, Calculator, ClipboardCheck, PencilRuler, Box, Hammer } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";
import type { Service } from "@/lib/supabase/types";

const iconMap: Record<string, LucideIcon> = {
  PenTool,
  Eye,
  HardHat,
  Calculator,
  ClipboardCheck,
  PencilRuler,
  Box,
  Hammer,
};

interface ServicesOverviewProps {
  services: Service[];
}

export function ServicesOverview({ services }: ServicesOverviewProps) {
  if (services.length === 0) return null;

  return (
    <section className="bg-off-white py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <Reveal>
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-serif text-3xl font-bold text-charcoal md:text-5xl">
              Nos Services
            </h2>
            <p className="mx-auto max-w-2xl font-sans text-base leading-relaxed text-gray-600 md:text-lg">
              Expertise complète de A à Z
            </p>
          </div>
        </Reveal>

        <StaggerContainer staggerDelay={0.1}>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {services.map((service) => {
              const IconComponent = iconMap[service.icon];
              return (
                <StaggerItem key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group flex h-full flex-col items-center rounded-sm bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                  >
                    {IconComponent && (
                      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gold/10 transition-colors group-hover:bg-gold/20">
                        <IconComponent className="h-6 w-6 text-gold" />
                      </div>
                    )}
                    <h3 className="mb-3 font-sans text-sm font-semibold uppercase tracking-wider text-charcoal">
                      {service.title}
                    </h3>
                    <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-600">
                      {service.short_description}
                    </p>
                    <span className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-gold transition-colors group-hover:text-gold-dark">
                      En savoir plus
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </StaggerItem>
              );
            })}
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
}
