import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/chaos-Bg2hqS6v.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ChaosLabPage = (0, import_react.lazy)(() => import("./chaos-lab-CrVs_gTB.mjs"));
function ChaosRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex h-dvh items-center justify-center bg-background text-sm text-muted-foreground",
			children: "Loading Chaos Lab…"
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChaosLabPage, {})
	});
}
//#endregion
export { ChaosRoute as component };
