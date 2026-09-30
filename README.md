# personal-HQ

Personal portfolio platform for **Tejas** — SaaS-style landing page, project showcase, interactive world map, blog, link-in-bio, physics playground, contact, and resume.

Stack: **React 19 · TanStack Start/Router · Vite 8 · Tailwind 4 · Motion · Three.js/Rapier · D3**

## Run

```bash
npm install
npm run dev
```

Open **http://localhost:8080**

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server on **:8080** (HMR) |
| `npm run build` | Production build → `.vercel/output` |
| `npm run preview` | Serve the built output on **:8081** |
| `npm run preview:restart` | Restart preview (sandbox helper; Linux only) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm run format` | Prettier write |

**Windows note:** `npm run preview:restart` / `preview:stop` use `/proc` and are sandbox-only. Locally: stop the process on port 8081, then `npm run preview`.

## Routes

| Path | Page |
| --- | --- |
| `/` | Home (hero, work, features, map, about, skills, timeline, testimonials, pricing, CTA, contact) |
| `/projects` | Project archive |
| `/projects/$id` | Project detail |
| `/blog` | Blog index |
| `/blog/$slug` | Single post |
| `/playground` | 3D physics playground |
| `/links` | Link-in-bio |
| `/contact` | Contact form |
| `/resume` | Printable resume |

## Edit content

All copy and data live in `src/data/`:

| File | Contents |
| --- | --- |
| `site.ts` | Name, bio, email, social URLs, Formspree ID |
| `projects.ts` | Project cards + map metrics + GitHub links |
| `content.ts` | Metrics, features, skills, timeline, testimonials, services |
| `blog.ts` | Blog posts |

Social/email: set a URL in `site.social` (or leave `""` to hide). `getSocialLinks()` gates every UI surface.

## Contact form delivery

- **Default (no config):** submit opens a prefilled email in the visitor's mail app via `mailto:` — works with zero setup. Drafts also save to `localStorage` on this device.
- **Formspree:** create a free form at [formspree.io](https://formspree.io), then set `formspreeId` in `src/data/site.ts` (e.g. `"xyzabcd"`). Submissions POST to `https://formspree.io/f/{id}`.

## Notes

- **Auth/DB:** pre-wired platform chrome, unused by the portfolio path. No accounts, no migrations required.
- **Testimonials:** placeholders clearly labeled until real endorsements exist (`src/data/content.ts`).
- **Stack:** this workspace runs on TanStack Start + Vite (platform contract). Product goals — React, TypeScript, Tailwind, Motion, D3, Three.js — are what matter for the work itself.
- **Deploy target:** Vercel (Nitro). Never create `.env`; platform injects env on deploy.
- **OG share card:** platform PWA middleware injects tags from `src/lib/og/site.json`. Do not put `og:*` in `__root.tsx`.
- **QA scripts:** `scripts/qa-*.mjs` (Playwright). Set `QA_URL` to point at a different port.
