import { zodResolver } from "@hookform/resolvers/zod";
import { useState, type ReactNode, type SelectHTMLAttributes } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ArrowRight, CheckCircle2, Mail, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SectionHeading } from "@/components/reveal";
import { TiltCard } from "@/components/ui/tilt";
import { DepthReveal } from "@/components/ui/depth";
import { SectionStage } from "@/components/ui/section-stage";
import { budgetScopes, projectTypes } from "@/data/content";
import { contactEndpoint, site } from "@/data/site";
import { persistContactMessage, usePublicSiteSettings } from "@/lib/use-public-content";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.email("Enter a valid email"),
  projectType: z.string().min(1, "Select a project type"),
  budget: z.string().min(1, "Select a scope"),
  message: z.string().min(12, "Tell me a little more about the idea"),
});

type FormValues = z.infer<typeof schema>;
type Status = "idle" | "loading" | "success" | "error";
type Delivery = "formspree" | "email" | "inbox";

const PROCESS_STEPS = [
  {
    title: "Read",
    body: "I review the brief and reply with questions if anything is unclear.",
  },
  {
    title: "Scope",
    body: "We align on stack, timeline, and what â€œdoneâ€ actually means.",
  },
  {
    title: "Build",
    body: "Shipping in public where possible â€” demos, repos, and honest progress.",
  },
] as const;

export function Contact({ standalone = false }: { standalone?: boolean }) {
  const [status, setStatus] = useState<Status>("idle");
  const [delivery, setDelivery] = useState<Delivery>("email");
  const [persistError, setPersistError] = useState<string | null>(null);
  const settings = usePublicSiteSettings();
  const endpoint = settings.formspreeId
    ? `https://formspree.io/f/${settings.formspreeId}`
    : contactEndpoint();
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      projectType: "",
      budget: "",
      message: "",
    },
  });

  const projectType = form.watch("projectType");

  async function onSubmit(values: FormValues) {
    setStatus("loading");
    setPersistError(null);
    const subject = `[${values.projectType}] Message from ${values.name}`;
    const body = `Name: ${values.name}\nEmail: ${values.email}\nProject type: ${values.projectType}\nScope: ${values.budget}\n\n${values.message}`;
    try {
      const persisted = await persistContactMessage({
        name: values.name,
        email: values.email,
        subject,
        message: body,
      });
      if (!persisted.ok) {
        setPersistError(persisted.error);
        setStatus("error");
        return;
      }

      if (endpoint) {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(values),
        });
        if (!res.ok) {
          if (persisted.ok) {
            setDelivery("inbox");
            setStatus("success");
            form.reset();
            return;
          }
          let detail = `Formspree ${res.status}`;
          try {
            const data = (await res.json()) as { error?: string };
            if (data?.error) detail = `${detail}: ${data.error}`;
          } catch {
            /* keep status-only message */
          }
          throw new Error(detail);
        }
        setDelivery("formspree");
        setStatus("success");
        form.reset();
        return;
      }

      window.location.href = `mailto:${settings.email || site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      const key = "tejas-contact-drafts";
      const prev = JSON.parse(localStorage.getItem(key) || "[]") as unknown[];
      localStorage.setItem(
        key,
        JSON.stringify([{ ...values, at: new Date().toISOString() }, ...prev].slice(0, 20)),
      );
      setDelivery(persisted.ok ? "inbox" : "email");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <SectionStage
      id="contact"
      variant="warm"
      className={standalone ? "border-t-0" : undefined}
    >
      <div className="grid gap-12 lg:grid-cols-12">
        <DepthReveal className="lg:col-span-5" rotate={6}>
          <div className="section-heading-hud">
            <SectionHeading
              eyebrow="Contact"
              title={settings.home.contactTitle || "Start a conversation."}
              subtitle={
                settings.home.contactSubtitle ||
                (endpoint
                  ? "This form sends straight to my inbox. Prefer email? The address below always works."
                  : "Submit to save a note in the studio inbox and open a prefilled email — no account required. You can also write me directly.")
              }
            />
          </div>
          {settings.email || site.email ? (
            <a
              href={`mailto:${settings.email || site.email}`}
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm text-foreground shadow-[var(--shadow-border)] underline-offset-4 transition-transform duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-accent-soft hover:no-underline"
            >
              <Mail className="size-3.5 text-accent" />
              {settings.email || site.email}
            </a>
          ) : null}
          <div className="mt-8 space-y-3">
            <p className="mono text-[11px] uppercase tracking-[0.18em] text-subtle">
              What happens next
            </p>
            <ul className="space-y-3">
              {PROCESS_STEPS.map((step, i) => (
                <li key={step.title}>
                  <TiltCard
                    intensity={5}
                    glare={false}
                    className="frame-panel rounded-xl border border-border/80 bg-card/70 shadow-[var(--shadow-border)]"
                  >
                    <div className="relative z-10 flex gap-3 p-3.5">
                      <span className="mono mt-0.5 text-[11px] text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-foreground">{step.title}</p>
                        <p className="mt-0.5 text-sm text-muted-foreground">{step.body}</p>
                      </div>
                    </div>
                  </TiltCard>
                </li>
              ))}
            </ul>
          </div>
        </DepthReveal>
        <DepthReveal delay={0.1} className="lg:col-span-7" rotate={4}>
          {status === "success" ? (
            <div className="glass rounded-xl border border-border bg-card p-8 shadow-[var(--shadow-border)]">
              <CheckCircle2 className="size-8 text-emerald-300" />
              <h3 className="mt-4 font-display text-2xl tracking-tight">
                {delivery === "formspree"
                  ? "Message sent."
                  : delivery === "inbox"
                    ? "Message received."
                    : "Your email client should be open."}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">
                {delivery === "formspree"
                  ? "Thanks â€” I'll get back to you as soon as I can."
                  : delivery === "inbox"
                    ? "Your note is in the studio inbox. You can also email directly if it's urgent."
                    : `If nothing opened, email me directly at ${settings.email || site.email}. Your message is also saved as a local draft on this device.`}
              </p>
              <Button className="mt-6" onClick={() => setStatus("idle")}>
                Send another
              </Button>
            </div>
          ) : (
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="glass space-y-4 rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-border)] sm:p-7"
              noValidate
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  <Sparkles className="size-3.5 text-accent-2" />
                  Project brief
                </p>
                <p className="flex items-center gap-1.5 text-xs text-subtle">
                  <ShieldCheck className="size-3.5 text-emerald-300" />
                  Stored in studio inbox
                </p>
              </div>
              <Field label="Name" error={form.formState.errors.name?.message}>
                <Input autoComplete="name" {...form.register("name")} />
              </Field>
              <Field label="Email" error={form.formState.errors.email?.message}>
                <Input type="email" autoComplete="email" {...form.register("email")} />
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Project Type" error={form.formState.errors.projectType?.message}>
                  <SelectNative {...form.register("projectType")}>
                    <option value="">Selectâ€¦</option>
                    {projectTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </SelectNative>
                </Field>
                <Field label="Budget / Scope" error={form.formState.errors.budget?.message}>
                  <SelectNative {...form.register("budget")}>
                    <option value="">Selectâ€¦</option>
                    {budgetScopes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </SelectNative>
                </Field>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {projectTypes.slice(0, 8).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => form.setValue("projectType", t, { shouldDirty: true })}
                    className={cn(
                      "chip-glow rounded-full border px-3 py-1 text-xs",
                      projectType === t
                        ? "border-accent bg-accent-soft text-accent"
                        : "border-border bg-background text-muted-foreground",
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <Field label="Message" error={form.formState.errors.message?.message}>
                <Textarea rows={6} {...form.register("message")} />
              </Field>
              {status === "error" ? (
                <p className="text-sm text-status" role="alert">
                  {persistError
                    ? persistError
                    : endpoint
                      ? "Delivery failed â€” try again, or email me directly at " +
                        (settings.email || site.email) +
                        "."
                      : "Could not open your mail app. Email me directly at " +
                        (settings.email || site.email) +
                        "."}
                </p>
              ) : null}
              <Button type="submit" size="lg" variant="warm" disabled={status === "loading"}>
                {status === "loading"
                  ? "Sendingâ€¦"
                  : endpoint
                    ? "Send Message"
                    : "Send to inbox"}
                <ArrowRight />
              </Button>
            </form>
          )}
        </DepthReveal>
      </div>
    </SectionStage>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="block space-y-1.5">
      <Label>{label}</Label>
      {children}
      {error ? (
        <p className="text-xs text-status" role="alert">
          {error}
        </p>
      ) : null}
    </label>
  );
}

function SelectNative(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className="flex h-11 w-full rounded-md border border-border bg-card px-3 text-sm text-foreground shadow-[var(--shadow-border)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    />
  );
}
