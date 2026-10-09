import { t as cn } from "./utils-C_uf36nf.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./button-CPCoI3-S.mjs";
import { b as Moon, s as Sun } from "../_libs/lucide-react.mjs";
import { i as useTheme } from "./router-BgIwLYpK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/theme-toggle-C5LxTlcm.js
var import_jsx_runtime = require_jsx_runtime();
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
export { ThemeToggle as t };
