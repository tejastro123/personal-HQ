export const site = {
  name: "Tejas",
  title: "Tejas — Physics × AI × Software",
  description:
    "Personal portfolio of Tejas — space & rocketry enthusiast, software developer, and BITS Pilani Hyderabad student exploring quantum computing, AI, data science, and building real systems.",
  tagline: "Building ambitious ideas into real systems.",
  eyebrow: "Physics × AI × Software × Data",
  availability: "Currently building",
  availabilityDomains: "Quantum Computing · AI · Software · Data · Education",
  bio: "I'm Tejas — a student, researcher, and builder at the intersection of physics, artificial intelligence, software, data, and space technology. Currently at BITS Pilani Hyderabad.",
  shortBio: "Physics × AI × Software × Space",
  footer:
    "Building at the intersection of physics, AI, software, data, and space.",
  email: "tejas.mellimpudi@gmail.com",
  resumePath: "/resume",
  /** Optional Formspree form ID (e.g. "xyzabcd"). Empty → mailto fallback. */
  formspreeId: "",
  social: {
    github: "https://github.com/tejastro123",
    linkedin: "https://linkedin.com/in/mellimpudi-tejas-b05a57319/",
    instagram: "https://www.instagram.com/tejas_astro_x/",
    youtube: "https://www.youtube.com/@AnimatedPhysics386",
    x: "",
  },
} as const;

export function contactEndpoint(): string | null {
  const id = String(site.formspreeId ?? "").trim();
  return id ? `https://formspree.io/f/${id}` : null;
}

/** Non-empty social URLs only — empty strings stay hidden until real links are filled in. */
export function getSocialLinks() {
  const links: {
    id: "github" | "linkedin" | "instagram" | "x" | "youtube";
    label: string;
    href: string;
  }[] = [];
  if (site.social.github)
    links.push({ id: "github", label: "GitHub", href: site.social.github });
  if (site.social.linkedin)
    links.push({ id: "linkedin", label: "LinkedIn", href: site.social.linkedin });
  if (site.social.instagram)
    links.push({ id: "instagram", label: "Instagram", href: site.social.instagram });
  if (site.social.x) links.push({ id: "x", label: "X / Twitter", href: site.social.x });
  if (site.social.youtube)
    links.push({ id: "youtube", label: "YouTube", href: site.social.youtube });
  return links;
}

export const navItems = [
  { label: "Home", hash: "home", to: "/" as const },
  { label: "Work", hash: "work", to: "/" as const },
  { label: "Instruments", hash: undefined, to: "/instruments" as const },
  { label: "Systems", hash: undefined, to: "/systems" as const },
  { label: "Blog", hash: undefined, to: "/blog" as const },
  { label: "Playground", hash: undefined, to: "/playground" as const },
  { label: "Contact", hash: "contact", to: "/" as const },
] as const;
