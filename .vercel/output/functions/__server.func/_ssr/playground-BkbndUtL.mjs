import { i as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/playground-BkbndUtL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PhysicsPlayground = (0, import_react.lazy)(() => import("./physics-playground-Ch86XYVE.mjs"));
function PlaygroundRoute() {
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setReady(true), []);
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-dvh items-center justify-center bg-background text-sm text-muted-foreground",
		children: "Loading playground…"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex h-dvh items-center justify-center bg-background text-sm text-muted-foreground",
			children: "Loading playground…"
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhysicsPlayground, {})
	});
}
//#endregion
export { PlaygroundRoute as component };
