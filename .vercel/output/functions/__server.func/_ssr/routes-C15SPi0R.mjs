import { o as __toESM } from "../_runtime.mjs";
import { m as site } from "./content-cache-DMv4KU76.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./button-CPCoI3-S.mjs";
import { x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { Q as ArrowRight, V as Cpu, c as Sparkles, q as Boxes, t as Zap } from "../_libs/lucide-react.mjs";
import { a as metrics, c as timeline, s as skillGroups, t as aboutBody } from "./content-CThzlbdn.mjs";
import { r as useContentVersionPoll, s as usePublicSiteSettings } from "./use-public-content-By6XsNcY.mjs";
import { t as SiteShell } from "./site-shell-CN1Pbmlh.mjs";
import { n as useReducedMotion, t as useInView } from "../_libs/framer-motion+[...].mjs";
import { t as motion } from "../_libs/motion.mjs";
import { a as TiltCard, i as SectionStage, n as GradientHeadline, r as SectionHeading, t as DepthReveal } from "./tilt-DhzCXJUk.mjs";
import { t as Contact } from "./contact-B74lmi-D.mjs";
import { t as Projects } from "./projects-B4juL9t7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-C15SPi0R.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function About() {
	const settings = usePublicSiteSettings();
	const statement = settings.home.aboutStatement || "Curious about everything. Serious about building.";
	const paragraphs = settings.home.aboutBody ? settings.home.aboutBody.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean) : aboutBody;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionStage, {
		id: "about",
		variant: "cool",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-10 lg:grid-cols-12 lg:gap-14",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DepthReveal, {
				className: "lg:col-span-5",
				rotate: 8,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "section-heading-hud",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mono section-rail text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground",
						children: "About"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-4 font-display text-4xl tracking-tight sm:text-5xl lg:text-6xl",
						children: statement
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DepthReveal, {
				delay: .1,
				className: "lg:col-span-7 lg:pt-4",
				rotate: 5,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TiltCard, {
					intensity: 4,
					glare: false,
					className: "frame-panel glass-soft rounded-2xl border border-border/80 p-6 sm:p-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative z-10 space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg",
						children: paragraphs.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: p }, p))
					})
				})
			})]
		})
	});
}
function Cta() {
	const home = usePublicSiteSettings().home;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionStage, {
		id: "cta",
		variant: "warm",
		pad: false,
		className: "py-24 sm:py-32",
		containerClassName: "relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DepthReveal, {
			rotate: 8,
			y: 36,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TiltCard, {
				intensity: 5,
				className: "glass frame-panel max-w-3xl rounded-2xl border border-border/80 shadow-[var(--shadow-lift)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-10 p-6 sm:p-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mono section-rail text-[11px] uppercase tracking-[0.22em] text-muted-foreground",
							children: home.ctaEyebrow || "Next"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "mt-4 font-display text-4xl tracking-tight sm:text-6xl lg:text-7xl",
							children: [home.ctaTitle || "Have an ambitious idea?", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "gradient-text-warm",
								children: "."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-lg text-muted-foreground",
							children: home.ctaBody || "Let's turn it into something real."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-col gap-3 sm:flex-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "lg",
								variant: "warm",
								className: "btn-sheen",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: home.ctaPrimaryHref || "#contact",
									children: [home.ctaPrimaryLabel || "Let's work together", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "lg",
								variant: "outline",
								className: "btn-sheen",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: home.ctaSecondaryHref || "#work",
									children: home.ctaSecondaryLabel || "View My Work"
								})
							})]
						})
					]
				})
			})
		})]
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
var HeroScene = (0, import_react.lazy)(() => import("./hero-scene-TygWGy11.mjs"));
var orbitChips = [
	{
		icon: Cpu,
		label: "Systems"
	},
	{
		icon: Boxes,
		label: "Engineering"
	},
	{
		icon: Zap,
		label: "Research"
	}
];
function Hero() {
	const reduce = useReducedMotion();
	const settings = usePublicSiteSettings();
	const home = settings.home;
	const stage = (0, import_react.useRef)(null);
	const webglRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const el = stage.current;
		const webgl = webglRef.current;
		if (!el) return;
		const onMove = (e) => {
			const r = el.getBoundingClientRect();
			const px = (e.clientX - r.left) / r.width - .5;
			const py = (e.clientY - r.top) / r.height - .5;
			el.style.setProperty("--tilt-x", `${(-py * 2.4).toFixed(2)}deg`);
			el.style.setProperty("--tilt-y", `${(px * 3.2).toFixed(2)}deg`);
			if (webgl && !reduce) webgl.style.transform = `translate3d(${(px * 22).toFixed(1)}px, ${(py * 16).toFixed(1)}px, 0)`;
		};
		const onLeave = () => {
			el.style.setProperty("--tilt-x", "0deg");
			el.style.setProperty("--tilt-y", "0deg");
			if (webgl && !reduce) webgl.style.transform = "translate3d(0,0,0)";
		};
		el.addEventListener("pointermove", onMove);
		el.addEventListener("pointerleave", onLeave);
		return () => {
			el.removeEventListener("pointermove", onMove);
			el.removeEventListener("pointerleave", onLeave);
		};
	}, [reduce]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "home",
		ref: stage,
		className: "relative isolate overflow-hidden scroll-mt-24 border-b border-border",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: webglRef,
				className: "hero-webgl-layer pointer-events-none absolute inset-0",
				children: !reduce ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
					fallback: null,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroScene, {})
				}) : null
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hero-grid pointer-events-none absolute inset-0 opacity-55" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hero-soft-glow pointer-events-none absolute inset-0" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "hero-beam pointer-events-none absolute inset-0",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "hero-orb hero-orb-a pointer-events-none absolute",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "hero-orb hero-orb-b pointer-events-none absolute",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "hero-orb hero-orb-c pointer-events-none absolute",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "noise absolute inset-0" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hero-vignette pointer-events-none absolute inset-0" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hero-stage relative mx-auto max-w-6xl px-4 pb-14 pt-16 sm:px-6 sm:pt-24 lg:pb-20 lg:pt-28",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: cn("hero-copy-3d transition-transform duration-300 ease-out"),
							style: reduce ? void 0 : { transform: "perspective(1200px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg)) translateZ(36px)" },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									initial: reduce ? false : {
										opacity: 0,
										y: 10
									},
									animate: {
										opacity: 1,
										y: 0
									},
									transition: { duration: .45 },
									className: "inline-flex",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "section-rail mono inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/50 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground backdrop-blur",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-accent shadow-[0_0_10px_var(--accent)]" }), home.heroEyebrow || site.eyebrow]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.h1, {
									initial: reduce ? false : {
										opacity: 0,
										y: 20,
										filter: "blur(10px)"
									},
									animate: {
										opacity: 1,
										y: 0,
										filter: "blur(0px)"
									},
									transition: {
										duration: .75,
										delay: .06,
										ease: [
											.22,
											1,
											.36,
											1
										]
									},
									className: "mt-6 max-w-3xl font-display text-[2.55rem] font-medium leading-[1.04] tracking-tight text-foreground sm:text-6xl lg:text-[4.9rem]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GradientHeadline, { text: home.heroHeadline || "Building ambitious ideas into real systems." })
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
										duration: .55,
										delay: .14
									},
									className: "mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg",
									children: settings.bio || site.bio
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
										delay: .2
									},
									className: "mt-8 flex flex-col gap-3 sm:flex-row sm:items-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										asChild: true,
										size: "lg",
										className: "btn-sheen pl-5 pr-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: home.heroCtaPrimaryHref || "#work",
											children: [home.heroCtaPrimaryLabel || "Explore My Work", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										asChild: true,
										size: "lg",
										variant: "outline",
										className: "btn-sheen",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: home.heroCtaSecondaryHref || "#contact",
											children: home.heroCtaSecondaryLabel || "Let's Connect"
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
									initial: reduce ? false : {
										opacity: 0,
										y: 8
									},
									animate: {
										opacity: 1,
										y: 0
									},
									transition: {
										duration: .4,
										delay: .26
									},
									className: "glass mt-7 inline-flex max-w-full flex-wrap items-center gap-3 rounded-full border border-border/80 px-4 py-2 text-sm text-muted-foreground shadow-[var(--shadow-border)] transition-transform duration-300 ease-out hover:-translate-y-0.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "relative flex size-2.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-status opacity-40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex size-2.5 rounded-full bg-status" })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-foreground",
											children: home.availability || site.availability
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "hidden text-subtle sm:inline",
											children: "/"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "hidden sm:inline",
											children: home.availabilityDomains || site.availabilityDomains
										})
									]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.aside, {
							initial: reduce ? false : {
								opacity: 0,
								x: 36,
								rotateY: 12
							},
							animate: {
								opacity: 1,
								x: 0,
								rotateY: 0
							},
							transition: {
								duration: .85,
								delay: .22,
								ease: [
									.22,
									1,
									.36,
									1
								]
							},
							className: "hero-hud relative mx-auto w-full max-w-md lg:mx-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TiltCard, {
								intensity: 7,
								className: "hero-hud-card frame-panel",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative overflow-hidden rounded-[1.35rem] border border-border/70 bg-card/55 p-6 shadow-[var(--shadow-border)] backdrop-blur-xl sm:p-7",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hero-hud-glow pointer-events-none absolute inset-0" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -right-16 -top-16 size-44 rounded-full bg-accent/20 blur-3xl" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -bottom-20 left-0 size-40 rounded-full bg-accent-2/15 blur-3xl" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative flex items-start justify-between gap-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mono text-[10px] uppercase tracking-[0.22em] text-accent",
													children: "Studio console"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
													className: "mt-2 font-display text-xl tracking-tight text-foreground",
													children: "Live build surface"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-1.5 text-sm leading-relaxed text-muted-foreground",
													children: "Research, systems, and interfaces — one orbit around the craft."
												})
											] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "hero-orbit-glyph relative size-14 shrink-0",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "hero-orbit-ring absolute inset-0 rounded-full border border-accent/40" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "hero-orbit-ring hero-orbit-ring-b absolute inset-1.5 rounded-full border border-accent-2/35" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 m-auto size-3 rounded-full bg-accent shadow-[0_0_16px_var(--accent)]" })
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "relative mt-6 grid grid-cols-3 gap-2",
											children: orbitChips.map((chip) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex flex-col items-center gap-2 rounded-xl border border-border/70 bg-background/40 px-2 py-3 text-center",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(chip.icon, { className: "size-4 text-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground",
													children: chip.label
												})]
											}, chip.label))
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
											className: "relative mt-5 space-y-3",
											children: metrics.slice(0, 3).map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
													className: "w-28 shrink-0 text-xs uppercase tracking-[0.12em] text-muted-foreground",
													children: m.label
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
													className: "relative h-1.5 flex-1 overflow-hidden rounded-full bg-border/80",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
														initial: reduce ? false : { width: 0 },
														animate: { width: m.infinite ? "100%" : `${Math.min(100, m.value * 2.2)}%` },
														transition: {
															duration: 1.1,
															delay: .45,
															ease: [
																.22,
																1,
																.36,
																1
															]
														},
														className: "absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-accent via-accent-2 to-accent-warm"
													})
												})]
											}, m.label))
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative mt-6 flex items-center justify-between gap-3 border-t border-border/70 pt-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "inline-flex items-center gap-2 text-xs text-subtle",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5 text-accent-2" }), "Three.js depth field"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground",
												children: "pointer-tracked"
											})]
										})
									]
								})
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.dl, {
						initial: reduce ? false : {
							opacity: 0,
							y: 22
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: .6,
							delay: .4,
							ease: [
								.22,
								1,
								.36,
								1
							]
						},
						className: "metrics-3d mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4",
						children: metrics.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TiltCard, {
							intensity: 5,
							className: "stat-tile frame-soft bg-card",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative z-10 px-5 py-5 sm:px-6 sm:py-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedMetric, {
									value: m.value,
									prefix: m.prefix,
									infinite: m.infinite,
									delay: i * .08
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "mono mt-1 text-[11px] uppercase tracking-[0.16em] text-muted-foreground",
									children: m.label
								})]
							})
						}, m.label))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: reduce ? false : { opacity: 0 },
						animate: { opacity: 1 },
						transition: {
							delay: .65,
							duration: .5
						},
						className: "mt-8 flex flex-wrap items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "#work",
							className: "group inline-flex items-center gap-2 text-xs text-subtle transition-colors hover:text-accent",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mono uppercase tracking-[0.18em]",
								children: "Scroll to explore"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-6 items-center justify-center rounded-full border border-border transition-transform duration-300 group-hover:translate-y-0.5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3 -rotate-90" })
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "hidden items-center gap-2 text-xs text-subtle lg:inline-flex",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5 text-accent-2" }), "Nebula field · orbiting core · energy rings"]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/links",
				className: "sr-only",
				children: "Link in bio"
			})
		]
	});
}
function Skills() {
	const home = usePublicSiteSettings().home;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionStage, {
		id: "skills",
		variant: "cool",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DepthReveal, {
				rotate: 5,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "section-heading-hud",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
						eyebrow: "Capabilities",
						title: home.skillsTitle || "A working stack, not a scoreboard.",
						subtitle: home.skillsSubtitle || "No fake proficiency bars. These are the languages and ideas in active use."
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3",
				children: skillGroups.map((group, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DepthReveal, {
					delay: i * .05,
					rotate: 6,
					className: "h-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TiltCard, {
						intensity: 7,
						className: "h-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "skill-card frame-panel h-full rounded-xl border border-border/80 bg-card p-6 shadow-[var(--shadow-border)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative z-10 flex items-start justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-xl tracking-tight",
									children: group.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mono rounded-full border border-border bg-background px-2 py-0.5 text-[10px] tabular-nums text-subtle",
									children: String(group.items.length).padStart(2, "0")
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "relative z-10 mt-4 flex flex-wrap gap-2",
								children: group.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
									className: "chip-glow rounded-full border border-border bg-background px-3 py-1 text-sm text-muted-foreground transition-transform duration-300 ease-out hover:-translate-y-0.5",
									children: item
								}, item))
							})]
						})
					})
				}, group.title))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DepthReveal, {
				delay: .1,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 overflow-hidden rounded-xl border border-border bg-card/60 py-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "marquee-track mono text-[11px] uppercase tracking-[0.18em] text-subtle",
						children: [...skillGroups.flatMap((g) => g.items), ...skillGroups.flatMap((g) => g.items)].map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "whitespace-nowrap",
							children: [item, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-10 text-accent/50",
								children: "◆"
							})]
						}, `${item}-${idx}`))
					})
				})
			})
		]
	});
}
function Timeline() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionStage, {
		id: "timeline",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DepthReveal, {
			rotate: 6,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "section-heading-hud",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					eyebrow: "Timeline",
					title: "Learning in public, year by year."
				})
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
			children: timeline.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DepthReveal, {
				delay: i * .06,
				rotate: 7 - i,
				className: "h-full",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "h-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TiltCard, {
						intensity: 7,
						className: "frame-panel glass-soft h-full rounded-xl border border-border/80 bg-card/70",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative z-10 flex h-full flex-col p-5 sm:p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute left-0 top-0 h-full w-[2px] rounded-l-xl bg-gradient-to-b from-accent via-accent-2 to-transparent opacity-70" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mono font-mono text-xs tabular-nums tracking-widest text-accent",
									children: item.year
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-3 font-display text-xl tracking-tight sm:text-2xl",
									children: item.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-sm leading-relaxed text-muted-foreground",
									children: item.description
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mono mt-auto pt-4 text-[11px] text-subtle",
									children: [item.technologies.join(" · "), item.projects?.length ? ` · ${item.projects.join(", ")}` : ""]
								})
							]
						})
					})
				})
			}, item.year))
		})]
	});
}
var WorldMap = (0, import_react.lazy)(() => import("./world-map-BvaqwRq5.mjs"));
function Home() {
	useContentVersionPoll(true);
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
