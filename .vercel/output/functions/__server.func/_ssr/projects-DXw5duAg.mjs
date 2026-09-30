import { _ as Outlet, m as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as SiteShell } from "./site-shell-D60Mg0ll.mjs";
import { t as Projects } from "./projects-DBzw2YTg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/projects-DXw5duAg.js
var import_jsx_runtime = require_jsx_runtime();
function ProjectsArchive() {
	if (useRouterState({ select: (s) => s.matches }).some((m) => m.routeId === "/projects/$id" || m.id?.endsWith("/projects/$id"))) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 pt-12 sm:px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[11px] uppercase tracking-[0.22em] text-muted-foreground",
			children: "Archive"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-3 font-display text-4xl tracking-tight sm:text-5xl",
			children: "All work"
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Projects, { archive: true })] });
}
//#endregion
export { ProjectsArchive as component };
