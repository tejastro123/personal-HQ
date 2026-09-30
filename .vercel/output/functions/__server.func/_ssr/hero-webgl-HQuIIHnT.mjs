import { i as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as useFrame, n as OrbitControls, r as Canvas } from "../_libs/@react-three/drei+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/hero-webgl-HQuIIHnT.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function OrbitingCore() {
	const group = (0, import_react.useRef)(null);
	const satellite = (0, import_react.useRef)(null);
	const ring = (0, import_react.useRef)(null);
	useFrame((state) => {
		const t = state.clock.elapsedTime;
		if (group.current) {
			group.current.rotation.y = t * .18;
			group.current.rotation.x = Math.sin(t * .25) * .12;
		}
		if (satellite.current) {
			const a = t * .7;
			satellite.current.position.set(Math.cos(a) * 2.4, Math.sin(a * .8) * .55, Math.sin(a) * 2.4);
			satellite.current.rotation.y = t * 1.2;
		}
		if (ring.current) {
			ring.current.rotation.z = t * .15;
			ring.current.rotation.x = Math.PI / 2.6 + Math.sin(t * .2) * .08;
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		ref: group,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("icosahedronGeometry", { args: [.85, 1] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#4c8dff",
				emissive: "#1a3a8a",
				emissiveIntensity: .45,
				metalness: .55,
				roughness: .35,
				wireframe: true
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("icosahedronGeometry", { args: [.42, 0] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#22d3ee",
				emissive: "#0e7490",
				emissiveIntensity: .55,
				metalness: .4,
				roughness: .3
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				ref: ring,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
					1.55,
					.025,
					12,
					64
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#fbbf24",
					emissive: "#b45309",
					emissiveIntensity: .4,
					metalness: .6,
					roughness: .3
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				ref: satellite,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.18,
					.12,
					.28
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#e5e7eb",
					metalness: .7,
					roughness: .25
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					0,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					2.1,
					24,
					24
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
					color: "#4c8dff",
					transparent: true,
					opacity: .04,
					side: 1
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
				position: [
					2,
					2,
					2
				],
				intensity: 1.4,
				color: "#4c8dff"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
				position: [
					-2,
					-1,
					-2
				],
				intensity: .6,
				color: "#22d3ee"
			})
		]
	});
}
function Scene() {
	const stars = (0, import_react.useMemo)(() => {
		const count = 80;
		return Array.from({ length: count }, (_, i) => {
			const a = i / count * Math.PI * 2;
			const r = 3.2 + i % 5 * .35;
			return {
				pos: [
					Math.cos(a) * r,
					Math.sin(a * 1.7) * 1.4,
					Math.sin(a) * r
				],
				size: .02 + i % 3 * .01
			};
		});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ambientLight", { intensity: .35 }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrbitingCore, {}),
		stars.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: s.pos,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
				s.size,
				6,
				6
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
				color: i % 4 === 0 ? "#fbbf24" : "#94c5ff",
				transparent: true,
				opacity: .7
			})]
		}, i)),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrbitControls, {
			enableZoom: false,
			enablePan: false,
			autoRotate: true,
			autoRotateSpeed: .4,
			minPolarAngle: Math.PI / 3,
			maxPolarAngle: Math.PI / 1.7
		})
	] });
}
function HeroWebGL() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "hero-webgl",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Canvas, {
			dpr: [1, 1.5],
			camera: {
				position: [
					0,
					.6,
					4.2
				],
				fov: 42
			},
			gl: {
				antialias: true,
				alpha: true,
				powerPreference: "high-performance"
			},
			style: { background: "transparent" },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
				fallback: null,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scene, {})
			})
		})
	});
}
//#endregion
export { HeroWebGL as default };
