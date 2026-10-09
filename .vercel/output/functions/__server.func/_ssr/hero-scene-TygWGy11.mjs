import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as useThree, i as useFrame, l as CanvasTexture, p as MathUtils, r as Canvas, u as Color, x as Vector3, y as SRGBColorSpace } from "../_libs/@react-three/drei+[...].mjs";
import { n as useReducedMotion } from "../_libs/framer-motion+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/hero-scene-TygWGy11.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ACCENT = "#4c8dff";
var ACCENT2 = "#22d3ee";
var WARM = "#fbbf24";
var VIOLET = "#a78bfa";
function makeGlowTexture(inner, outer) {
	const size = 256;
	const c = document.createElement("canvas");
	c.width = size;
	c.height = size;
	const ctx = c.getContext("2d");
	const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
	g.addColorStop(0, inner);
	g.addColorStop(.35, outer);
	g.addColorStop(1, "rgba(0,0,0,0)");
	ctx.fillStyle = g;
	ctx.fillRect(0, 0, size, size);
	const tex = new CanvasTexture(c);
	tex.colorSpace = SRGBColorSpace;
	return tex;
}
function PointerRig({ children }) {
	const group = (0, import_react.useRef)(null);
	const { size } = useThree();
	const reduce = useReducedMotion();
	const mobile = size.width < 900;
	useFrame((state) => {
		if (!group.current || reduce) return;
		const t = state.clock.elapsedTime;
		const px = state.pointer.x;
		const py = state.pointer.y;
		const mobileScale = mobile ? .72 : 1;
		group.current.rotation.y = MathUtils.lerp(group.current.rotation.y, px * .42, .045);
		group.current.rotation.x = MathUtils.lerp(group.current.rotation.x, -py * .28, .045);
		group.current.position.y = Math.sin(t * .35) * .1;
		group.current.position.x = MathUtils.lerp(group.current.position.x, (mobile ? 0 : .9) + px * .12, .03);
		group.current.scale.setScalar(mobileScale);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
		ref: group,
		children
	});
}
function CameraRig() {
	const { camera } = useThree();
	const reduce = useReducedMotion();
	const base = (0, import_react.useMemo)(() => new Vector3(0, .18, 6.4), []);
	useFrame((state) => {
		if (reduce) return;
		const t = state.clock.elapsedTime;
		const px = state.pointer.x;
		const py = state.pointer.y;
		const breathe = Math.sin(t * .22) * .12;
		camera.position.x = MathUtils.lerp(camera.position.x, base.x + px * .35, .03);
		camera.position.y = MathUtils.lerp(camera.position.y, base.y - py * .2 + breathe * .15, .03);
		camera.position.z = MathUtils.lerp(camera.position.z, base.z + Math.sin(t * .18) * .25, .03);
		camera.lookAt(.35, 0, 0);
	});
	return null;
}
function GlowSprite({ color, size = 2.2, opacity = .55, position = [
	0,
	0,
	0
] }) {
	const map = (0, import_react.useMemo)(() => makeGlowTexture(color, `${color}66`), [color]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sprite", {
		position,
		scale: [
			size,
			size,
			1
		],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("spriteMaterial", {
			map,
			transparent: true,
			opacity,
			depthWrite: false,
			blending: 2
		})
	});
}
function NebulaDust({ count = 900, radius = 4.2, colorA = ACCENT, colorB = VIOLET, yFlat = .9 }) {
	const ref = (0, import_react.useRef)(null);
	const reduce = useReducedMotion();
	const { positions, colors } = (0, import_react.useMemo)(() => {
		const positions = new Float32Array(count * 3);
		const colors = new Float32Array(count * 3);
		const c1 = new Color(colorA);
		const c2 = new Color(colorB);
		const c3 = new Color(ACCENT2);
		for (let i = 0; i < count; i++) {
			const r = Math.pow(Math.random(), .5) * radius;
			const a = Math.random() * Math.PI * 2;
			positions[i * 3] = Math.cos(a) * r;
			positions[i * 3 + 1] = (Math.random() - .5) * yFlat * Math.exp(-r * .12);
			positions[i * 3 + 2] = Math.sin(a) * r * .75;
			const mix = Math.random();
			const col = mix < .45 ? c1 : mix < .8 ? c2 : c3;
			colors[i * 3] = col.r;
			colors[i * 3 + 1] = col.g;
			colors[i * 3 + 2] = col.b;
		}
		return {
			positions,
			colors
		};
	}, [
		count,
		radius,
		colorA,
		colorB,
		yFlat
	]);
	useFrame((state) => {
		if (!ref.current || reduce) return;
		ref.current.rotation.y = state.clock.elapsedTime * .03;
		ref.current.rotation.x = Math.sin(state.clock.elapsedTime * .06) * .08;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("points", {
		ref,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("bufferGeometry", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("bufferAttribute", {
			attach: "attributes-position",
			args: [positions, 3]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("bufferAttribute", {
			attach: "attributes-color",
			args: [colors, 3]
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointsMaterial", {
			size: .022,
			vertexColors: true,
			transparent: true,
			opacity: .75,
			depthWrite: false,
			blending: 2,
			sizeAttenuation: true
		})]
	});
}
function GalaxySpiral({ count = 1400 }) {
	const ref = (0, import_react.useRef)(null);
	const reduce = useReducedMotion();
	const { positions, colors } = (0, import_react.useMemo)(() => {
		const positions = new Float32Array(count * 3);
		const colors = new Float32Array(count * 3);
		const c1 = new Color(ACCENT);
		const c2 = new Color(ACCENT2);
		const c3 = new Color(WARM);
		for (let i = 0; i < count; i++) {
			const arm = i % 3;
			const r = Math.pow(Math.random(), .55) * 3.8;
			const angle = r * 1.45 + arm * Math.PI * 2 / 3 + (Math.random() - .5) * .42;
			const spread = (Math.random() - .5) * .52 * (1 - r / 4.4);
			positions[i * 3] = Math.cos(angle) * r + spread - .6;
			positions[i * 3 + 1] = (Math.random() - .5) * .65 * Math.exp(-r * .2);
			positions[i * 3 + 2] = Math.sin(angle) * r * .7 + spread * .5;
			const mix = Math.random();
			const col = mix < .5 ? c1 : mix < .85 ? c2 : c3;
			colors[i * 3] = col.r;
			colors[i * 3 + 1] = col.g;
			colors[i * 3 + 2] = col.b;
		}
		return {
			positions,
			colors
		};
	}, [count]);
	useFrame((state) => {
		if (!ref.current || reduce) return;
		ref.current.rotation.y = state.clock.elapsedTime * .048;
		ref.current.rotation.z = Math.sin(state.clock.elapsedTime * .07) * .09;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("points", {
		ref,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("bufferGeometry", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("bufferAttribute", {
			attach: "attributes-position",
			args: [positions, 3]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("bufferAttribute", {
			attach: "attributes-color",
			args: [colors, 3]
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointsMaterial", {
			size: .03,
			vertexColors: true,
			transparent: true,
			opacity: .9,
			depthWrite: false,
			blending: 2,
			sizeAttenuation: true
		})]
	});
}
function EnergyPulseRings() {
	const group = (0, import_react.useRef)(null);
	const reduce = useReducedMotion();
	const rings = (0, import_react.useMemo)(() => Array.from({ length: 4 }, (_, i) => ({
		offset: i / 4,
		color: i % 2 === 0 ? ACCENT : ACCENT2
	})), []);
	useFrame((state) => {
		if (!group.current || reduce) return;
		const t = state.clock.elapsedTime;
		group.current.children.forEach((child, i) => {
			const phase = (t * .28 + rings[i].offset) % 1;
			const s = .6 + phase * 1.8;
			child.scale.setScalar(s);
			const mat = child.material;
			mat.opacity = Math.max(0, .35 * (1 - phase));
			child.rotation.z = t * .15 + i;
		});
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
		ref: group,
		position: [
			1.25,
			.12,
			-.3
		],
		children: rings.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			rotation: [
				Math.PI / 2.6,
				0,
				i * .4
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
				1,
				.008,
				8,
				80
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
				color: r.color,
				transparent: true,
				opacity: .3,
				depthWrite: false,
				blending: 2
			})]
		}, i))
	});
}
function OrbitingCore() {
	const core = (0, import_react.useRef)(null);
	const inner = (0, import_react.useRef)(null);
	const shell = (0, import_react.useRef)(null);
	const lattice = (0, import_react.useRef)(null);
	const ringA = (0, import_react.useRef)(null);
	const ringB = (0, import_react.useRef)(null);
	const ringC = (0, import_react.useRef)(null);
	const ringD = (0, import_react.useRef)(null);
	const sat1 = (0, import_react.useRef)(null);
	const sat2 = (0, import_react.useRef)(null);
	const sat3 = (0, import_react.useRef)(null);
	const reduce = useReducedMotion();
	useFrame((state) => {
		const t = state.clock.elapsedTime;
		if (reduce) return;
		if (core.current) {
			core.current.rotation.x = t * .28;
			core.current.rotation.y = t * .42;
		}
		if (inner.current) {
			inner.current.rotation.x = -t * .55;
			inner.current.rotation.z = t * .35;
		}
		if (shell.current) {
			shell.current.rotation.y = -t * .14;
			shell.current.rotation.z = t * .1;
			const pulse = 1 + Math.sin(t * 1.35) * .035;
			shell.current.scale.setScalar(pulse);
		}
		if (lattice.current) {
			lattice.current.rotation.y = t * .08;
			lattice.current.rotation.x = Math.sin(t * .2) * .12;
		}
		if (ringA.current) ringA.current.rotation.z = t * .38;
		if (ringB.current) {
			ringB.current.rotation.x = Math.PI / 2.4 + Math.sin(t * .28) * .16;
			ringB.current.rotation.y = t * .24;
		}
		if (ringC.current) {
			ringC.current.rotation.x = Math.PI / 1.75;
			ringC.current.rotation.z = -t * .2;
		}
		if (ringD.current) {
			ringD.current.rotation.x = Math.PI / 3.1 + Math.sin(t * .15) * .2;
			ringD.current.rotation.y = t * .12;
		}
		if (sat1.current) {
			const a = t * .75;
			sat1.current.position.set(Math.cos(a) * 1.65, Math.sin(a * 1.35) * .4, Math.sin(a) * 1.65);
		}
		if (sat2.current) {
			const a = -t * .58 + 1.2;
			sat2.current.position.set(Math.cos(a) * 2.15, Math.sin(a) * .55, Math.sin(a) * 2.15);
		}
		if (sat3.current) {
			const a = t * .42 + 2.4;
			sat3.current.position.set(Math.cos(a) * 2.7, Math.sin(a * .8) * .75, Math.sin(a) * 1.9);
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: [
			1.25,
			.12,
			0
		],
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlowSprite, {
				color: ACCENT,
				size: 3.4,
				opacity: .5,
				position: [
					0,
					0,
					-.4
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlowSprite, {
				color: ACCENT2,
				size: 1.6,
				opacity: .35,
				position: [
					0,
					0,
					.2
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				ref: core,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("icosahedronGeometry", { args: [.44, 2] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: ACCENT,
					emissive: ACCENT,
					emissiveIntensity: .75,
					metalness: .75,
					roughness: .22
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				ref: inner,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("octahedronGeometry", { args: [.22, 0] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#ffffff",
					emissive: ACCENT2,
					emissiveIntensity: 1.4,
					metalness: .4,
					roughness: .2
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				ref: shell,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("icosahedronGeometry", { args: [.74, 1] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
					color: ACCENT2,
					wireframe: true,
					transparent: true,
					opacity: .32
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				ref: lattice,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusKnotGeometry", { args: [
					.95,
					.008,
					120,
					12,
					2,
					3
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
					color: VIOLET,
					transparent: true,
					opacity: .22
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				ref: ringA,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
					1.08,
					.014,
					12,
					96
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
					color: ACCENT,
					transparent: true,
					opacity: .65
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				ref: ringB,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
					1.4,
					.011,
					12,
					96
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
					color: ACCENT2,
					transparent: true,
					opacity: .48
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				ref: ringC,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
					1.72,
					.009,
					10,
					100
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
					color: WARM,
					transparent: true,
					opacity: .32
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				ref: ringD,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
					2.05,
					.006,
					8,
					100
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
					color: VIOLET,
					transparent: true,
					opacity: .22
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				ref: sat1,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					.05,
					16,
					16
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: WARM,
					emissive: WARM,
					emissiveIntensity: 1.1
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				ref: sat2,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("octahedronGeometry", { args: [.06, 0] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: ACCENT2,
					emissive: ACCENT2,
					emissiveIntensity: .9,
					metalness: .55,
					roughness: .28
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				ref: sat3,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("tetrahedronGeometry", { args: [.07, 0] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: VIOLET,
					emissive: VIOLET,
					emissiveIntensity: .7,
					metalness: .4,
					roughness: .35
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
				color: ACCENT,
				intensity: 3.2,
				distance: 7
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
				color: ACCENT2,
				intensity: 2.2,
				distance: 9,
				position: [
					-1.8,
					1.2,
					1.2
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
				color: WARM,
				intensity: 1.6,
				distance: 8,
				position: [
					1.2,
					-1.4,
					-1
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
				color: VIOLET,
				intensity: 1.2,
				distance: 6,
				position: [
					2.4,
					.6,
					-.5
				]
			})
		]
	});
}
function CosmicRingSystem() {
	const group = (0, import_react.useRef)(null);
	const reduce = useReducedMotion();
	useFrame((state) => {
		if (!group.current || reduce) return;
		const t = state.clock.elapsedTime;
		group.current.rotation.z = t * .04;
		group.current.rotation.x = Math.PI / 2.2 + Math.sin(t * .1) * .08;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
		ref: group,
		position: [
			1.1,
			.05,
			-1.2
		],
		children: [
			1.9,
			2.45,
			3.05
		].map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
			r,
			.004 + i * .001,
			8,
			120
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
			color: i === 1 ? ACCENT2 : ACCENT,
			transparent: true,
			opacity: .12 + i * .03,
			blending: 2,
			depthWrite: false
		})] }, r))
	});
}
function HorizonGrid() {
	const grid = (0, import_react.useRef)(null);
	const reduce = useReducedMotion();
	useFrame((state) => {
		if (!grid.current || reduce) return;
		grid.current.position.z = state.clock.elapsedTime * .18 % 1.2;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
		position: [
			.6,
			-1.85,
			0
		],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("gridHelper", {
			ref: grid,
			args: [
				18,
				24,
				ACCENT,
				ACCENT2
			],
			rotation: [
				0,
				0,
				0
			]
		})
	});
}
function FloatingShards({ count = 16 }) {
	const group = (0, import_react.useRef)(null);
	const reduce = useReducedMotion();
	const items = (0, import_react.useMemo)(() => Array.from({ length: count }, (_, i) => ({
		pos: [
			(Math.random() - .5) * 8,
			(Math.random() - .5) * 3.6,
			(Math.random() - .5) * 3.4 - .4
		],
		rot: [
			Math.random() * Math.PI,
			Math.random() * Math.PI,
			0
		],
		scale: .035 + Math.random() * .08,
		speed: .18 + Math.random() * .5,
		phase: Math.random() * Math.PI * 2,
		tone: i % 5
	})), [count]);
	useFrame((state) => {
		if (!group.current || reduce) return;
		const t = state.clock.elapsedTime;
		group.current.children.forEach((child, i) => {
			const item = items[i];
			if (!item) return;
			child.position.y = item.pos[1] + Math.sin(t * item.speed + item.phase) * .22;
			child.rotation.x = item.rot[0] + t * item.speed * .45;
			child.rotation.y = item.rot[1] + t * item.speed * .6;
		});
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
		ref: group,
		children: items.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: item.pos,
			rotation: item.rot,
			scale: item.scale,
			children: [i % 3 === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("octahedronGeometry", { args: [1, 0] }) : i % 3 === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tetrahedronGeometry", { args: [1, 0] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("icosahedronGeometry", { args: [1, 0] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: item.tone === 0 ? WARM : item.tone === 1 ? VIOLET : i % 2 === 0 ? ACCENT : ACCENT2,
				emissive: item.tone === 0 ? WARM : item.tone === 1 ? VIOLET : i % 2 === 0 ? ACCENT : ACCENT2,
				emissiveIntensity: .45,
				metalness: .7,
				roughness: .3,
				transparent: true,
				opacity: .92
			})]
		}, i))
	});
}
function SceneContents() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ambientLight", { intensity: .4 }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hemisphereLight", { args: [
			ACCENT2,
			"#050510",
			.55
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CameraRig, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PointerRig, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NebulaDust, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GalaxySpiral, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrbitingCore, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EnergyPulseRings, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CosmicRingSystem, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingShards, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HorizonGrid, {})
		] })
	] });
}
function HeroScene() {
	if (useReducedMotion()) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "hero-webgl",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Canvas, {
			dpr: [1, 1.5],
			camera: {
				position: [
					0,
					.18,
					6.4
				],
				fov: 42
			},
			gl: {
				antialias: true,
				alpha: true,
				powerPreference: "high-performance"
			},
			style: {
				width: "100%",
				height: "100%"
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
				fallback: null,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SceneContents, {})
			})
		})
	});
}
//#endregion
export { HeroScene, HeroScene as default };
