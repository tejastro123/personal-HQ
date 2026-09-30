import { i as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { _ as Vector2, a as useThree, g as Raycaster, i as useFrame, m as Plane, n as OrbitControls, r as Canvas, t as Grid, v as Vector3 } from "../_libs/@react-three/drei+[...].mjs";
import { S as Cylinder, T as Box, i as Trash2, l as Play, s as RotateCcw, u as Pause, w as Circle } from "../_libs/lucide-react.mjs";
import { s as site } from "./router-C6XbOyFA.mjs";
import { n as ThemeToggle, t as Button } from "./theme-toggle-BXztJUq1.mjs";
import { n as RigidBody, t as Physics } from "../_libs/@react-three/rapier+[...].mjs";
import { s as zA } from "../_libs/dimforge__rapier3d-compat.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/physics-playground-Ch86XYVE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PRESETS = {
	earth: {
		label: "Earth",
		gravity: 9.81,
		restitution: .65
	},
	"zero-g": {
		label: "Zero-g",
		gravity: 0,
		restitution: .95
	},
	magnet: {
		label: "Magnet",
		gravity: 3.2,
		restitution: .12
	},
	pendulum: {
		label: "Pendulum",
		gravity: 4.5,
		restitution: .04
	},
	custom: {
		label: "Custom",
		gravity: 9.81,
		restitution: .65
	}
};
var PRESET_ORDER = [
	"earth",
	"zero-g",
	"magnet",
	"pendulum"
];
function readPresetFromUrl() {
	if (typeof window === "undefined") return "earth";
	const raw = new URLSearchParams(window.location.search).get("preset");
	return raw && raw in PRESETS && raw !== "custom" ? raw : "earth";
}
function writePresetToUrl(preset, gravity, restitution) {
	if (typeof window === "undefined") return;
	const params = new URLSearchParams(window.location.search);
	if (preset === "custom") {
		params.set("preset", "custom");
		params.set("g", gravity.toFixed(2));
		params.set("r", restitution.toFixed(2));
	} else if (PRESETS[preset]) {
		params.set("preset", preset);
		params.delete("g");
		params.delete("r");
	}
	const q = params.toString();
	window.history.replaceState(null, "", q ? `${window.location.pathname}?${q}` : window.location.pathname);
}
function readGravityFromUrl() {
	if (typeof window === "undefined") return null;
	const raw = new URLSearchParams(window.location.search).get("g");
	const n = raw ? Number(raw) : NaN;
	return Number.isFinite(n) ? Math.max(-12, Math.min(30, n)) : null;
}
function readRestitutionFromUrl() {
	if (typeof window === "undefined") return null;
	const raw = new URLSearchParams(window.location.search).get("r");
	const n = raw ? Number(raw) : NaN;
	return Number.isFinite(n) ? Math.max(0, Math.min(1, n)) : null;
}
var nextId = 1;
function randomBody(shape) {
	return {
		id: nextId++,
		shape,
		position: [
			(Math.random() - .5) * 4,
			3.5 + Math.random() * 2.5,
			(Math.random() - .5) * 4
		]
	};
}
function PhysicsPlayground() {
	const [preset, setPreset] = (0, import_react.useState)(() => {
		if (typeof window === "undefined") return "earth";
		const fromUrl = readPresetFromUrl();
		const g = readGravityFromUrl();
		const r = readRestitutionFromUrl();
		if (fromUrl !== "earth" || g !== null || r !== null) return fromUrl === "earth" && g !== null ? "custom" : fromUrl;
		return "earth";
	});
	const [gravity, setGravity] = (0, import_react.useState)(() => {
		const g = readGravityFromUrl();
		if (g !== null) return g;
		const p = readPresetFromUrl();
		return PRESETS[p === "custom" ? "earth" : p].gravity;
	});
	const [restitution, setRestitution] = (0, import_react.useState)(() => {
		const r = readRestitutionFromUrl();
		if (r !== null) return r;
		const p = readPresetFromUrl();
		return PRESETS[p === "custom" ? "earth" : p].restitution;
	});
	const [paused, setPaused] = (0, import_react.useState)(false);
	const [bodies, setBodies] = (0, import_react.useState)(() => [
		randomBody("sphere"),
		randomBody("box"),
		randomBody("cylinder")
	]);
	const [fps, setFps] = (0, import_react.useState)(0);
	const [dragging, setDragging] = (0, import_react.useState)(false);
	const isMobile = useIsMobile();
	const cap = isMobile ? 24 : 48;
	(0, import_react.useEffect)(() => {
		writePresetToUrl(preset, gravity, restitution);
	}, [
		preset,
		gravity,
		restitution
	]);
	const applyPreset = (0, import_react.useCallback)((id) => {
		const p = PRESETS[id];
		if (!p || id === "custom") return;
		setPreset(id);
		setGravity(p.gravity);
		setRestitution(p.restitution);
		setPaused(false);
		setBodies([
			randomBody("sphere"),
			randomBody("box"),
			randomBody("cylinder")
		]);
	}, []);
	const onGravity = (0, import_react.useCallback)((n) => {
		setGravity(n);
		setPreset("custom");
	}, []);
	const onRestitution = (0, import_react.useCallback)((n) => {
		setRestitution(n);
		setPreset("custom");
	}, []);
	const spawn = (0, import_react.useCallback)((shape) => {
		setBodies((list) => list.length >= cap ? list : [...list, randomBody(shape)]);
	}, [cap]);
	const clear = (0, import_react.useCallback)(() => setBodies([]), []);
	const reset = (0, import_react.useCallback)(() => {
		nextId = 1;
		applyPreset("earth");
	}, [applyPreset]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative h-dvh overflow-hidden bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-3 sm:p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pointer-events-auto flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "font-display text-xs font-semibold tracking-[0.18em]",
							children: site.name.toUpperCase()
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-1 font-display text-xl tracking-tight sm:text-2xl",
							children: "Physics Playground"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "max-w-md text-xs text-muted-foreground sm:text-sm",
							children: "Drop objects. Break things. Learn how the system behaves."
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "sm",
							variant: "outline",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								children: "Home"
							})
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pointer-events-auto flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toolbar, {
						paused,
						preset,
						onPreset: applyPreset,
						onSpawn: spawn,
						onClear: clear,
						onReset: reset,
						onTogglePause: () => setPaused((p) => !p),
						gravity,
						restitution,
						onGravity,
						onRestitution
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stats, {
						objects: bodies.length,
						fps,
						gravity,
						restitution,
						paused,
						preset
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-none absolute inset-x-0 top-1/2 z-10 hidden justify-between px-8 text-[10px] uppercase tracking-[0.18em] text-subtle md:flex",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Gravity" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Collision" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Canvas, {
				shadows: !isMobile,
				dpr: isMobile ? [1, 1.25] : [1, 1.75],
				camera: {
					position: [
						7.5,
						6.5,
						9
					],
					fov: 45
				},
				gl: {
					antialias: !isMobile,
					powerPreference: "high-performance"
				},
				onCreated: ({ gl }) => {
					gl.shadowMap.type = 1;
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("color", {
						attach: "background",
						args: ["#050505"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ambientLight", { intensity: .45 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
						position: [
							8,
							12,
							6
						],
						intensity: 1.15,
						castShadow: !isMobile,
						"shadow-mapSize-width": 1024,
						"shadow-mapSize-height": 1024
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
						fallback: null,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Physics, {
							gravity: [
								0,
								-gravity,
								0
							],
							paused,
							interpolate: true,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ground, { restitution }), bodies.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayBody, {
								spec: b,
								restitution,
								onDrag: setDragging
							}, b.id))]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid, {
						args: [24, 24],
						cellSize: 1,
						cellThickness: .6,
						sectionSize: 4,
						sectionThickness: 1,
						fadeDistance: 28,
						cellColor: "#2a2a32",
						sectionColor: "#3a3a44",
						position: [
							0,
							.02,
							0
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrbitControls, {
						enabled: !dragging,
						makeDefault: true,
						minDistance: 4,
						maxDistance: 28,
						maxPolarAngle: Math.PI / 2.05,
						enableDamping: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FpsReporter, { onFps: setFps })
				]
			})
		]
	});
}
function Ground({ restitution }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RigidBody, {
		type: "fixed",
		restitution,
		friction: .9,
		colliders: "cuboid",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			receiveShadow: true,
			position: [
				0,
				-.25,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				40,
				.5,
				40
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#111114",
				roughness: .92,
				metalness: .05
			})]
		})
	});
}
function PlayBody({ spec, restitution, onDrag }) {
	const body = (0, import_react.useRef)(null);
	const dragging = (0, import_react.useRef)(false);
	const last = (0, import_react.useRef)(new Vector3());
	const vel = (0, import_react.useRef)(new Vector3());
	const { camera, gl } = useThree();
	const plane = (0, import_react.useMemo)(() => new Plane(new Vector3(0, 1, 0), 0), []);
	const raycaster = (0, import_react.useMemo)(() => new Raycaster(), []);
	const pointer = (0, import_react.useMemo)(() => new Vector2(), []);
	const hit = (0, import_react.useMemo)(() => new Vector3(), []);
	(0, import_react.useEffect)(() => {
		const move = (e) => {
			if (!dragging.current || !body.current) return;
			const rect = gl.domElement.getBoundingClientRect();
			pointer.x = (e.clientX - rect.left) / rect.width * 2 - 1;
			pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
			raycaster.setFromCamera(pointer, camera);
			plane.constant = -last.current.y;
			if (raycaster.ray.intersectPlane(plane, hit)) {
				vel.current.copy(hit).sub(last.current);
				last.current.copy(hit);
				body.current.setNextKinematicTranslation({
					x: hit.x,
					y: Math.max(.4, hit.y),
					z: hit.z
				});
			}
		};
		const up = () => {
			if (!dragging.current || !body.current) return;
			dragging.current = false;
			onDrag(false);
			body.current.setBodyType(zA.Dynamic, true);
			body.current.setLinvel({
				x: vel.current.x * 28,
				y: vel.current.y * 28,
				z: vel.current.z * 28
			}, true);
		};
		window.addEventListener("pointermove", move);
		window.addEventListener("pointerup", up);
		return () => {
			window.removeEventListener("pointermove", move);
			window.removeEventListener("pointerup", up);
		};
	}, [
		camera,
		gl,
		hit,
		onDrag,
		plane,
		pointer,
		raycaster
	]);
	const color = spec.shape === "sphere" ? "#4c8dff" : spec.shape === "box" ? "#d4d4d8" : spec.shape === "cylinder" ? "#7dd3fc" : "#f5f5f5";
	const collider = spec.shape === "sphere" ? "ball" : spec.shape === "box" ? "cuboid" : "hull";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RigidBody, {
		ref: body,
		position: spec.position,
		colliders: collider,
		restitution,
		friction: .45,
		mass: 1,
		linearDamping: .15,
		angularDamping: .15,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			castShadow: true,
			onPointerDown: (e) => {
				e.stopPropagation();
				if (!body.current) return;
				dragging.current = true;
				onDrag(true);
				const t = body.current.translation();
				last.current.set(t.x, t.y, t.z);
				plane.constant = -t.y;
				body.current.setBodyType(zA.KinematicPositionBased, true);
			},
			children: [
				spec.shape === "sphere" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					.45,
					24,
					16
				] }) : null,
				spec.shape === "box" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.8,
					.8,
					.8
				] }) : null,
				spec.shape === "cylinder" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.35,
					.35,
					.9,
					20
				] }) : null,
				spec.shape === "capsule" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
					.28,
					.7,
					8,
					16
				] }) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color,
					roughness: .35,
					metalness: .12
				})
			]
		})
	});
}
function FpsReporter({ onFps }) {
	const frames = (0, import_react.useRef)(0);
	const last = (0, import_react.useRef)(performance.now());
	useFrame(() => {
		frames.current += 1;
		const now = performance.now();
		if (now - last.current >= 500) {
			onFps(Math.round(frames.current * 1e3 / (now - last.current)));
			frames.current = 0;
			last.current = now;
		}
	});
	return null;
}
function Toolbar({ paused, preset, onPreset, onSpawn, onClear, onReset, onTogglePause, gravity, restitution, onGravity, onRestitution }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-xl rounded-xl border border-border bg-card/90 p-3 shadow-[var(--shadow-lift)] backdrop-blur-md",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mr-1 text-[10px] uppercase tracking-[0.16em] text-subtle",
					children: "Presets"
				}), PRESET_ORDER.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"data-preset": id,
					onClick: () => onPreset(id),
					className: preset === id ? "inline-flex h-8 items-center rounded-md border border-accent bg-accent-soft px-2.5 text-xs font-medium text-accent" : "inline-flex h-8 items-center rounded-md border border-border bg-background px-2.5 text-xs text-muted-foreground hover:border-border-strong hover:text-foreground",
					children: PRESETS[id].label
				}, id))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex flex-wrap gap-1.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tool, {
						onClick: () => onSpawn("sphere"),
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "size-4" }),
						label: "Sphere"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tool, {
						onClick: () => onSpawn("box"),
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, { className: "size-4" }),
						label: "Box"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tool, {
						onClick: () => onSpawn("cylinder"),
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cylinder, { className: "size-4" }),
						label: "Cylinder"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tool, {
						onClick: () => onSpawn("capsule"),
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "size-4" }),
						label: "Capsule"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tool, {
						onClick: onClear,
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" }),
						label: "Clear"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tool, {
						onClick: onReset,
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-4" }),
						label: "Reset"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tool, {
						onClick: onTogglePause,
						icon: paused ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-4" }),
						label: paused ? "Play" : "Pause"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 grid gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block text-xs text-muted-foreground",
					children: [
						"Gravity ",
						gravity.toFixed(2),
						" m/s²",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "range",
							min: -12,
							max: 30,
							step: .01,
							value: gravity,
							onChange: (e) => onGravity(Number(e.target.value)),
							className: "mt-1 w-full accent-accent"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block text-xs text-muted-foreground",
					children: [
						"Restitution ",
						restitution.toFixed(2),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-1 text-subtle",
							children: "(0 none · 1 elastic)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "range",
							min: 0,
							max: 1,
							step: .01,
							value: restitution,
							onChange: (e) => onRestitution(Number(e.target.value)),
							className: "mt-1 w-full accent-accent"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mono mt-2 text-[10px] text-subtle",
				children: [
					"Share: /playground?preset=",
					preset,
					preset === "custom" ? `&g=${gravity.toFixed(2)}&r=${restitution.toFixed(2)}` : ""
				]
			})
		]
	});
}
function Tool({ onClick, icon, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: "inline-flex h-10 items-center gap-1.5 rounded-md border border-border bg-background px-3 text-xs hover:border-border-strong",
		children: [icon, label]
	});
}
function Stats({ objects, fps, gravity, restitution, paused, preset }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
		className: "grid min-w-[12rem] grid-cols-2 gap-x-4 gap-y-1 rounded-xl border border-border bg-card/90 px-4 py-3 font-mono text-[11px] tabular-nums shadow-[var(--shadow-lift)] backdrop-blur-md",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
				className: "text-subtle",
				children: "Objects"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
				"data-testid": "object-count",
				children: objects
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
				className: "text-subtle",
				children: "FPS"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: fps || "—" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
				className: "text-subtle",
				children: "Gravity"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: [gravity.toFixed(2), " m/s²"] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
				className: "text-subtle",
				children: "Restitution"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: restitution.toFixed(2) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
				className: "text-subtle",
				children: "Simulation"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: paused ? "Paused" : "Running" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
				className: "text-subtle",
				children: "Preset"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
				"data-testid": "preset-label",
				children: PRESETS[preset] ? PRESETS[preset].label : "Custom"
			})
		]
	});
}
function useIsMobile() {
	const [m, setM] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const q = window.matchMedia("(max-width: 768px)");
		const apply = () => setM(q.matches);
		apply();
		q.addEventListener("change", apply);
		return () => q.removeEventListener("change", apply);
	}, []);
	return m;
}
//#endregion
export { PhysicsPlayground as default };
