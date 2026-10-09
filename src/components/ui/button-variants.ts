import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "btn-sheen inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-[color,background-color,box-shadow,transform,border-color] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:not-disabled:scale-[0.96]",
  {
    variants: {
      variant: {
        default:
          "bg-foreground text-background shadow-[var(--shadow-border)] hover:opacity-90",
        accent:
          "bg-accent text-accent-foreground hover:opacity-90 shadow-[0_0_28px_-10px_var(--accent)]",
        warm:
          "bg-accent-warm text-[#0a0a0a] hover:brightness-105 shadow-[0_0_28px_-8px_var(--accent-warm)]",
        outline:
          "border border-border bg-transparent text-foreground hover:bg-card hover:border-border-strong hover:shadow-[var(--shadow-border)]",
        ghost: "text-foreground hover:bg-card",
        subtle:
          "bg-card text-foreground border border-border hover:border-border-strong hover:bg-card-elevated",
      },
      size: {
        default: "h-11 rounded-md px-4 text-sm",
        sm: "h-9 rounded-sm px-3 text-sm",
        lg: "h-12 rounded-lg px-5 text-[15px]",
        icon: "size-11 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);
