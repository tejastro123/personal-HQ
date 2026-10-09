export type ExperimentSample = {
  tMs: number;
  objects: number;
  fps: number;
  gravity: number;
  restitution: number;
  paused: 0 | 1;
};

export type SavedExperiment = {
  id: string;
  name: string;
  preset: string;
  gravity: number;
  restitution: number;
  createdAt: string;
  samples: ExperimentSample[];
};

const KEY = "tejas-experiment-journal-v1";

export function loadExperiments(): SavedExperiment[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as SavedExperiment[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveExperiment(exp: SavedExperiment): SavedExperiment[] {
  const list = [exp, ...loadExperiments()].slice(0, 30);
  if (typeof window !== "undefined") {
    localStorage.setItem(KEY, JSON.stringify(list));
  }
  return list;
}

export function deleteExperiment(id: string): SavedExperiment[] {
  const list = loadExperiments().filter((e) => e.id !== id);
  if (typeof window !== "undefined") {
    localStorage.setItem(KEY, JSON.stringify(list));
  }
  return list;
}

export function experimentToCsv(exp: SavedExperiment): string {
  const header = "t_ms,objects,fps,gravity,restitution,paused";
  const rows = exp.samples.map((s) =>
    [s.tMs, s.objects, s.fps, s.gravity, s.restitution, s.paused].join(","),
  );
  return [header, ...rows].join("\n");
}

export function downloadExperimentCsv(exp: SavedExperiment) {
  const csv = experimentToCsv(exp);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `experiment-${exp.name.replace(/[^\w-]+/g, "_").toLowerCase()}-${exp.id}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export function emptySample(): ExperimentSample {
  return { tMs: 0, objects: 0, fps: 0, gravity: 0, restitution: 0, paused: 0 };
}
