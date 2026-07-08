"use client";

import Link from "next/link";
import { ArrowRight, PenTool, Eye, HardHat, Calculator, ClipboardCheck, PencilRuler, Box, Hammer } from "lucide-react";
import type { LucideIcon } from "lucide-react";

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

interface Service {
  title: string;
  icon: string;
  shortDescription: string;
  slug: string;
}

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const IconComponent = iconMap[service.icon];

  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex h-full flex-col rounded-sm bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
    >
      {IconComponent && (
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gold/10 transition-colors group-hover:bg-gold/20">
          <IconComponent className="h-6 w-6 text-gold" />
        </div>
      )}

      <h3 className="mb-3 font-serif text-xl font-bold text-charcoal group-hover:text-gold transition-colors">
        {service.title}
      </h3>

      <p className="mb-6 flex-1 text-sm leading-relaxed text-gray-600">
        {service.shortDescription}
      </p>

      <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold transition-colors group-hover:text-gold-dark">
        En savoir plus
        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
