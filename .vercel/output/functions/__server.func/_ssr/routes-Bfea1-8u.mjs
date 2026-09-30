import { i as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { D as ArrowRight } from "../_libs/lucide-react.mjs";
import { s as site } from "./router-C6XbOyFA.mjs";
import { t as Button } from "./theme-toggle-BXztJUq1.mjs";
import { t as SiteShell } from "./site-shell-D60Mg0ll.mjs";
import { n as useReducedMotion, t as useInView } from "../_libs/framer-motion+[...].mjs";
import { t as motion } from "../_libs/motion.mjs";
import { n as SectionHeading, t as Reveal } from "./reveal-VloQCJ-f.mjs";
import { a as metrics, c as timeline, n as aboutStatement, s as skillGroups, t as aboutBody } from "./content-CThzlbdn.mjs";
import { t as Contact } from "./contact-BPKtAMbF.mjs";
import { t as Projects } from "./projects-DBzw2YTg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Bfea1-8u.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function About() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "about",
		className: "scroll-mt-24 border-t border-border py-20 sm:py-28",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
				className: "lg:col-span-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground",
					children: "About"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 font-display text-4xl tracking-tight sm:text-5xl lg:text-6xl",
					children: aboutStatement
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: .08,
				className: "lg:col-span-7 lg:pt-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg",
					children: aboutBody.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: p }, p))
				})
			})]
		})
	});
}
function Cta() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative isolate overflow-hidden border-t border-border",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hero-grid hero-grid-strong pointer-events-none absolute inset-0 opacity-90" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hero-glow pointer-events-none absolute inset-0" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "noise absolute inset-0" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground",
						children: "Next"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-4 max-w-3xl font-display text-4xl tracking-tight sm:text-6xl lg:text-7xl",
						children: "Have an ambitious idea?"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-lg text-muted-foreground",
						children: "Let's turn it into something real."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-col gap-3 sm:flex-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "lg",
							variant: "warm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "#contact",
								children: ["Let's work together", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "lg",
							variant: "outline",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#work",
								children: "View My Work"
							})
						})]
					})
				] })
			})
		]
	});
}
function AnimatedMetric({ value, prefix, infinite, delay = 0 }) {
	const ref = (0, import_react.useRef)(null);
	const inView = useInView(ref, {
		once: true,
		margin: "-40px"
	});
	const reduce = useReducedMotion();
	const [shown, setShown] = (0, import_react.useState)(reduce || infinite ? value : 0);
	(0, import_react.useEffect)(() => {
		if (!inView || infinite || reduce) return;
		const start = performance.now();
		const duration = 900;
		let raf = 0;
		const tick = (now) => {
			const t = Math.min(1, (now - start - delay * 1e3) / duration);
			if (t < 0) {
				raf = requestAnimationFrame(tick);
				return;
			}
			const eased = 1 - Math.pow(1 - t, 3);
			setShown(Math.round(value * eased));
			if (t < 1) raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, [
		inView,
		value,
		delay,
		infinite,
		reduce
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
		ref,
		className: "mono font-display text-3xl tabular-nums tracking-tight sm:text-4xl",
		children: infinite ? "∞" : `${prefix}${String(shown).padStart(prefix === "0" ? 2 : 0, "0")}`
	});
}
var HeroWebGL = (0, import_react.lazy)(() => import("./hero-webgl-HQuIIHnT.mjs"));
var labels = [
	"Qubits",
	"Tensors",
	"Fields",
	"Systems",
	"Signals",
	"Models"
];
function useHeroWebGL(reduce) {
	const [enabled, setEnabled] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (reduce) return;
		const mq = window.matchMedia("(min-width: 900px) and (prefers-reduced-motion: no-preference)");
		const apply = () => setEnabled(mq.matches);
		apply();
		mq.addEventListener("change", apply);
		return () => mq.removeEventListener("change", apply);
	}, [reduce]);
	return enabled;
}
function Hero() {
	const reduce = useReducedMotion();
	const stage = (0, import_react.useRef)(null);
	const canvasRef = (0, import_react.useRef)(null);
	const webgl = useHeroWebGL(!!reduce);
	(0, import_react.useEffect)(() => {
		const el = stage.current;
		if (!el) return;
		const onMove = (e) => {
			const r = el.getBoundingClientRect();
			el.style.setProperty("--mx", `${e.clientX - r.left}px`);
			el.style.setProperty("--my", `${e.clientY - r.top}px`);
		};
		el.addEventListener("pointermove", onMove);
		return () => el.removeEventListener("pointermove", onMove);
	}, []);
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas || reduce) return;
		const parent = canvas.parentElement;
		if (!parent) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		let raf = 0;
		let width = 0;
		let height = 0;
		let stars = [];
		const dpr = Math.min(window.devicePixelRatio || 1, 2);
		const resize = () => {
			width = parent.clientWidth;
			height = parent.clientHeight;
			canvas.width = Math.floor(width * dpr);
			canvas.height = Math.floor(height * dpr);
			canvas.style.width = `${width}px`;
			canvas.style.height = `${height}px`;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			const count = Math.floor(width * height / 18e3);
			stars = Array.from({ length: count }, () => ({
				x: Math.random() * width,
				y: Math.random() * height,
				r: Math.random() * 1.4 + .3,
				a: Math.random() * .5 + .15,
				vx: (Math.random() - .5) * .12,
				vy: (Math.random() - .5) * .12
			}));
		};
		const draw = () => {
			ctx.clearRect(0, 0, width, height);
			for (const s of stars) {
				s.x += s.vx;
				s.y += s.vy;
				if (s.x < 0) s.x = width;
				if (s.x > width) s.x = 0;
				if (s.y < 0) s.y = height;
				if (s.y > height) s.y = 0;
				ctx.beginPath();
				ctx.fillStyle = `rgba(148, 197, 255, ${s.a})`;
				ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
				ctx.fill();
			}
			for (let i = 0; i < stars.length; i++) for (let j = i + 1; j < stars.length; j++) {
				const a = stars[i];
				const b = stars[j];
				const dx = a.x - b.x;
				const dy = a.y - b.y;
				const dist = Math.hypot(dx, dy);
				if (dist > 110) continue;
				ctx.strokeStyle = `rgba(76, 141, 255, ${.12 * (1 - dist / 110)})`;
				ctx.lineWidth = 1;
				ctx.beginPath();
				ctx.moveTo(a.x, a.y);
				ctx.lineTo(b.x, b.y);
				ctx.stroke();
			}
			raf = requestAnimationFrame(draw);
		};
		resize();
		draw();
		const ro = new ResizeObserver(resize);
		ro.observe(parent);
		return () => {
			cancelAnimationFrame(raf);
			ro.disconnect();
		};
	}, [reduce]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "home",
		ref: stage,
		className: "relative isolate overflow-hidden scroll-mt-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hero-grid hero-grid-strong pointer-events-none absolute inset-0" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hero-glow pointer-events-none absolute inset-0" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "noise absolute inset-0" }),
			webgl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
				fallback: null,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroWebGL, {})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
				ref: canvasRef,
				className: "pointer-events-none absolute inset-0 h-full w-full opacity-55"
			}),
			!reduce ? labels.map((label, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mono pointer-events-none absolute hidden text-[11px] tracking-[0.18em] text-subtle uppercase md:block",
				style: {
					top: `${18 + i % 3 * 22}%`,
					left: i % 2 === 0 ? "8%" : "auto",
					right: i % 2 === 1 ? "7%" : "auto",
					animation: `floaty ${8 + i}s ease-in-out ${i * .4}s infinite`
				},
				children: label
			}, label)) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 sm:pt-24 lg:pb-24 lg:pt-28",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
						initial: reduce ? false : {
							opacity: 0,
							y: 10
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: { duration: .45 },
						className: "mono text-[11px] font-medium uppercase tracking-[0.26em] text-muted-foreground",
						children: site.eyebrow
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.h1, {
						initial: reduce ? false : {
							opacity: 0,
							y: 16,
							filter: "blur(6px)"
						},
						animate: {
							opacity: 1,
							y: 0,
							filter: "blur(0px)"
						},
						transition: {
							duration: .6,
							delay: .05,
							ease: [
								.22,
								1,
								.36,
								1
							]
						},
						className: "mt-5 max-w-4xl font-display text-[2.4rem] font-medium leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-[5.1rem]",
						children: "Building ambitious ideas into real systems."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
						initial: reduce ? false : {
							opacity: 0,
							y: 12
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: .5,
							delay: .12
						},
						className: "mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg",
						children: site.bio
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: reduce ? false : {
							opacity: 0,
							y: 10
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: .45,
							delay: .18
						},
						className: "mt-8 flex flex-col gap-3 sm:flex-row sm:items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "lg",
							className: "pl-5 pr-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "#work",
								children: ["Explore My Work", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "lg",
							variant: "outline",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#contact",
								children: "Let's Connect"
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex items-center gap-3 text-sm text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "relative flex size-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-status opacity-40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex size-2.5 rounded-full bg-status" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: site.availability }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden text-subtle sm:inline",
								children: "/"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden sm:inline",
								children: site.availabilityDomains
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
						className: "mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4",
						children: metrics.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-card px-5 py-5 sm:px-6 sm:py-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedMetric, {
								value: m.value,
								prefix: m.prefix,
								infinite: m.infinite,
								delay: i * .08
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "mono mt-1 text-[11px] uppercase tracking-[0.16em] text-muted-foreground",
								children: m.label
							})]
						}, m.label))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
        @keyframes floaty {
          0%, 100% { transform: translateY(0); opacity: 0.35; }
          50% { transform: translateY(-10px); opacity: 0.7; }
        }
      ` }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/links",
				className: "sr-only",
				children: "Link in bio"
			})
		]
	});
}
function Skills() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "skills",
		className: "scroll-mt-24 border-t border-border py-20 sm:py-28",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-4 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				eyebrow: "Capabilities",
				title: "A working stack, not a scoreboard.",
				subtitle: "No fake proficiency bars. These are the languages and ideas in active use."
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3",
				children: skillGroups.map((group, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: i * .04,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "h-full rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-border)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-xl tracking-tight",
							children: group.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 flex flex-wrap gap-2",
							children: group.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "rounded-full border border-border bg-background px-3 py-1 text-sm text-muted-foreground",
								children: item
							}, item))
						})]
					})
				}, group.title))
			})]
		})
	});
}
function Timeline() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-t border-border py-20 sm:py-28",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-4 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				eyebrow: "Timeline",
				title: "Learning in public, year by year."
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "relative mt-14 border-l border-border pl-6 sm:pl-10",
				children: timeline.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: i * .06,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "relative pb-12 last:pb-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -left-[1.54rem] top-1.5 size-3 rounded-full border border-background bg-accent sm:-left-[2.54rem]" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-xs tabular-nums tracking-widest text-accent",
								children: item.year
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-2 font-display text-2xl tracking-tight",
								children: item.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base",
								children: item.description
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3 text-xs text-subtle",
								children: [item.technologies.join(" · "), item.projects?.length ? ` · ${item.projects.join(", ")}` : ""]
							})
						]
					})
				}, item.year))
			})]
		})
	});
}
var WorldMap = (0, import_react.lazy)(() => import("./world-map-ClrM0H9c.mjs"));
function Home() {
	(0, import_react.useEffect)(() => {
		const hash = window.location.hash.replace("#", "");
		if (!hash) return;
		requestAnimationFrame(() => {
			document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
		});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
			type: "application/ld+json",
			dangerouslySetInnerHTML: { __html: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "Person",
				name: site.name,
				description: site.description,
				jobTitle: "Student, researcher, builder",
				url: "/"
			}) }
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Projects, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
			fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "world",
				className: "scroll-mt-24 border-t border-border py-28",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto max-w-6xl px-4 text-sm text-muted-foreground",
					children: "Loading map…"
				})
			}),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorldMap, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(About, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skills, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Timeline, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cta, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Contact, {})
	] });
}
//#endregion
export { Home as component };
