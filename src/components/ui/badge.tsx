import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { categoryBadgeStyle, statusBadgeStyle } from "@/lib/categories";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium tracking-wide uppercase",
  {
    variants: {
      variant: {
        default: "border-border bg-card text-muted-foreground",
        accent: "border-transparent bg-accent-soft text-accent",
        solid: "border-transparent bg-foreground text-background",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export function Badge({
  className,
  variant,
  category,
  status,
  ...props
}: HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof badgeVariants> & { category?: string; status?: string }) {
  const style =
    status && variant !== "solid"
      ? statusBadgeStyle(status)
      : category && variant !== "solid"
        ? categoryBadgeStyle(category)
        : undefined;
  return (
    <div className={cn(badgeVariants({ variant }), className)} style={style} {...props} />
  );
}
