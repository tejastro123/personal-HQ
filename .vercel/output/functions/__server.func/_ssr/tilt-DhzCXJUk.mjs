import { o as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as useScroll, n as useReducedMotion, r as useTransform } from "../_libs/framer-motion+[...].mjs";
import { t as motion } from "../_libs/motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tilt-DhzCXJUk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SectionHeading({ eyebrow, title, subtitle, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("max-w-2xl", className),
		children: [
			eyebrow ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "section-rail mono text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground",
				children: eyebrow
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-3 font-display text-3xl tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]",
				children: title
			}),
			subtitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-xl text-base leading-relaxed text-muted-foreground",
				children: subtitle
			}) : null
		]
	});
}
function GradientHeadline({ text }) {
	const words = text.trim().split(/\s+/).filter(Boolean);
	if (words.length <= 2) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "gradient-text",
		children: text
	});
	const cut = Math.max(1, words.length - Math.min(3, Math.ceil(words.length * .28)));
	const head = words.slice(0, cut).join(" ");
	const tail = words.slice(cut).join(" ");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		head,
		" ",
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "gradient-text",
			children: tail
		})
	] });
}
/**
* Scroll-linked 3D depth wrapper for section blocks.
* Rotates slightly on X as it enters the viewport for a "card lifting off the page" feel.
*/
function DepthReveal({ children, className, delay = 0, rotate = 6, y = 28 }) {
	const ref = (0, import_react.useRef)(null);
	const reduce = useReducedMotion();
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "start 0.35"]
	});
	const rotateX = useTransform(scrollYProgress, [0, 1], [rotate, 0]);
	const translateY = useTransform(scrollYProgress, [0, 1], [y, 0]);
	const opacity = useTransform(scrollYProgress, [0, .65], [.15, 1]);
	const scale = useTransform(scrollYProgress, [0, 1], [.97, 1]);
	if (reduce) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className,
		children
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		ref,
		initial: {
			opacity: 0,
			y: y * .4
		},
		whileInView: {
			opacity: 1,
			y: 0
		},
		viewport: {
			once: true,
			amount: .2
		},
		transition: {
			duration: .65,
			delay,
			ease: [
				.22,
				1,
				.36,
				1
			]
		},
		style: {
			rotateX,
			y: translateY,
			opacity,
			scale,
			transformPerspective: 1e3,
			transformStyle: "preserve-3d"
		},
		className: cn("depth-reveal", className),
		children
	});
}
/** Decorative floating 3D orbs for section backgrounds. */
function FloatingOrbs({ variant = "default", className }) {
	if (useReducedMotion()) return null;
	const tones = variant === "warm" ? ["from-accent-warm/25", "from-accent/18"] : variant === "cool" ? ["from-accent-2/22", "from-accent/16"] : ["from-accent/18", "from-accent-2/14"];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("pointer-events-none absolute inset-0 overflow-hidden", className),
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("section-orb section-orb-a absolute -right-10 top-10 size-56 rounded-full bg-gradient-to-br to-transparent blur-3xl sm:size-72", tones[0]) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("section-orb section-orb-b absolute -left-12 bottom-8 size-48 rounded-full bg-gradient-to-tr to-transparent blur-3xl sm:size-64", tones[1]) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("section-orb section-orb-c absolute right-1/4 bottom-16 size-32 rounded-full bg-gradient-to-b to-transparent blur-3xl sm:size-40", variant === "warm" ? "from-accent-warm/14" : variant === "cool" ? "from-accent-2/12" : "from-violet-400/10") })
		]
	});
}
/** Shared cinematic atmosphere for home sections — grid, beams, orbs, vignette. */
function SectionAtmosphere({ variant = "default", beams = true, grid = true, className }) {
	const reduce = useReducedMotion();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("pointer-events-none absolute inset-0 overflow-hidden", className),
		"aria-hidden": true,
		children: [
			grid ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "section-grid absolute inset-0 opacity-70" }) : null,
			beams && !reduce ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "section-beam absolute inset-0" }) : null,
			!reduce ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingOrbs, { variant }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "section-vignette absolute inset-0" })
		]
	});
}
/** Section wrapper with shared cinematic shell + content container. */
function SectionStage({ children, className, containerClassName, id, atmosphere = true, variant = "default", beams = true, grid = true, pad = true }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id,
		className: cn("section-stage relative isolate scroll-mt-24 overflow-hidden border-t border-border", pad && "py-20 sm:py-28", className),
		children: [atmosphere ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionAtmosphere, {
			variant,
			beams,
			grid
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("relative mx-auto max-w-6xl px-4 sm:px-6", containerClassName),
			children
		})]
	});
}
function TiltCard({ children, className, intensity = 8, glare = true, disabled = false }) {
	const ref = (0, import_react.useRef)(null);
	function onMove(e) {
		if (disabled) return;
		const el = ref.current;
		if (!el) return;
		const rect = el.getBoundingClientRect();
		const px = (e.clientX - rect.left) / rect.width;
		const py = (e.clientY - rect.top) / rect.height;
		const rx = (.5 - py) * intensity;
		const ry = (px - .5) * intensity;
		el.classList.add("is-tilting");
		el.style.transform = `perspective(1100px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateZ(6px)`;
		el.style.setProperty("--gx", `${(px * 100).toFixed(1)}%`);
		el.style.setProperty("--gy", `${(py * 100).toFixed(1)}%`);
	}
	function onLeave() {
		const el = ref.current;
		if (!el) return;
		el.classList.remove("is-tilting");
		el.style.transform = "perspective(1100px) rotateX(0deg) rotateY(0deg) translateZ(0)";
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref,
		onMouseMove: onMove,
		onMouseLeave: onLeave,
		className: cn("tilt-card frame-soft", glare && "tilt-card-glare", !disabled && "tilt-card-interactive", className),
		children
	});
}
//#endregion
export { TiltCard as a, SectionStage as i, GradientHeadline as n, SectionHeading as r, DepthReveal as t };
