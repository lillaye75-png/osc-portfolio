"use client";

import { cn } from "@/lib/utils";

interface FilterPillsProps {
  categories: string[];
  active: string;
  onChange: (category: string) => void;
}

export function FilterPills({ categories, active, onChange }: FilterPillsProps) {
  return (
    <div className="flex flex-wrap gap-3 overflow-x-auto pb-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onChange(category)}
          className={cn(
            "whitespace-nowrap rounded-full border px-5 py-2 font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-300",
            active === category
              ? "border-gold bg-gold text-charcoal"
              : "border-gray-300 bg-transparent text-gray-600 hover:border-gold hover:text-gold"
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
