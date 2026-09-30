import { zodResolver } from "@hookform/resolvers/zod";
import { useState, type ReactNode, type SelectHTMLAttributes } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Reveal, SectionHeading } from "@/components/reveal";
import { budgetScopes, projectTypes } from "@/data/content";
import { contactEndpoint, site } from "@/data/site";
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
type Delivery = "formspree" | "email";

export function Contact({ standalone = false }: { standalone?: boolean }) {
  const [status, setStatus] = useState<Status>("idle");
  const [delivery, setDelivery] = useState<Delivery>("email");
  const endpoint = contactEndpoint();
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

  async function onSubmit(values: FormValues) {
    setStatus("loading");
    try {
      if (endpoint) {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(values),
        });
        if (!res.ok) throw new Error(`Formspree ${res.status}`);
        setDelivery("formspree");
        setStatus("success");
        form.reset();
        return;
      }

      const subject = encodeURIComponent(
        `[${values.projectType}] Message from ${values.name}`,
      );
      const body = encodeURIComponent(
        `Name: ${values.name}\nEmail: ${values.email}\nProject type: ${values.projectType}\nScope: ${values.budget}\n\n${values.message}`,
      );
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;

      const key = "tejas-contact-drafts";
      const prev = JSON.parse(localStorage.getItem(key) || "[]") as unknown[];
      localStorage.setItem(
        key,
        JSON.stringify([{ ...values, at: new Date().toISOString() }, ...prev].slice(0, 20)),
      );
      setDelivery("email");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      className={cn(
        "scroll-mt-24 border-t border-border py-20 sm:py-28",
        standalone && "border-t-0",
      )}
    >
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <SectionHeading
            eyebrow="Contact"
            title="Start a conversation."
            subtitle={
              endpoint
                ? "This form sends straight to my inbox. Prefer email? The address below always works."
                : "Submit to open a prefilled email in your mail app — no account, no server required. You can also write me directly."
            }
          />
          {site.email ? (
            <a
              href={`mailto:${site.email}`}
              className="mt-4 inline-flex items-center gap-2 text-sm text-foreground underline-offset-4 hover:underline"
            >
              {site.email}
            </a>
          ) : null}
        </Reveal>
        <Reveal delay={0.08} className="lg:col-span-7">
          {status === "success" ? (
            <div className="rounded-xl border border-border bg-card p-8 shadow-[var(--shadow-border)]">
              <h3 className="font-display text-2xl tracking-tight">
                {delivery === "formspree" ? "Message sent." : "Your email client should be open."}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">
                {delivery === "formspree"
                  ? "Thanks — I'll get back to you as soon as I can."
                  : `If nothing opened, email me directly at ${site.email}. Your message is also saved as a local draft on this device.`}
              </p>
              <Button className="mt-6" onClick={() => setStatus("idle")}>
                Send another
              </Button>
            </div>
          ) : (
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-border)] sm:p-7"
              noValidate
            >
              <Field label="Name" error={form.formState.errors.name?.message}>
                <Input autoComplete="name" {...form.register("name")} />
              </Field>
              <Field label="Email" error={form.formState.errors.email?.message}>
                <Input type="email" autoComplete="email" {...form.register("email")} />
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Project Type" error={form.formState.errors.projectType?.message}>
                  <SelectNative {...form.register("projectType")}>
                    <option value="">Select…</option>
                    {projectTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </SelectNative>
                </Field>
                <Field label="Budget / Scope" error={form.formState.errors.budget?.message}>
                  <SelectNative {...form.register("budget")}>
                    <option value="">Select…</option>
                    {budgetScopes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </SelectNative>
                </Field>
              </div>
              <Field label="Message" error={form.formState.errors.message?.message}>
                <Textarea rows={6} {...form.register("message")} />
              </Field>
              {status === "error" ? (
                <p className="text-sm text-status" role="alert">
                  Something went wrong. Try again, or email me directly.
                </p>
              ) : null}
              <Button type="submit" size="lg" variant="warm" disabled={status === "loading"}>
                {status === "loading"
                  ? "Sending…"
                  : endpoint
                    ? "Send Message →"
                    : "Open Email →"}
              </Button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
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
