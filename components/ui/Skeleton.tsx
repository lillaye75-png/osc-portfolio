import { cn } from "@/lib/utils";

const variants = {
  text: "h-4 w-full rounded",
  card: "h-48 w-full rounded-lg",
  image: "aspect-video w-full rounded-lg",
};

type SkeletonProps = {
  className?: string;
  variant?: keyof typeof variants;
};

function Skeleton({ className, variant = "text" }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-gray-200 dark:bg-gray-700",
        variants[variant],
        className,
      )}
      aria-hidden="true"
    />
  );
}

export { Skeleton };
export type { SkeletonProps };
