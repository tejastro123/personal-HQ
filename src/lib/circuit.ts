/** Pure-TypeScript quantum statevector simulator for QuCPL Lite (≤ 5 qubits). */

export type GateId =
  | "H"
  | "X"
  | "Y"
  | "Z"
  | "S"
  | "T"
  | "RX"
  | "RY"
  | "RZ"
  | "CNOT"
  | "CZ"
  | "MEASURE";

export type CircuitOp = {
  id: string;
  gate: GateId;
  /** Primary target qubit index (0-based). For CNOT/CZ this is the target. */
  target: number;
  /** Control qubit for CNOT/CZ; unused otherwise. */
  control?: number;
  /** Rotation angle in radians for RX/RY/RZ. */
  angle?: number;
};

export type Complex = { re: number; im: number };

export const GATE_META: Record<
  GateId,
  { label: string; kind: "single" | "control" | "measure"; needsAngle?: boolean; desc: string }
> = {
  H: { label: "H", kind: "single", desc: "Hadamard — creates superposition" },
  X: { label: "X", kind: "single", desc: "Pauli-X (NOT)" },
  Y: { label: "Y", kind: "single", desc: "Pauli-Y" },
  Z: { label: "Z", kind: "single", desc: "Pauli-Z (phase flip)" },
  S: { label: "S", kind: "single", desc: "S gate (√Z)" },
  T: { label: "T", kind: "single", desc: "T gate (√S)" },
  RX: { label: "RX", kind: "single", needsAngle: true, desc: "Rotation about X" },
  RY: { label: "RY", kind: "single", needsAngle: true, desc: "Rotation about Y" },
  RZ: { label: "RZ", kind: "single", needsAngle: true, desc: "Rotation about Z" },
  CNOT: { label: "CNOT", kind: "control", desc: "Controlled-NOT" },
  CZ: { label: "CZ", kind: "control", desc: "Controlled-Z" },
  MEASURE: { label: "M", kind: "measure", desc: "Measure in computational basis" },
};

let opSeq = 0;
export function nextOpId() {
  opSeq += 1;
  return `op-${opSeq}`;
}

export function initState(nQubits: number): Complex[] {
  const dim = 1 << nQubits;
  const state: Complex[] = Array.from({ length: dim }, () => ({ re: 0, im: 0 }));
  state[0] = { re: 1, im: 0 };
  return state;
}

function apply1(state: Complex[], nQubits: number, qubit: number, m: Complex[][]) {
  const dim = 1 << nQubits;
  const bit = 1 << qubit;
  for (let i = 0; i < dim; i++) {
    if (i & bit) continue;
    const j = i | bit;
    const a = state[i]!;
    const b = state[j]!;
    const out0 = {
      re: m[0]![0]!.re * a.re - m[0]![0]!.im * a.im + m[0]![1]!.re * b.re - m[0]![1]!.im * b.im,
      im: m[0]![0]!.re * a.im + m[0]![0]!.im * a.re + m[0]![1]!.re * b.im + m[0]![1]!.im * b.re,
    };
    const out1 = {
      re: m[1]![0]!.re * a.re - m[1]![0]!.im * a.im + m[1]![1]!.re * b.re - m[1]![1]!.im * b.im,
      im: m[1]![0]!.re * a.im + m[1]![0]!.im * a.re + m[1]![1]!.re * b.im + m[1]![1]!.im * b.re,
    };
    state[i] = out0;
    state[j] = out1;
  }
}

function applyControlled(
  state: Complex[],
  nQubits: number,
  control: number,
  target: number,
  m: Complex[][],
) {
  const dim = 1 << nQubits;
  const cbit = 1 << control;
  const tbit = 1 << target;
  for (let i = 0; i < dim; i++) {
    if (!(i & cbit) || i & tbit) continue;
    const j = i | tbit;
    const a = state[i]!;
    const b = state[j]!;
    const out0 = {
      re: m[0]![0]!.re * a.re - m[0]![0]!.im * a.im + m[0]![1]!.re * b.re - m[0]![1]!.im * b.im,
      im: m[0]![0]!.re * a.im + m[0]![0]!.im * a.re + m[0]![1]!.re * b.im + m[0]![1]!.im * b.re,
    };
    const out1 = {
      re: m[1]![0]!.re * a.re - m[1]![0]!.im * a.im + m[1]![1]!.re * b.re - m[1]![1]!.im * b.im,
      im: m[1]![0]!.re * a.im + m[1]![0]!.im * a.re + m[1]![1]!.re * b.im + m[1]![1]!.im * b.re,
    };
    state[i] = out0;
    state[j] = out1;
  }
}

const I2: Complex[][] = [
  [
    { re: 1, im: 0 },
    { re: 0, im: 0 },
  ],
  [
    { re: 0, im: 0 },
    { re: 1, im: 0 },
  ],
];

function gateMatrix(gate: GateId, angle = 0): Complex[][] {
  const s = Math.SQRT1_2;
  switch (gate) {
    case "H":
      return [
        [
          { re: s, im: 0 },
          { re: s, im: 0 },
        ],
        [
          { re: s, im: 0 },
          { re: -s, im: 0 },
        ],
      ];
    case "X":
      return [
        [
          { re: 0, im: 0 },
          { re: 1, im: 0 },
        ],
        [
          { re: 1, im: 0 },
          { re: 0, im: 0 },
        ],
      ];
    case "Y":
      return [
        [
          { re: 0, im: 0 },
          { re: 0, im: -1 },
        ],
        [
          { re: 0, im: 1 },
          { re: 0, im: 0 },
        ],
      ];
    case "Z":
      return [
        [
          { re: 1, im: 0 },
          { re: 0, im: 0 },
        ],
        [
          { re: 0, im: 0 },
          { re: -1, im: 0 },
        ],
      ];
    case "S":
      return [
        [
          { re: 1, im: 0 },
          { re: 0, im: 0 },
        ],
        [
          { re: 0, im: 0 },
          { re: 0, im: 1 },
        ],
      ];
    case "T":
      return [
        [
          { re: 1, im: 0 },
          { re: 0, im: 0 },
        ],
        [
          { re: 0, im: 0 },
          { re: Math.SQRT1_2, im: Math.SQRT1_2 },
        ],
      ];
    case "RX": {
      const c = Math.cos(angle / 2);
      const s2 = Math.sin(angle / 2);
      return [
        [
          { re: c, im: 0 },
          { re: 0, im: -s2 },
        ],
        [
          { re: 0, im: -s2 },
          { re: c, im: 0 },
        ],
      ];
    }
    case "RY": {
      const c = Math.cos(angle / 2);
      const s2 = Math.sin(angle / 2);
      return [
        [
          { re: c, im: 0 },
          { re: -s2, im: 0 },
        ],
        [
          { re: s2, im: 0 },
          { re: c, im: 0 },
        ],
      ];
    }
    case "RZ": {
      const c = Math.cos(angle / 2);
      const s2 = Math.sin(angle / 2);
      return [
        [
          { re: c, im: -s2 },
          { re: 0, im: 0 },
        ],
        [
          { re: 0, im: 0 },
          { re: c, im: s2 },
        ],
      ];
    }
    default:
      return I2;
  }
}

export function applyOp(state: Complex[], nQubits: number, op: CircuitOp) {
  if (op.gate === "MEASURE") {
    // Measurement is modeled as dephasing in the computational basis for viz.
    const dim = 1 << nQubits;
    for (let i = 0; i < dim; i++) {
      state[i] = { re: state[i]!.re, im: 0 };
    }
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

export function runCircuit(ops: CircuitOp[], nQubits: number): Complex[] {
  const state = initState(nQubits);
  for (const op of ops) applyOp(state, nQubits, op);
  return state;
}

export function probabilities(state: Complex[]): number[] {
  return state.map((c) => c.re * c.re + c.im * c.im);
}

export function amplitudes(state: Complex[]) {
  return state.map((c) => ({ mag: Math.hypot(c.re, c.im), phase: Math.atan2(c.im, c.re) }));
}

export function formatBasis(index: number, nQubits: number) {
  return index.toString(2).padStart(nQubits, "0");
}

/** Shared demo circuits for QuCPL Lite. */
export const DEMO_CIRCUITS: { id: string; label: string; hint: string; build: () => CircuitOp[] }[] =
  [
    {
      id: "bell",
      label: "Bell pair",
      hint: "H on q0, CNOT q0→q1 → maximally entangled",
      build: () => [
        { id: nextOpId(), gate: "H", target: 0 },
        { id: nextOpId(), gate: "CNOT", target: 1, control: 0 },
      ],
    },
    {
      id: "superpose",
      label: "1-qubit superposition",
      hint: "H alone — 50/50 on |0⟩ and |1⟩",
      build: () => [{ id: nextOpId(), gate: "H", target: 0 }],
    },
    {
      id: "ghz",
      label: "3-qubit GHZ",
      hint: "H then chain CNOTs — |000⟩+|111⟩",
      build: () => [
        { id: nextOpId(), gate: "H", target: 0 },
        { id: nextOpId(), gate: "CNOT", target: 1, control: 0 },
        { id: nextOpId(), gate: "CNOT", target: 2, control: 1 },
      ],
    },
    {
      id: "phase",
      label: "Phase kick",
      hint: "H, Z, H — interference pattern",
      build: () => [
        { id: nextOpId(), gate: "H", target: 0 },
        { id: nextOpId(), gate: "Z", target: 0 },
        { id: nextOpId(), gate: "H", target: 0 },
      ],
    },
  ];
