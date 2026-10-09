import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { _ as Outlet, m as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/instruments-DmVwiXjt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var InstrumentsPage = (0, import_react.lazy)(() => import("./instruments-page-C1pQA5Al.mjs"));
var CHILD_ROUTE_IDS = [
	"/instruments/qucpl",
	"/instruments/orbit",
	"/instruments/particles",
	"/instruments/chaos"
];
function InstrumentsRoute() {
	if (useRouterState({ select: (s) => s.matches }).some((m) => CHILD_ROUTE_IDS.includes(m.routeId) || CHILD_ROUTE_IDS.includes(m.id))) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex h-dvh items-center justify-center bg-background text-sm text-muted-foreground",
			children: "Loading instruments…"
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstrumentsPage, {})
	});
}
//#endregion
export { InstrumentsRoute as component };
