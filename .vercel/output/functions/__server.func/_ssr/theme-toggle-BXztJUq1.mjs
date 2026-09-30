import { i as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as Sun, d as Moon } from "../_libs/lucide-react.mjs";
import { c as useTheme } from "./router-C6XbOyFA.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { c as Slot } from "../_libs/@radix-ui/react-dialog+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/theme-toggle-BXztJUq1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-[color,background-color,box-shadow,transform,border-color] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			default: "bg-foreground text-background shadow-[var(--shadow-border)] hover:opacity-90",
			accent: "bg-accent text-accent-foreground hover:opacity-90",
			warm: "bg-accent-warm text-[#0a0a0a] hover:brightness-105 shadow-[0_0_24px_-8px_var(--accent-warm)]",
			outline: "border border-border bg-transparent text-foreground hover:bg-card hover:border-border-strong",
			ghost: "text-foreground hover:bg-card",
			subtle: "bg-card text-foreground border border-border hover:border-border-strong"
		},
		size: {
			default: "h-11 rounded-md px-4 text-sm",
			sm: "h-9 rounded-sm px-3 text-sm",
			lg: "h-12 rounded-lg px-5 text-[15px]",
			icon: "size-11 rounded-md"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
function ThemeToggle({ className, labeled = false }) {
	const { theme, toggleTheme } = useTheme();
	const isDark = theme === "dark";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		type: "button",
		variant: labeled ? "outline" : "ghost",
		size: labeled ? "sm" : "icon",
		onClick: toggleTheme,
		"aria-label": isDark ? "Switch to light theme" : "Switch to dark theme",
		"data-theme-toggle": "true",
		className: cn(labeled && "gap-2 px-3", className),
		children: [isDark ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, {}), labeled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: isDark ? "Light" : "Dark" }) : null]
	});
}
//#endregion
export { ThemeToggle as n, cn as r, Button as t };
