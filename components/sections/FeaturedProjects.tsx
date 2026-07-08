"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";
import type { Project } from "@/lib/supabase/types";

interface FeaturedProjectsProps {
  projects: Project[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  if (projects.length === 0) return null;

  return (
    <section className="py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <Reveal>
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-serif text-3xl font-bold text-charcoal md:text-5xl">
              Nos Réalisations Récentes
            </h2>
            <p className="mx-auto max-w-2xl font-sans text-base leading-relaxed text-gray-600 md:text-lg">
              Découvrez une sélection de nos projets les plus remarquables, témoins de notre
              expertise et de notre engagement envers l&apos;excellence.
            </p>
          </div>
        </Reveal>

        <StaggerContainer staggerDelay={0.15}>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <StaggerItem key={project.slug}>
                <ProjectCard project={project} />
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>

        <Reveal delay={0.4}>
          <div className="mt-12 text-center">
            <Link
              href="/realisations"
              className="group inline-flex items-center gap-2 font-sans text-sm font-semibold uppercase tracking-wider text-charcoal transition-colors hover:text-gold"
            >
              Voir tous les projets
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
