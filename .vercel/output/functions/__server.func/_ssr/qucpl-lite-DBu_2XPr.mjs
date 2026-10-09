import { o as __toESM } from "../_runtime.mjs";
import { m as site } from "./content-cache-DMv4KU76.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { P as Github, Y as Binary, Z as ArrowUpRight, g as Plus, o as Trash2, p as RotateCcw, x as Minus } from "../_libs/lucide-react.mjs";
import { t as SiteShell } from "./site-shell-CN1Pbmlh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/qucpl-lite-DBu_2XPr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function mul(a, b) {
	return {
		re: a.re * b.re - a.im * b.im,
		im: a.re * b.im + a.im * b.re
	};
}
function conj(a) {
	return {
		re: a.re,
		im: -a.im
	};
}
function add(a, b) {
	return {
		re: a.re + b.re,
		im: a.im + b.im
	};
}
/**
* Reduced Bloch vector for qubit 0 of a 2-qubit pure state
* ψ = [ψ00, ψ01, ψ10, ψ11] (little-endian qubit0 = LSB).
*/
function blochFromState(state) {
	if (state.length < 4) return null;
	const a = state[0];
	const b = state[1];
	const c = state[2];
	const d = state[3];
	const rho00 = a.re * a.re + a.im * a.im + b.re * b.re + b.im * b.im;
	const rho11 = c.re * c.re + c.im * c.im + d.re * d.re + d.im * d.im;
	const rho01 = add(mul(a, conj(c)), mul(b, conj(d)));
	const x = 2 * rho01.re;
	const y = 2 * rho01.im;
	const z = rho00 - rho11;
	return {
		x,
		y,
		z,
		purity: Math.min(1, Math.hypot(x, y, z))
	};
}
/** Isometric 2D projection of a Bloch vector onto the canvas. */
function projectBloch(v, cx, cy, radius, yaw = .7, pitch = .45) {
	const cosY = Math.cos(yaw);
	const sinY = Math.sin(yaw);
	const cosX = Math.cos(pitch);
	const sinX = Math.sin(pitch);
	const x1 = v.x * cosY + v.z * sinY;
	const z1 = -v.x * sinY + v.z * cosY;
	const y1 = v.y * cosX - z1 * sinX;
	const z2 = v.y * sinX + z1 * cosX;
	return {
		x: cx + x1 * radius,
		y: cy - y1 * radius,
		depth: z2
	};
}
function drawSphere(canvas, vector, yaw) {
	const parent = canvas.parentElement;
	if (!parent) return;
	const ctx = canvas.getContext("2d");
	if (!ctx) return;
	const dpr = Math.min(2, window.devicePixelRatio || 1);
	const size = Math.max(200, Math.min(280, parent.clientWidth));
	canvas.width = Math.floor(size * dpr);
	canvas.height = Math.floor(size * dpr);
	canvas.style.width = `${size}px`;
	canvas.style.height = `${size}px`;
	ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
	ctx.clearRect(0, 0, size, size);
	const cx = size / 2;
	const cy = size / 2;
	const R = size * .34;
	const glow = ctx.createRadialGradient(cx, cy, R * .2, cx, cy, R * 1.35);
	glow.addColorStop(0, "rgba(76,141,255,0.12)");
	glow.addColorStop(1, "rgba(76,141,255,0)");
	ctx.fillStyle = glow;
	ctx.beginPath();
	ctx.arc(cx, cy, R * 1.35, 0, Math.PI * 2);
	ctx.fill();
	ctx.strokeStyle = "rgba(76,141,255,0.45)";
	ctx.lineWidth = 1.5;
	ctx.beginPath();
	ctx.arc(cx, cy, R, 0, Math.PI * 2);
	ctx.stroke();
	const pitch = .45;
	ctx.strokeStyle = "rgba(34,211,238,0.35)";
	ctx.beginPath();
	ctx.ellipse(cx, cy, R, R * Math.sin(pitch), 0, 0, Math.PI * 2);
	ctx.stroke();
	ctx.strokeStyle = "rgba(251,191,36,0.28)";
	ctx.beginPath();
	ctx.ellipse(cx, cy, R * Math.sin(yaw) * .35 + R * .08, R, 0, 0, Math.PI * 2);
	ctx.stroke();
	const poles = [
		projectBloch({
			x: 0,
			y: 1,
			z: 0,
			purity: 1
		}, cx, cy, R, yaw, pitch),
		projectBloch({
			x: 0,
			y: -1,
			z: 0,
			purity: 1
		}, cx, cy, R, yaw, pitch),
		projectBloch({
			x: 1,
			y: 0,
			z: 0,
			purity: 1
		}, cx, cy, R, yaw, pitch),
		projectBloch({
			x: 0,
			y: 0,
			z: 1,
			purity: 1
		}, cx, cy, R, yaw, pitch)
	];
	ctx.strokeStyle = "rgba(113,113,122,0.55)";
	ctx.beginPath();
	ctx.moveTo(poles[0].x, poles[0].y);
	ctx.lineTo(poles[1].x, poles[1].y);
	ctx.moveTo(poles[2].x, poles[2].y);
	ctx.lineTo(poles[3].x, poles[3].y);
	ctx.stroke();
	ctx.fillStyle = "#71717a";
	ctx.font = "11px ui-monospace, monospace";
	ctx.fillText("|0⟩", poles[0].x - 6, poles[0].y - 6);
	ctx.fillText("|1⟩", poles[1].x - 6, poles[1].y + 14);
	ctx.fillText("X", poles[2].x + 6, poles[2].y + 4);
	ctx.fillText("Z", poles[3].x + 6, poles[3].y + 4);
	if (!vector) {
		ctx.fillStyle = "#71717a";
		ctx.font = "12px ui-monospace, monospace";
		ctx.textAlign = "center";
		ctx.fillText("no 2-qubit state", cx, cy + R + 28);
		ctx.textAlign = "left";
		return;
	}
	const tip = projectBloch(vector, cx, cy, R, yaw, pitch);
	const origin = {
		x: cx,
		y: cy
	};
	const grad = ctx.createLinearGradient(origin.x, origin.y, tip.x, tip.y);
	grad.addColorStop(0, "rgba(76,141,255,0.2)");
	grad.addColorStop(1, "#4c8dff");
	ctx.strokeStyle = grad;
	ctx.lineWidth = 2.5;
	ctx.beginPath();
	ctx.moveTo(origin.x, origin.y);
	ctx.lineTo(tip.x, tip.y);
	ctx.stroke();
	ctx.fillStyle = "#fbbf24";
	ctx.beginPath();
	ctx.arc(tip.x, tip.y, 5, 0, Math.PI * 2);
	ctx.fill();
	ctx.fillStyle = "#e5e7eb";
	ctx.font = "11px ui-monospace, monospace";
	ctx.fillText(`x=${vector.x.toFixed(2)} y=${vector.y.toFixed(2)} z=${vector.z.toFixed(2)}`, 10, size - 12);
	ctx.fillStyle = vector.purity > .95 ? "#4ade80" : "#fbbf24";
	ctx.fillText(vector.purity > .95 ? "pure (Bloch surface)" : `mixed · purity ${vector.purity.toFixed(2)}`, 10, size - 28);
}
function BlochSphere({ state }) {
	const canvasRef = (0, import_react.useRef)(null);
	const yawRef = (0, import_react.useRef)(.7);
	const rafRef = (0, import_react.useRef)(0);
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const vector = blochFromState(state);
		let last = performance.now();
		const loop = (now) => {
			const dt = (now - last) / 1e3;
			last = now;
			yawRef.current += dt * .35;
			drawSphere(canvas, vector, yawRef.current);
			rafRef.current = requestAnimationFrame(loop);
		};
		rafRef.current = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(rafRef.current);
	}, [state]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "relative flex justify-center rounded-lg border border-border bg-[#08080b]/60 p-2",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
			ref: canvasRef,
			"data-testid": "bloch-sphere",
			className: "max-w-full",
			"aria-label": "Bloch sphere for qubit 0"
		})
	});
}
var GATE_META = {
	H: {
		label: "H",
		kind: "single",
		desc: "Hadamard — creates superposition"
	},
	X: {
		label: "X",
		kind: "single",
		desc: "Pauli-X (NOT)"
	},
	Y: {
		label: "Y",
		kind: "single",
		desc: "Pauli-Y"
	},
	Z: {
		label: "Z",
		kind: "single",
		desc: "Pauli-Z (phase flip)"
	},
	S: {
		label: "S",
		kind: "single",
		desc: "S gate (√Z)"
	},
	T: {
		label: "T",
		kind: "single",
		desc: "T gate (√S)"
	},
	RX: {
		label: "RX",
		kind: "single",
		needsAngle: true,
		desc: "Rotation about X"
	},
	RY: {
		label: "RY",
		kind: "single",
		needsAngle: true,
		desc: "Rotation about Y"
	},
	RZ: {
		label: "RZ",
		kind: "single",
		needsAngle: true,
		desc: "Rotation about Z"
	},
	CNOT: {
		label: "CNOT",
		kind: "control",
		desc: "Controlled-NOT"
	},
	CZ: {
		label: "CZ",
		kind: "control",
		desc: "Controlled-Z"
	},
	MEASURE: {
		label: "M",
		kind: "measure",
		desc: "Measure in computational basis"
	}
};
var opSeq = 0;
function nextOpId() {
	opSeq += 1;
	return `op-${opSeq}`;
}
function initState(nQubits) {
	const dim = 1 << nQubits;
	const state = Array.from({ length: dim }, () => ({
		re: 0,
		im: 0
	}));
	state[0] = {
		re: 1,
		im: 0
	};
	return state;
}
function apply1(state, nQubits, qubit, m) {
	const dim = 1 << nQubits;
	const bit = 1 << qubit;
	for (let i = 0; i < dim; i++) {
		if (i & bit) continue;
		const j = i | bit;
		const a = state[i];
		const b = state[j];
		const out0 = {
			re: m[0][0].re * a.re - m[0][0].im * a.im + m[0][1].re * b.re - m[0][1].im * b.im,
			im: m[0][0].re * a.im + m[0][0].im * a.re + m[0][1].re * b.im + m[0][1].im * b.re
		};
		const out1 = {
			re: m[1][0].re * a.re - m[1][0].im * a.im + m[1][1].re * b.re - m[1][1].im * b.im,
			im: m[1][0].re * a.im + m[1][0].im * a.re + m[1][1].re * b.im + m[1][1].im * b.re
		};
		state[i] = out0;
		state[j] = out1;
	}
}
function applyControlled(state, nQubits, control, target, m) {
	const dim = 1 << nQubits;
	const cbit = 1 << control;
	const tbit = 1 << target;
	for (let i = 0; i < dim; i++) {
		if (!(i & cbit) || i & tbit) continue;
		const j = i | tbit;
		const a = state[i];
		const b = state[j];
		const out0 = {
			re: m[0][0].re * a.re - m[0][0].im * a.im + m[0][1].re * b.re - m[0][1].im * b.im,
			im: m[0][0].re * a.im + m[0][0].im * a.re + m[0][1].re * b.im + m[0][1].im * b.re
		};
		const out1 = {
			re: m[1][0].re * a.re - m[1][0].im * a.im + m[1][1].re * b.re - m[1][1].im * b.im,
			im: m[1][0].re * a.im + m[1][0].im * a.re + m[1][1].re * b.im + m[1][1].im * b.re
		};
		state[i] = out0;
		state[j] = out1;
	}
}
var I2 = [[{
	re: 1,
	im: 0
}, {
	re: 0,
	im: 0
}], [{
	re: 0,
	im: 0
}, {
	re: 1,
	im: 0
}]];
function gateMatrix(gate, angle = 0) {
	const s = Math.SQRT1_2;
	switch (gate) {
		case "H": return [[{
			re: s,
			im: 0
		}, {
			re: s,
			im: 0
		}], [{
			re: s,
			im: 0
		}, {
			re: -s,
			im: 0
		}]];
		case "X": return [[{
			re: 0,
			im: 0
		}, {
			re: 1,
			im: 0
		}], [{
			re: 1,
			im: 0
		}, {
			re: 0,
			im: 0
		}]];
		case "Y": return [[{
			re: 0,
			im: 0
		}, {
			re: 0,
			im: -1
		}], [{
			re: 0,
			im: 1
		}, {
			re: 0,
			im: 0
		}]];
		case "Z": return [[{
			re: 1,
			im: 0
		}, {
			re: 0,
			im: 0
		}], [{
			re: 0,
			im: 0
		}, {
			re: -1,
			im: 0
		}]];
		case "S": return [[{
			re: 1,
			im: 0
		}, {
			re: 0,
			im: 0
		}], [{
			re: 0,
			im: 0
		}, {
			re: 0,
			im: 1
		}]];
		case "T": return [[{
			re: 1,
			im: 0
		}, {
			re: 0,
			im: 0
		}], [{
			re: 0,
			im: 0
		}, {
			re: Math.SQRT1_2,
			im: Math.SQRT1_2
		}]];
		case "RX": {
			const c = Math.cos(angle / 2);
			const s2 = Math.sin(angle / 2);
			return [[{
				re: c,
				im: 0
			}, {
				re: 0,
				im: -s2
			}], [{
				re: 0,
				im: -s2
			}, {
				re: c,
				im: 0
			}]];
		}
		case "RY": {
			const c = Math.cos(angle / 2);
			const s2 = Math.sin(angle / 2);
			return [[{
				re: c,
				im: 0
			}, {
				re: -s2,
				im: 0
			}], [{
				re: s2,
				im: 0
			}, {
				re: c,
				im: 0
			}]];
		}
		case "RZ": {
			const c = Math.cos(angle / 2);
			const s2 = Math.sin(angle / 2);
			return [[{
				re: c,
				im: -s2
			}, {
				re: 0,
				im: 0
			}], [{
				re: 0,
				im: 0
			}, {
				re: c,
				im: s2
			}]];
		}
		default: return I2;
	}
}
function applyOp(state, nQubits, op) {
	if (op.gate === "MEASURE") {
		const dim = 1 << nQubits;
		for (let i = 0; i < dim; i++) state[i] = {
			re: state[i].re,
			im: 0
		};
		return;
	}
	const m = gateMatrix(op.gate, op.angle ?? 0);
	if (op.gate === "CNOT" || op.gate === "CZ") {
		const c = op.control ?? 0;
		const t = op.target;
		if (c === t) return;
		applyControlled(state, nQubits, c, t, m);
		return;
	}
	apply1(state, nQubits, op.target, m);
}
function runCircuit(ops, nQubits) {
	const state = initState(nQubits);
	for (const op of ops) applyOp(state, nQubits, op);
	return state;
}
function probabilities(state) {
	return state.map((c) => c.re * c.re + c.im * c.im);
}
function amplitudes(state) {
	return state.map((c) => ({
		mag: Math.hypot(c.re, c.im),
		phase: Math.atan2(c.im, c.re)
	}));
}
function formatBasis(index, nQubits) {
	return index.toString(2).padStart(nQubits, "0");
}
/** Shared demo circuits for QuCPL Lite. */
var DEMO_CIRCUITS = [
	{
		id: "bell",
		label: "Bell pair",
		hint: "H on q0, CNOT q0→q1 → maximally entangled",
		build: () => [{
			id: nextOpId(),
			gate: "H",
			target: 0
		}, {
			id: nextOpId(),
			gate: "CNOT",
			target: 1,
			control: 0
		}]
	},
	{
		id: "superpose",
		label: "1-qubit superposition",
		hint: "H alone — 50/50 on |0⟩ and |1⟩",
		build: () => [{
			id: nextOpId(),
			gate: "H",
			target: 0
		}]
	},
	{
		id: "ghz",
		label: "3-qubit GHZ",
		hint: "H then chain CNOTs — |000⟩+|111⟩",
		build: () => [
			{
				id: nextOpId(),
				gate: "H",
				target: 0
			},
			{
				id: nextOpId(),
				gate: "CNOT",
				target: 1,
				control: 0
			},
			{
				id: nextOpId(),
				gate: "CNOT",
				target: 2,
				control: 1
			}
		]
	},
	{
		id: "phase",
		label: "Phase kick",
		hint: "H, Z, H — interference pattern",
		build: () => [
			{
				id: nextOpId(),
				gate: "H",
				target: 0
			},
			{
				id: nextOpId(),
				gate: "Z",
				target: 0
			},
			{
				id: nextOpId(),
				gate: "H",
				target: 0
			}
		]
	}
];
var N_QUBITS = 2;
var GATES = [
	"H",
	"X",
	"Y",
	"Z",
	"S",
	"T",
	"CNOT",
	"CZ",
	"RX",
	"RY",
	"RZ"
];
function QuCplLitePage() {
	const [ops, setOps] = (0, import_react.useState)(() => DEMO_CIRCUITS[0].build());
	const [selectedGate, setSelectedGate] = (0, import_react.useState)("H");
	const [angleDeg, setAngleDeg] = (0, import_react.useState)(90);
	const [control, setControl] = (0, import_react.useState)(0);
	const [target, setTarget] = (0, import_react.useState)(1);
	const [stepIndex, setStepIndex] = (0, import_react.useState)(null);
	const partialOps = (0, import_react.useMemo)(() => stepIndex === null ? ops : ops.slice(0, stepIndex), [ops, stepIndex]);
	const state = (0, import_react.useMemo)(() => runCircuit(partialOps, N_QUBITS), [partialOps]);
	const probs = (0, import_react.useMemo)(() => probabilities(state), [state]);
	const amps = (0, import_react.useMemo)(() => amplitudes(state), [state]);
	const addGate = (0, import_react.useCallback)(() => {
		const meta = GATE_META[selectedGate];
		const angle = angleDeg * Math.PI / 180;
		let t = target;
		const c = control;
		if (meta.kind === "control") {
			if (c === t) t = t === 0 ? 1 : 0;
		} else if (t > 1) t = 0;
		setOps((prev) => [...prev, {
			id: nextOpId(),
			gate: selectedGate,
			target: t,
			control: meta.kind === "control" ? c : void 0,
			angle: meta.needsAngle ? angle : void 0
		}]);
		setStepIndex(null);
	}, [
		selectedGate,
		angleDeg,
		control,
		target
	]);
	const clear = (0, import_react.useCallback)(() => {
		setOps([]);
		setStepIndex(null);
	}, []);
	const undo = (0, import_react.useCallback)(() => {
		setOps((prev) => prev.slice(0, -1));
		setStepIndex(null);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/instruments",
				className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground",
				children: "Instruments"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap items-start justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] uppercase tracking-[0.22em] text-muted-foreground",
						children: "Quantum · sandbox"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-4xl tracking-tight",
						children: "QuCPL Lite"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-2xl text-muted-foreground",
						children: "Statevector simulator for ≤2 qubits in the UI (library supports 5). Not a second QUICKIDE — a readable sandbox that links out to the full toolchain."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "https://github.com/tejastro123/QUICKIDE",
					target: "_blank",
					rel: "noreferrer",
					className: "inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm hover:border-border-strong",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Github, { className: "size-4" }),
						"QUICKIDE repo",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-3.5" })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "min-w-0 rounded-xl border border-border bg-card p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-xl tracking-tight",
								children: "Circuit"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-1.5",
								children: DEMO_CIRCUITS.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									title: d.hint,
									onClick: () => {
										setOps(d.build());
										setStepIndex(null);
									},
									className: "inline-flex h-8 items-center rounded-md border border-border bg-background px-2.5 text-xs text-muted-foreground hover:border-border-strong hover:text-foreground",
									children: d.label
								}, d.id))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 flex flex-wrap gap-1.5",
							children: GATES.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setSelectedGate(g),
								className: selectedGate === g ? "inline-flex h-9 min-w-10 items-center justify-center rounded-md border border-accent bg-accent-soft px-2 text-xs font-medium text-accent" : "inline-flex h-9 min-w-10 items-center justify-center rounded-md border border-border bg-background px-2 text-xs text-muted-foreground hover:border-border-strong hover:text-foreground",
								title: GATE_META[g].desc,
								children: GATE_META[g].label
							}, g))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 grid gap-3 sm:grid-cols-3",
							children: [
								GATE_META[selectedGate].needsAngle ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block text-xs text-muted-foreground",
									children: [
										"Angle ",
										angleDeg,
										"°",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "range",
											min: 0,
											max: 360,
											step: 1,
											value: angleDeg,
											onChange: (e) => setAngleDeg(Number(e.target.value)),
											className: "mt-1 w-full accent-accent"
										})
									]
								}) : null,
								GATE_META[selectedGate].kind === "control" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block text-xs text-muted-foreground",
									children: [
										"Control q",
										control,
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											value: control,
											onChange: (e) => setControl(Number(e.target.value)),
											className: "mt-1 w-full rounded-md border border-border bg-background px-2 py-1.5 text-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: 0,
												children: "q0"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: 1,
												children: "q1"
											})]
										})
									]
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block text-xs text-muted-foreground",
									children: [
										"Target q",
										target,
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											value: target,
											onChange: (e) => setTarget(Number(e.target.value)),
											className: "mt-1 w-full rounded-md border border-border bg-background px-2 py-1.5 text-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: 0,
												children: "q0"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: 1,
												children: "q1"
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-end gap-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: addGate,
											className: "inline-flex h-9 items-center gap-1 rounded-md border border-accent bg-accent-soft px-3 text-xs font-medium text-accent",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), "Add gate"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: undo,
											className: "inline-flex h-9 items-center gap-1 rounded-md border border-border bg-background px-2.5 text-xs text-muted-foreground hover:border-border-strong",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-3.5" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: clear,
											className: "inline-flex h-9 items-center gap-1 rounded-md border border-border bg-background px-2.5 text-xs text-muted-foreground hover:border-border-strong",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => {
												setOps(DEMO_CIRCUITS[0].build());
												setStepIndex(null);
											},
											className: "inline-flex h-9 items-center gap-1 rounded-md border border-border bg-background px-2.5 text-xs text-muted-foreground hover:border-border-strong",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3.5" })
										})
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-xs text-muted-foreground",
							children: GATE_META[selectedGate].desc
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6 overflow-x-auto rounded-lg border border-border bg-background/50 p-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex min-w-[28rem] flex-col gap-3",
								children: [0, 1].map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "mono w-8 text-xs text-subtle",
										children: ["q", q]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-1 flex-wrap items-center gap-2",
										children: [ops.map((op, i) => {
											const touches = op.target === q || op.control !== void 0 && op.control === q;
											return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => setStepIndex(i + 1),
												className: touches ? stepIndex !== null && i >= stepIndex ? "inline-flex h-10 min-w-12 items-center justify-center rounded-md border border-border bg-background px-2 text-xs text-subtle" : "inline-flex h-10 min-w-12 items-center justify-center rounded-md border border-accent bg-accent-soft px-2 text-xs font-medium text-accent" : "inline-flex h-10 min-w-12 items-center justify-center rounded-md border border-dashed border-border/60 bg-transparent px-2 text-xs text-subtle/50",
												title: op.gate === "CNOT" || op.gate === "CZ" ? `${op.gate} c${op.control} → t${op.target}` : op.gate,
												children: op.gate
											}, op.id);
										}), !ops.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-subtle",
											children: "Add gates or load a demo"
										}) : null]
									})]
								}, q))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Binary, { className: "size-4 text-accent" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: stepIndex === null ? `Full circuit · ${ops.length} op${ops.length === 1 ? "" : "s"}` : `Showing first ${stepIndex} op${stepIndex === 1 ? "" : "s"} — click a gate to scrub` }),
								stepIndex !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setStepIndex(null),
									className: "text-accent underline-offset-4 hover:underline",
									children: "Show full"
								}) : null
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "min-w-0 rounded-xl border border-border bg-card p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-xl tracking-tight",
							children: "Statevector"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: "Computational basis · |ψ|² probability · phase in radians"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 space-y-2",
							children: state.map((c, i) => {
								const p = probs[i] ?? 0;
								const a = amps[i];
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "rounded-lg border border-border bg-background/40 p-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "mono text-sm",
												children: [
													"|",
													formatBasis(i, N_QUBITS),
													"⟩"
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "mono text-xs tabular-nums text-muted-foreground",
												children: [(p * 100).toFixed(1), "%"]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-2 h-1.5 overflow-hidden rounded-full bg-muted",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "h-full rounded-full bg-accent transition-[width] duration-300",
												style: { width: `${Math.min(100, p * 100).toFixed(1)}%` }
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mono mt-2 text-[11px] text-subtle",
											children: [
												"|a|=",
												a.mag.toFixed(4),
												" · φ=",
												a.phase.toFixed(3),
												" rad",
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "ml-2",
													children: [
														"(",
														c.re.toFixed(4),
														c.im < 0 ? " − " : " + ",
														Math.abs(c.im).toFixed(4),
														"i)"
													]
												})
											]
										})
									]
								}, i);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-baseline justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display text-lg tracking-tight",
										children: "Bloch sphere · qubit 0"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mono text-[10px] uppercase tracking-[0.14em] text-subtle",
										children: "reduced state"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-muted-foreground",
									children: "Trace out qubit 1 — entanglement shows up as a mixed interior point, not a surface vector."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BlochSphere, { state })
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-xs leading-relaxed text-muted-foreground",
							children: "Measurement gates dephase amplitudes so the viz stays honest without collapsing to a single shot. Full QUICKIDE owns noisy simulation and IBM Quantum submission."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-xs text-muted-foreground",
							children: [
								"Identity reference:",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mono text-foreground",
									children: site.social.github
								})
							]
						})
					]
				})]
			})
		]
	}) });
}
//#endregion
export { QuCplLitePage, QuCplLitePage as default };
