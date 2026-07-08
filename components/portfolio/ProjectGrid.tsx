"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { FilterPills } from "@/components/portfolio/FilterPills";
import type { Project } from "@/lib/supabase/types";

const categories = ["Tous", "Résidentiel", "Commercial", "Institutionnel"];

const categoryMap: Record<string, string> = {
  residential: "Résidentiel",
  commercial: "Commercial",
  institutional: "Institutionnel",
};

interface ProjectGridProps {
  projects: Project[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  const [activeCategory, setActiveCategory] = useState("Tous");

  const filteredProjects =
    activeCategory === "Tous"
      ? projects
      : projects.filter((p) => categoryMap[p.category] === activeCategory);

  return (
    <div>
      <div className="mb-10">
        <FilterPills
          categories={categories}
          active={activeCategory}
          onChange={setActiveCategory}
        />
      </div>

      <AnimatePresence mode="popLayout">
        <motion.div
          layout
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {filteredProjects.length === 0 && (
        <p className="py-20 text-center font-sans text-gray-500">
          Aucun projet trouvé dans cette catégorie.
        </p>
      )}
    </div>
  );
}
