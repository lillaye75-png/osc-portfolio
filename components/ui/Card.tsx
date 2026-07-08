import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "sm" | "md" | "lg";
}

const paddings = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export function Card({
  children,
  className,
  hover = false,
  padding = "md",
  ...rest
}: CardProps) {
  return (
    <div
      className={cn(
        "bg-white dark:bg-charcoal-soft rounded-lg shadow-sm",
        paddings[padding],
        hover &&
          "transition-all duration-250 ease-out hover:-translate-y-0.5 hover:shadow-md",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
