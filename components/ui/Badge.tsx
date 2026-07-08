import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const variants = {
  default: "bg-gold text-charcoal",
  outline: "border border-gold text-gold",
};

const sizes = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
};

type BadgeProps = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
  children: React.ReactNode;
} & HTMLAttributes<HTMLSpanElement>;

function Badge({
  variant = "default",
  size = "sm",
  className,
  children,
  ...rest
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium tracking-wide",
        variants[variant],
        sizes[size],
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}

export { Badge };
export type { BadgeProps };
