import { Children, cloneElement, isValidElement, useId, type ReactNode } from "react";
import { AlertTriangle, CheckCircle2, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export function AdminPageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
      <div className="min-w-0">
        <p className="mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          Operator console
        </p>
        <h1 className="mt-1 font-display text-3xl tracking-tight">
          <span className="gradient-text">{title}</span>
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{description}</p>
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
  );
}

export function AdminCard({
  children,
  className,
  pad = true,
}: {
  children: ReactNode;
  className?: string;
  pad?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card shadow-[var(--shadow-border)] transition-[border-color,box-shadow] hover:border-border-strong hover:shadow-[var(--shadow-border-hover)]",
        pad && "p-5",
        className,
      )}
    >
      {children}
    </div>
  );
}


export function StatusBanner({
  kind,
  children,
}: {
  kind: "success" | "error" | "info";
  children: ReactNode;
}) {
  const Icon = kind === "success" ? CheckCircle2 : kind === "error" ? AlertTriangle : Info;
  return (
    <div
      role="status"
      className={cn(
        "flex items-start gap-2 rounded-lg border px-3 py-2 text-sm",
        kind === "success" && "border-emerald-500/30 bg-emerald-500/10 text-emerald-200",
        kind === "error" && "border-red-500/30 bg-red-500/10 text-red-300",
        kind === "info" && "border-sky-500/30 bg-sky-500/10 text-sky-200",
      )}
    >
      <Icon className="mt-0.5 size-4 shrink-0" />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}

export function Field({
  label,
  hint,
  children,
  className,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  const id = useId();
  const child = Children.only(children);
  const control = isValidElement(child)
    ? cloneElement(child as React.ReactElement<{ id?: string; "aria-label"?: string }>, {
        id,
        "aria-label": label,
      })
    : child;
  return (
    <div className={cn("block space-y-1.5", className)}>
      <label htmlFor={id} className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </label>
      {control}
      {hint ? <span className="block text-xs text-subtle">{hint}</span> : null}
    </div>
  );
}

export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-dashed border-border bg-card/40 px-6 py-12 text-center">
      <p className="font-display text-lg tracking-tight">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">{body}</p>
    </div>
  );
}

export function FilterChips<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (next: T) => void;
  options: readonly { value: T; label: string; count?: number }[];
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              "inline-flex h-8 items-center gap-1.5 rounded-full border px-3 text-xs font-medium transition-colors",
              active
                ? "border-accent bg-accent-soft text-accent"
                : "border-border text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {opt.label}
            {typeof opt.count === "number" ? (
              <span className={cn("tabular-nums", active ? "text-accent/80" : "text-subtle")}>
                {opt.count}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
