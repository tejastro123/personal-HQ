import { categorySvgClass } from "@/lib/categories";
import { cn } from "@/lib/utils";

export function ProjectVisual({
  visual,
  className,
  category,
}: {
  visual: string;
  className?: string;
  category?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-background-secondary",
        category ? categorySvgClass(category) : "text-current",
        className,
      )}
      aria-hidden="true"
    >
      <svg viewBox="0 0 640 400" className="h-full w-full" role="img">
        <rect width="640" height="400" className="fill-background-secondary" />
        {render(visual)}
      </svg>
    </div>
  );
}

function WindowChrome({ title }: { title: string }) {
  return (
    <g>
      <rect x="48" y="36" width="544" height="328" rx="12" className="fill-card stroke-border" strokeWidth="1.2" />
      <rect x="48" y="36" width="544" height="36" rx="12" className="fill-card" />
      <rect x="48" y="58" width="544" height="14" className="fill-card" />
      <circle cx="72" cy="54" r="5" className="fill-subtle" />
      <circle cx="90" cy="54" r="5" className="fill-subtle" />
      <circle cx="108" cy="54" r="5" className="fill-subtle" />
      <text x="130" y="58" className="fill-muted-foreground" fontSize="11" fontFamily="ui-monospace, monospace">
        {title}
      </text>
      <line x1="48" y1="72" x2="592" y2="72" className="stroke-border" strokeWidth="1" />
    </g>
  );
}

function render(visual: string) {
  switch (visual) {
    case "quantum":
      return (
        <g>
          <WindowChrome title="QUICKIDE — QuCPL editor" />
          <rect x="64" y="88" width="160" height="256" rx="6" className="fill-background-secondary stroke-border" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect
              key={i}
              x={76}
              y={100 + i * 36}
              width={i % 3 === 0 ? 120 : 90}
              height="10"
              rx="2"
              className={i === 1 ? "fill-current/70" : "fill-foreground/20"}
            />
          ))}
          <g stroke="currentColor" fill="none" className="text-current">
            <path d="M260 160 H540" strokeWidth="1.2" opacity="0.5" />
            <path d="M260 220 H540" strokeWidth="1.2" opacity="0.35" />
            <path d="M260 280 H540" strokeWidth="1.2" opacity="0.35" />
            {[300, 360, 420, 480].map((x) => (
              <g key={x}>
                <rect x={x - 18} y="142" width="36" height="36" rx="3" strokeWidth="1.4" className="stroke-foreground" />
                <rect x={x - 18} y="262" width="36" height="36" rx="3" strokeWidth="1.4" className="stroke-foreground" />
                <circle cx={x} cy="220" r="8" fill="currentColor" className="fill-foreground" />
              </g>
            ))}
            <path d="M318 178 C 340 178, 340 262, 362 262" strokeWidth="1.4" />
          </g>
          <rect x="260" y="310" width="280" height="22" rx="3" className="fill-current/15 stroke-current/40" />
        </g>
      );
    case "os":
      return (
        <g className="text-foreground" stroke="currentColor" fill="none">
          <WindowChrome title="Studio — workspace" />
          <rect x="64" y="88" width="130" height="256" rx="6" className="fill-background-secondary stroke-border" />
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x={76} y={104 + i * 40} width={i === 1 ? 106 : 84} height="12" rx="3" className={i === 1 ? "fill-current/40" : "fill-foreground/15"} />
          ))}
          <rect x="210" y="88" width="364" height="120" rx="6" className="fill-background-secondary stroke-border" />
          <rect x="226" y="104" width="160" height="12" rx="3" className="fill-foreground/20" />
          <rect x="226" y="128" width="330" height="60" rx="4" className="fill-current/10 stroke-current/30" />
          <rect x="210" y="220" width="174" height="124" rx="6" className="fill-background-secondary stroke-border" />
          <rect x="396" y="220" width="178" height="124" rx="6" className="fill-current/15 stroke-current" />
          <path d="M420 300 L460 260 L500 290 L540 240" strokeWidth="1.6" className="text-current" />
        </g>
      );
    case "education":
      return (
        <g className="text-foreground" stroke="currentColor" fill="none">
          <WindowChrome title="Study track — curriculum" />
          <rect x="64" y="88" width="200" height="256" rx="8" className="stroke-border" />
          <rect x="80" y="108" width="120" height="12" rx="3" className="fill-foreground/25" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <g key={i}>
              <rect
                x={80}
                y={140 + i * 32}
                width={160}
                height="22"
                rx="4"
                className={i < 3 ? "fill-current/20 stroke-current/40" : "stroke-border"}
              />
              <rect x={90} y={148 + i * 32} width={i < 3 ? 100 - i * 12 : 70} height="6" rx="2" className="fill-foreground/20" />
            </g>
          ))}
          <rect x="280" y="88" width="294" height="120" rx="8" className="stroke-border" />
          <path d="M300 180 L340 140 L380 160 L430 110 L480 130 L540 100" strokeWidth="1.8" className="text-current" />
          <rect x="280" y="220" width="140" height="124" rx="8" className="stroke-border" />
          <rect x="434" y="220" width="140" height="124" rx="8" className="fill-current/10 stroke-current" />
          <text x="300" y="250" className="fill-muted-foreground" fontSize="10" fontFamily="ui-monospace, monospace">
            practice
          </text>
          <text x="454" y="250" className="fill-muted-foreground" fontSize="10" fontFamily="ui-monospace, monospace">
            projects
          </text>
        </g>
      );
    case "sports":
      return (
        <g className="text-foreground" stroke="currentColor" fill="none">
          <WindowChrome title="Race desk — live timing" />
          <rect x="64" y="88" width="510" height="48" rx="6" className="stroke-border" />
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i}>
              <circle cx={90 + i * 100} cy="112" r="8" className={i === 0 ? "fill-current" : "fill-foreground/20"} />
              <rect x={110 + i * 100} y="104" width={56} height="10" rx="2" className="fill-foreground/25" />
            </g>
          ))}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <g key={i}>
              <rect x={80} y={160 + i * 32} width="40" height="18" rx="3" className="fill-current/30" />
              <rect x={130} y={164 + i * 32} width={280 - i * 30} height="10" rx="2" className="fill-foreground/20" />
              <rect x={430} y={164 + i * 32} width={70 + (i % 3) * 20} height="10" rx="2" className={i < 2 ? "fill-current/70" : "fill-foreground/15"} />
            </g>
          ))}
        </g>
      );
    case "quant":
      return (
        <g fill="none" stroke="currentColor" className="text-current">
          <WindowChrome title="Signals — equity lab" />
          <rect x="64" y="88" width="510" height="48" rx="6" className="fill-background-secondary stroke-border" />
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect x={80 + i * 120} y={102} width={70} height="10" rx="2" className="fill-foreground/25" />
              <rect x={80 + i * 120} y={118} width={48} height="8" rx="2" className={i === 2 ? "fill-current/70" : "fill-foreground/15"} />
            </g>
          ))}
          <polyline points="80,300 140,250 200,265 260,180 320,200 380,120 440,150 500,95 560,110" strokeWidth="1.8" />
          <polyline points="80,320 160,310 240,285 320,275 400,245 500,230 560,210" strokeWidth="1.2" opacity="0.45" className="text-foreground" />
          {[80, 200, 320, 440, 560].map((x) => (
            <line key={x} x1={x} y1="150" x2={x} y2="340" strokeWidth="0.6" opacity="0.2" className="text-foreground" />
          ))}
        </g>
      );
    case "solar":
      return (
        <g className="text-current" stroke="currentColor" fill="none">
          <WindowChrome title="Array ops — production view" />
          <circle cx="120" cy="130" r="28" strokeWidth="1.6" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
            const r = (a * Math.PI) / 180;
            return (
              <line
                key={a}
                x1={120 + Math.cos(r) * 38}
                y1={130 + Math.sin(r) * 38}
                x2={120 + Math.cos(r) * 52}
                y2={130 + Math.sin(r) * 52}
                strokeWidth="1.4"
              />
            );
          })}
          <rect x="200" y="100" width="360" height="24" rx="3" className="fill-foreground/15" />
          <rect x="200" y="136" width="220" height="14" rx="2" className="fill-current/60" />
          {[0, 1, 2].map((row) =>
            [0, 1, 2, 3].map((col) => (
              <rect
                key={`${row}-${col}`}
                x={200 + col * 88}
                y={190 + row * 50}
                width="76"
                height="38"
                rx="3"
                className="fill-background-secondary stroke-foreground/40"
              />
            )),
          )}
        </g>
      );
    case "gpt":
      return (
        <g className="text-foreground" stroke="currentColor" fill="none">
          <WindowChrome title="Transformer — training run" />
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect x={90 + i * 120} y="100" width="88" height="220" rx="8" className="stroke-border" />
              <rect x={102 + i * 120} y="120" width="64" height="28" rx="4" className="fill-current/25 stroke-current" />
              <rect x={102 + i * 120} y="162" width="64" height="88" rx="4" className="stroke-foreground/40" />
              <rect x={102 + i * 120} y="262" width="64" height="36" rx="4" className="stroke-foreground/30" />
            </g>
          ))}
          {[0, 1, 2].map((i) => (
            <path key={i} d={`M${178 + i * 120} 210 H${210 + i * 120}`} className="text-current" strokeWidth="1.4" />
          ))}
          <rect x="90" y="336" width="440" height="10" rx="2" className="fill-current/40" />
        </g>
      );
    case "physics":
      return (
        <g className="text-current" fill="none" stroke="currentColor">
          <WindowChrome title="Physics Playground — live sim" />
          <line x1="80" y1="320" x2="560" y2="320" className="text-foreground" opacity="0.35" strokeWidth="1.4" />
          <circle cx="180" cy="210" r="36" fill="currentColor" className="fill-current/30" />
          <rect x="300" y="188" width="72" height="72" rx="4" className="stroke-foreground" />
          <rect x="430" y="200" width="40" height="110" rx="20" className="stroke-current" />
          <path d="M180 246 C 180 300, 300 300, 336 260" strokeDasharray="4 6" opacity="0.7" />
          <rect x="80" y="88" width="100" height="70" rx="4" className="fill-background-secondary stroke-border" />
          <text x="92" y="108" className="fill-muted-foreground" fontSize="9" fontFamily="ui-monospace, monospace">gravity</text>
          <rect x="92" y="120" width="76" height="6" rx="2" className="fill-foreground/20" />
          <rect x="92" y="120" width="48" height="6" rx="2" className="fill-current" />
          <text x="92" y="146" className="fill-muted-foreground" fontSize="9" fontFamily="ui-monospace, monospace">restitution</text>
          <rect x="92" y="152" width="76" height="6" rx="2" className="fill-foreground/20" />
          <rect x="92" y="152" width="30" height="6" rx="2" className="fill-current" />
        </g>
      );
    case "ai":
      return (
        <g className="text-foreground" stroke="currentColor" fill="none">
          <WindowChrome title="RAG — retrieval console" />
          <rect x="64" y="88" width="300" height="256" rx="6" className="fill-background-secondary stroke-border" />
          <rect x="80" y="104" width="180" height="12" rx="3" className="fill-foreground/25" />
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i}>
              <rect x={80} y={136 + i * 40} width={260} height="32" rx="4" className={i < 2 ? "fill-current/15 stroke-current/40" : "fill-card stroke-border"} />
              <rect x={92} y={144 + i * 40} width={200 - i * 20} height="8" rx="2" className="fill-foreground/20" />
            </g>
          ))}
          <rect x="380" y="88" width="194" height="256" rx="6" className="fill-background-secondary stroke-border" />
          <rect x="396" y="104" width="100" height="12" rx="3" className="fill-foreground/25" />
          {[120, 160, 200, 240, 280, 320].map((x, i) => (
            <circle key={x} cx={x} cy={i % 2 ? 180 : 260} r="14" className="stroke-current" />
          ))}
          <path d="M414 180 L474 246 M474 180 L414 260" className="text-current" opacity="0.6" />
        </g>
      );
    case "data":
      return (
        <g className="text-current" fill="currentColor">
          <WindowChrome title="Explorer — season data" />
          <rect x="64" y="88" width="510" height="36" rx="6" className="fill-background-secondary" stroke="currentColor" strokeOpacity="0.2" />
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={80 + i * 120} y={98} width={70} height="10" rx="2" className="fill-foreground/20" />
          ))}
          {[40, 90, 55, 120, 70, 150, 80].map((h, i) => (
            <rect
              key={i}
              x={90 + i * 70}
              y={330 - h * 1.4}
              width="36"
              height={h * 1.4}
              rx="4"
              className="fill-current/70"
              opacity={0.4 + i * 0.08}
            />
          ))}
        </g>
      );
    case "creative":
      return (
        <g className="text-current" fill="none" stroke="currentColor">
          <WindowChrome title="AirDraw — gesture canvas" />
          <circle cx="320" cy="220" r="110" strokeWidth="1" opacity="0.4" />
          <circle cx="320" cy="220" r="60" strokeWidth="1.4" />
          <path d="M320 110 L355 220 L320 330 L285 220 Z" strokeWidth="1.4" />
          <circle cx="400" cy="150" r="10" className="fill-current/40" />
          <circle cx="430" cy="175" r="7" className="fill-current/30" />
          <path d="M200 300 C 260 240, 300 280, 360 230" strokeDasharray="3 5" opacity="0.6" />
        </g>
      );
    case "software":
      return (
        <g className="text-foreground" stroke="currentColor" fill="none">
          <WindowChrome title="App — product surface" />
          <rect x="80" y="100" width="140" height="230" rx="8" className="stroke-border" />
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={96} y={120 + i * 48} width={i === 1 ? 108 : 84} height="28" rx="4" className={i === 1 ? "fill-current/25 stroke-current" : "stroke-border"} />
          ))}
          <rect x="250" y="100" width="300" height="100" rx="8" className="stroke-current" />
          <rect x="266" y="120" width="140" height="14" rx="3" className="fill-foreground/25" />
          <rect x="266" y="148" width="220" height="30" rx="4" className="fill-current/15" />
          <rect x="250" y="220" width="140" height="110" rx="8" className="stroke-border" />
          <rect x="410" y="220" width="140" height="110" rx="8" className="stroke-border" />
        </g>
      );
    case "grid":
      return (
        <g className="text-current" stroke="currentColor" fill="none">
          <WindowChrome title="Grid — coupled system" />
          {[0, 1, 2].map((r) =>
            [0, 1, 2, 3].map((c) => (
              <g key={`${r}-${c}`}>
                <circle cx={160 + c * 110} cy={140 + r * 80} r="10" />
                <rect x={140 + c * 110} y={156 + r * 80} width="40" height="16" rx="2" className="fill-background-secondary stroke-border" strokeWidth="1" />
              </g>
            )),
          )}
          <path d="M160 140 H490 M160 220 H490 M160 300 H490 M160 140 V300 M270 140 V300 M380 140 V300 M490 140 V300" opacity="0.35" />
        </g>
      );
    default:
      return (
        <g className="text-current" stroke="currentColor" fill="none">
          <WindowChrome title="Project" />
          <circle cx="280" cy="220" r="70" />
          <circle cx="420" cy="220" r="40" />
          <path d="M350 220 H380" />
        </g>
      );
  }
}
