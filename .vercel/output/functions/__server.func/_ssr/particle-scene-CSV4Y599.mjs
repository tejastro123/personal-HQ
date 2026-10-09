import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as useFrame, r as Canvas } from "../_libs/@react-three/drei+[...].mjs";
import { n as stepParticles } from "./particle-lab-Gr_zhTyR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/particle-scene-CSV4Y599.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MAX_COUNT = 400;
function ParticlePoints({ particlesRef, running, config, onFps }) {
	const pointsRef = (0, import_react.useRef)(null);
	const geoRef = (0, import_react.useRef)(null);
	const positions = (0, import_react.useMemo)(() => new Float32Array(MAX_COUNT * 3), []);
	const fpsRef = (0, import_react.useRef)({
		frames: 0,
		last: 0
	});
	useFrame((state, delta) => {
		const particles = particlesRef.current;
		const geo = geoRef.current;
		if (!geo || !particles.length) return;
		if (running) {
			const acc = Math.min(40, delta * 1e3);
			let steps = Math.floor(acc / 16);
			if (steps < 1) steps = 1;
			for (let s = 0; s < steps; s++) stepParticles(particles, config);
		}
		const n = Math.min(particles.length, MAX_COUNT);
		for (let i = 0; i < n; i++) {
			const p = particles[i];
			positions[i * 3] = p.x * .55;
			positions[i * 3 + 1] = p.y * .55;
			positions[i * 3 + 2] = p.z * .55;
		}
		geo.attributes.position.needsUpdate = true;
		if (pointsRef.current) pointsRef.current.geometry.setDrawRange(0, n);
		const fps = fpsRef.current;
		fps.frames += 1;
		const now = state.clock.elapsedTime;
		if (now - fps.last >= .5) {
			onFps(Math.round(fps.frames / (now - fps.last)));
			fps.frames = 0;
			fps.last = now;
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("points", {
		ref: pointsRef,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("bufferGeometry", {
			ref: geoRef,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("bufferAttribute", {
				attach: "attributes-position",
				args: [positions, 3]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointsMaterial", {
			size: .18,
			color: "#6aa8ff",
			transparent: true,
			opacity: .95,
			depthWrite: false,
			blending: 2,
			sizeAttenuation: true
		})]
	});
}
function CentralMass() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
		.28,
		24,
		24
	] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
		color: "#fbbf24",
		emissive: "#b45309",
		emissiveIntensity: .7
	})] });
}
function ParticleScene({ particlesRef, running, config, onFps }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Canvas, {
		camera: {
			position: [
				0,
				4,
				10
			],
			fov: 50
		},
		dpr: [1, 1.75],
		gl: {
			antialias: true,
			alpha: false
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("color", {
				attach: "background",
				args: ["#08080b"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ambientLight", { intensity: .4 }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
				position: [
					4,
					6,
					4
				],
				intensity: 1.2,
				color: "#4c8dff"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
				position: [
					-4,
					-2,
					-3
				],
				intensity: .4,
				color: "#22d3ee"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CentralMass, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParticlePoints, {
				particlesRef,
				running,
				config,
				onFps
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("gridHelper", {
				args: [
					20,
					20,
					"#1c1c22",
					"#14141a"
				],
				position: [
					0,
					-3,
					0
				]
			})
		]
	});
}
//#endregion
export { ParticleScene as default };
