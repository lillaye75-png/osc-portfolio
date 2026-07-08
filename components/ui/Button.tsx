"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  isLoading?: boolean;
  href?: string;
}

const variantStyles = {
  primary:
    "bg-gold text-charcoal hover:bg-gold-light border border-gold font-semibold",
  outline:
    "bg-transparent text-white border border-white/30 hover:bg-white/10 hover:border-white/60",
  ghost:
    "bg-transparent text-white hover:text-gold",
};

const sizeStyles = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, children, isLoading, href, ...props }, ref) => {
    const classes = cn(
      "inline-flex items-center justify-center gap-2 rounded-sm font-sans uppercase tracking-wider transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
      variantStyles[variant],
      sizeStyles[size],
      className
    );

    if (href) {
      return (
        <a href={href} className={classes}>
          {children}
        </a>
      );
    }

    return (
      <button ref={ref} className={classes} disabled={isLoading || props.disabled} {...props}>
        {isLoading ? (
          <>
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Envoi...
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
