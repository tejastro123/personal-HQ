import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { c as statusBadgeStyle, r as categoryBadgeStyle } from "./categories-Cczj3smL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/badge-muruo82f.js
var import_jsx_runtime = require_jsx_runtime();
var badgeVariants = cva("inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium tracking-wide uppercase", {
	variants: { variant: {
		default: "border-border bg-card text-muted-foreground",
		accent: "border-transparent bg-accent-soft text-accent",
		solid: "border-transparent bg-foreground text-background"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, category, status, ...props }) {
	const style = status && variant !== "solid" ? statusBadgeStyle(status) : category && variant !== "solid" ? categoryBadgeStyle(category) : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn(badgeVariants({ variant }), className),
		style,
		...props
	});
}
//#endregion
export { Badge as t };
