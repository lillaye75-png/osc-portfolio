"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/lib/supabase/types";

const categoryLabels: Record<string, string> = {
  residential: "Résidentiel",
  commercial: "Commercial",
  institutional: "Institutionnel",
};

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/realisations/${project.slug}`} className="group block">
      <div className="relative overflow-hidden rounded-sm">
        <div className="relative aspect-[4/3] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-charcoal to-charcoal-mid" />
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-charcoal-light to-charcoal"
            initial={false}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          <span className="absolute left-4 top-4 z-10 rounded-sm bg-gold/90 px-3 py-1 font-sans text-xs font-semibold uppercase tracking-wider text-charcoal">
            {categoryLabels[project.category] || project.category}
          </span>

          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/0 p-6 transition-colors group-hover:bg-black/60">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileHover={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <h3 className="mb-2 font-serif text-xl font-bold text-white">{project.title}</h3>
              <p className="mb-4 text-sm text-white/70">{project.location}</p>
              <span className="inline-flex items-center gap-2 rounded-sm border border-gold px-4 py-2 font-sans text-xs font-semibold uppercase tracking-wider text-gold transition-colors group-hover:bg-gold group-hover:text-charcoal">
                Voir le projet
                <ArrowRight className="h-3 w-3" />
              </span>
            </motion.div>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="font-serif text-lg font-bold text-charcoal transition-colors group-hover:text-gold">
            {project.title}
          </h3>
          <p className="mt-1 text-sm text-gray-500">{project.location}</p>
        </div>
      </div>
    </Link>
  );
}
