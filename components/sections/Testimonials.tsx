"use client";

import { useState } from "react";
import { Star, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/lib/supabase/types";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemsPerPage = 2;
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);
  const currentPage = Math.floor(activeIndex / itemsPerPage);

  const visibleTestimonials = testimonials.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  if (testimonials.length === 0) return null;

  return (
    <section className="bg-off-white py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <Reveal>
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-serif text-3xl font-bold text-charcoal md:text-5xl">
              Ce Que Disent Nos Clients
            </h2>
          </div>
        </Reveal>

        <div className="relative min-h-[280px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="grid gap-8 md:grid-cols-2"
            >
              {visibleTestimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="relative rounded-sm bg-white p-8 shadow-sm"
                >
                  <Quote className="absolute right-8 top-8 h-8 w-8 text-gold/20" />
                  <div className="mb-4 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <blockquote className="mb-6 text-sm leading-relaxed text-gray-600 italic">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <div className="mb-4 h-px w-12 bg-gold" />
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-charcoal text-xs font-semibold text-white">
                      {getInitials(testimonial.client_name)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-charcoal">{testimonial.client_name}</p>
                      <p className="text-xs text-gray-500">
                        {testimonial.role && `${testimonial.role} — `}{testimonial.project_ref}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center justify-center gap-3">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i * itemsPerPage)}
              className={cn(
                "h-2.5 rounded-full transition-all duration-300",
                i === currentPage ? "w-8 bg-gold" : "w-2.5 bg-gray-300 hover:bg-gray-400"
              )}
              aria-label={`Page ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
