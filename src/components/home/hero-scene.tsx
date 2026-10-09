import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import { useReducedMotion } from "motion/react";

const ACCENT = "#4c8dff";
const ACCENT2 = "#22d3ee";
const WARM = "#fbbf24";
const VIOLET = "#a78bfa";

function makeGlowTexture(inner: string, outer: string) {
  const size = 256;
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, inner);
  g.addColorStop(0.35, outer);
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function PointerRig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const { size } = useThree();
  const reduce = useReducedMotion();
  const mobile = size.width < 900;

  useFrame((state) => {
    if (!group.current || reduce) return;
    const t = state.clock.elapsedTime;
    const px = state.pointer.x;
    const py = state.pointer.y;
    const mobileScale = mobile ? 0.72 : 1;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, px * 0.42, 0.045);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -py * 0.28, 0.045);
    group.current.position.y = Math.sin(t * 0.35) * 0.1;
    group.current.position.x = THREE.MathUtils.lerp(
      group.current.position.x,
      (mobile ? 0 : 0.9) + px * 0.12,
      0.03,
    );
    group.current.scale.setScalar(mobileScale);
  });

  return <group ref={group}>{children}</group>;
}

function CameraRig() {
  const { camera } = useThree();
  const reduce = useReducedMotion();
  const base = useMemo(() => new THREE.Vector3(0, 0.18, 6.4), []);

  useFrame((state) => {
    if (reduce) return;
    const t = state.clock.elapsedTime;
    const px = state.pointer.x;
    const py = state.pointer.y;
    const breathe = Math.sin(t * 0.22) * 0.12;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, base.x + px * 0.35, 0.03);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, base.y - py * 0.2 + breathe * 0.15, 0.03);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, base.z + Math.sin(t * 0.18) * 0.25, 0.03);
    camera.lookAt(0.35, 0, 0);
  });

  return null;
}

function GlowSprite({
  color,
  size = 2.2,
  opacity = 0.55,
  position = [0, 0, 0],
}: {
  color: string;
  size?: number;
  opacity?: number;
  position?: [number, number, number];
}) {
  const map = useMemo(() => makeGlowTexture(color, `${color}66`), [color]);
  return (
    <sprite position={position} scale={[size, size, 1]}>
      <spriteMaterial map={map} transparent opacity={opacity} depthWrite={false} blending={THREE.AdditiveBlending} />
    </sprite>
  );
}

function NebulaDust({ count = 900, radius = 4.2, colorA = ACCENT, colorB = VIOLET, yFlat = 0.9 }) {
  const ref = useRef<THREE.Points>(null);
  const reduce = useReducedMotion();

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const c1 = new THREE.Color(colorA);
    const c2 = new THREE.Color(colorB);
    const c3 = new THREE.Color(ACCENT2);

    for (let i = 0; i < count; i++) {
      const r = Math.pow(Math.random(), 0.5) * radius;
      const a = Math.random() * Math.PI * 2;
      positions[i * 3] = Math.cos(a) * r;
      positions[i * 3 + 1] = (Math.random() - 0.5) * yFlat * Math.exp(-r * 0.12);
      positions[i * 3 + 2] = Math.sin(a) * r * 0.75;
      const mix = Math.random();
      const col = mix < 0.45 ? c1 : mix < 0.8 ? c2 : c3;
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }
    return { positions, colors };
  }, [count, radius, colorA, colorB, yFlat]);

  useFrame((state) => {
    if (!ref.current || reduce) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.03;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.06) * 0.08;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.022}
        vertexColors
        transparent
        opacity={0.75}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

function GalaxySpiral({ count = 1400 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const reduce = useReducedMotion();

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const c1 = new THREE.Color(ACCENT);
    const c2 = new THREE.Color(ACCENT2);
    const c3 = new THREE.Color(WARM);

    for (let i = 0; i < count; i++) {
      const arm = i % 3;
      const r = Math.pow(Math.random(), 0.55) * 3.8;
      const spin = r * 1.45;
      const angle = spin + (arm * Math.PI * 2) / 3 + (Math.random() - 0.5) * 0.42;
      const spread = (Math.random() - 0.5) * 0.52 * (1 - r / 4.4);
      positions[i * 3] = Math.cos(angle) * r + spread - 0.6;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.65 * Math.exp(-r * 0.2);
      positions[i * 3 + 2] = Math.sin(angle) * r * 0.7 + spread * 0.5;
      const mix = Math.random();
      const col = mix < 0.5 ? c1 : mix < 0.85 ? c2 : c3;
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }
    return { positions, colors };
  }, [count]);

  useFrame((state) => {
    if (!ref.current || reduce) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.048;
    ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.07) * 0.09;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.9}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

function EnergyPulseRings() {
  const group = useRef<THREE.Group>(null);
  const reduce = useReducedMotion();
  const rings = useMemo(
    () =>
      Array.from({ length: 4 }, (_, i) => ({
        offset: i / 4,
        color: i % 2 === 0 ? ACCENT : ACCENT2,
      })),
    [],
  );

  useFrame((state) => {
    if (!group.current || reduce) return;
    const t = state.clock.elapsedTime;
    group.current.children.forEach((child, i) => {
      const phase = (t * 0.28 + rings[i].offset) % 1;
      const s = 0.6 + phase * 1.8;
      child.scale.setScalar(s);
      const mat = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
      mat.opacity = Math.max(0, 0.35 * (1 - phase));
      child.rotation.z = t * 0.15 + i;
    });
  });

  return (
    <group ref={group} position={[1.25, 0.12, -0.3]}>
      {rings.map((r, i) => (
        <mesh key={i} rotation={[Math.PI / 2.6, 0, i * 0.4]}>
          <torusGeometry args={[1, 0.008, 8, 80]} />
          <meshBasicMaterial color={r.color} transparent opacity={0.3} depthWrite={false} blending={THREE.AdditiveBlending} />
        </mesh>
      ))}
    </group>
  );
}

function OrbitingCore() {
  const core = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);
  const shell = useRef<THREE.Mesh>(null);
  const lattice = useRef<THREE.Mesh>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const ringC = useRef<THREE.Mesh>(null);
  const ringD = useRef<THREE.Mesh>(null);
  const sat1 = useRef<THREE.Mesh>(null);
  const sat2 = useRef<THREE.Mesh>(null);
  const sat3 = useRef<THREE.Mesh>(null);
  const reduce = useReducedMotion();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (reduce) return;
    if (core.current) {
      core.current.rotation.x = t * 0.28;
      core.current.rotation.y = t * 0.42;
    }
    if (inner.current) {
      inner.current.rotation.x = -t * 0.55;
      inner.current.rotation.z = t * 0.35;
    }
    if (shell.current) {
      shell.current.rotation.y = -t * 0.14;
      shell.current.rotation.z = t * 0.1;
      const pulse = 1 + Math.sin(t * 1.35) * 0.035;
      shell.current.scale.setScalar(pulse);
    }
    if (lattice.current) {
      lattice.current.rotation.y = t * 0.08;
      lattice.current.rotation.x = Math.sin(t * 0.2) * 0.12;
    }
    if (ringA.current) ringA.current.rotation.z = t * 0.38;
    if (ringB.current) {
      ringB.current.rotation.x = Math.PI / 2.4 + Math.sin(t * 0.28) * 0.16;
      ringB.current.rotation.y = t * 0.24;
    }
    if (ringC.current) {
      ringC.current.rotation.x = Math.PI / 1.75;
      ringC.current.rotation.z = -t * 0.2;
    }
    if (ringD.current) {
      ringD.current.rotation.x = Math.PI / 3.1 + Math.sin(t * 0.15) * 0.2;
      ringD.current.rotation.y = t * 0.12;
    }
    if (sat1.current) {
      const a = t * 0.75;
      sat1.current.position.set(Math.cos(a) * 1.65, Math.sin(a * 1.35) * 0.4, Math.sin(a) * 1.65);
    }
    if (sat2.current) {
      const a = -t * 0.58 + 1.2;
      sat2.current.position.set(Math.cos(a) * 2.15, Math.sin(a) * 0.55, Math.sin(a) * 2.15);
    }
    if (sat3.current) {
      const a = t * 0.42 + 2.4;
      sat3.current.position.set(Math.cos(a) * 2.7, Math.sin(a * 0.8) * 0.75, Math.sin(a) * 1.9);
    }
  });

  return (
    <group position={[1.25, 0.12, 0]}>
      <GlowSprite color={ACCENT} size={3.4} opacity={0.5} position={[0, 0, -0.4]} />
      <GlowSprite color={ACCENT2} size={1.6} opacity={0.35} position={[0, 0, 0.2]} />
      <mesh ref={core}>
        <icosahedronGeometry args={[0.44, 2]} />
        <meshStandardMaterial
          color={ACCENT}
          emissive={ACCENT}
          emissiveIntensity={0.75}
          metalness={0.75}
          roughness={0.22}
        />
      </mesh>
      <mesh ref={inner}>
        <octahedronGeometry args={[0.22, 0]} />
        <meshStandardMaterial color="#ffffff" emissive={ACCENT2} emissiveIntensity={1.4} metalness={0.4} roughness={0.2} />
      </mesh>
      <mesh ref={shell}>
        <icosahedronGeometry args={[0.74, 1]} />
        <meshBasicMaterial color={ACCENT2} wireframe transparent opacity={0.32} />
      </mesh>
      <mesh ref={lattice}>
        <torusKnotGeometry args={[0.95, 0.008, 120, 12, 2, 3]} />
        <meshBasicMaterial color={VIOLET} transparent opacity={0.22} />
      </mesh>
      <mesh ref={ringA}>
        <torusGeometry args={[1.08, 0.014, 12, 96]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.65} />
      </mesh>
      <mesh ref={ringB}>
        <torusGeometry args={[1.4, 0.011, 12, 96]} />
        <meshBasicMaterial color={ACCENT2} transparent opacity={0.48} />
      </mesh>
      <mesh ref={ringC}>
        <torusGeometry args={[1.72, 0.009, 10, 100]} />
        <meshBasicMaterial color={WARM} transparent opacity={0.32} />
      </mesh>
      <mesh ref={ringD}>
        <torusGeometry args={[2.05, 0.006, 8, 100]} />
        <meshBasicMaterial color={VIOLET} transparent opacity={0.22} />
      </mesh>
      <mesh ref={sat1}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color={WARM} emissive={WARM} emissiveIntensity={1.1} />
      </mesh>
      <mesh ref={sat2}>
        <octahedronGeometry args={[0.06, 0]} />
        <meshStandardMaterial color={ACCENT2} emissive={ACCENT2} emissiveIntensity={0.9} metalness={0.55} roughness={0.28} />
      </mesh>
      <mesh ref={sat3}>
        <tetrahedronGeometry args={[0.07, 0]} />
        <meshStandardMaterial color={VIOLET} emissive={VIOLET} emissiveIntensity={0.7} metalness={0.4} roughness={0.35} />
      </mesh>
      <pointLight color={ACCENT} intensity={3.2} distance={7} />
      <pointLight color={ACCENT2} intensity={2.2} distance={9} position={[-1.8, 1.2, 1.2]} />
      <pointLight color={WARM} intensity={1.6} distance={8} position={[1.2, -1.4, -1]} />
      <pointLight color={VIOLET} intensity={1.2} distance={6} position={[2.4, 0.6, -0.5]} />
    </group>
  );
}

function CosmicRingSystem() {
  const group = useRef<THREE.Group>(null);
  const reduce = useReducedMotion();

  useFrame((state) => {
    if (!group.current || reduce) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.z = t * 0.04;
    group.current.rotation.x = Math.PI / 2.2 + Math.sin(t * 0.1) * 0.08;
  });

  return (
    <group ref={group} position={[1.1, 0.05, -1.2]}>
      {[1.9, 2.45, 3.05].map((r, i) => (
        <mesh key={r}>
          <torusGeometry args={[r, 0.004 + i * 0.001, 8, 120]} />
          <meshBasicMaterial
            color={i === 1 ? ACCENT2 : ACCENT}
            transparent
            opacity={0.12 + i * 0.03}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

function HorizonGrid() {
  const grid = useRef<THREE.GridHelper>(null);
  const reduce = useReducedMotion();

  useFrame((state) => {
    if (!grid.current || reduce) return;
    grid.current.position.z = (state.clock.elapsedTime * 0.18) % 1.2;
  });

  return (
    <group position={[0.6, -1.85, 0]}>
      <gridHelper
        ref={grid}
        args={[18, 24, ACCENT, ACCENT2]}
        rotation={[0, 0, 0]}
      />
    </group>
  );
}

function FloatingShards({ count = 16 }: { count?: number }) {
  const group = useRef<THREE.Group>(null);
  const reduce = useReducedMotion();
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        pos: [
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 3.6,
          (Math.random() - 0.5) * 3.4 - 0.4,
        ] as [number, number, number],
        rot: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number],
        scale: 0.035 + Math.random() * 0.08,
        speed: 0.18 + Math.random() * 0.5,
        phase: Math.random() * Math.PI * 2,
        tone: i % 5,
      })),
    [count],
  );

  useFrame((state) => {
    if (!group.current || reduce) return;
    const t = state.clock.elapsedTime;
    group.current.children.forEach((child, i) => {
      const item = items[i];
      if (!item) return;
      child.position.y = item.pos[1] + Math.sin(t * item.speed + item.phase) * 0.22;
      child.rotation.x = item.rot[0] + t * item.speed * 0.45;
      child.rotation.y = item.rot[1] + t * item.speed * 0.6;
    });
  });

  return (
    <group ref={group}>
      {items.map((item, i) => (
        <mesh key={i} position={item.pos} rotation={item.rot} scale={item.scale}>
          {i % 3 === 0 ? (
            <octahedronGeometry args={[1, 0]} />
          ) : i % 3 === 1 ? (
            <tetrahedronGeometry args={[1, 0]} />
          ) : (
            <icosahedronGeometry args={[1, 0]} />
          )}
          <meshStandardMaterial
            color={item.tone === 0 ? WARM : item.tone === 1 ? VIOLET : i % 2 === 0 ? ACCENT : ACCENT2}
            emissive={item.tone === 0 ? WARM : item.tone === 1 ? VIOLET : i % 2 === 0 ? ACCENT : ACCENT2}
            emissiveIntensity={0.45}
            metalness={0.7}
            roughness={0.3}
            transparent
            opacity={0.92}
          />
        </mesh>
      ))}
    </group>
  );
}

function SceneContents() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <hemisphereLight args={[ACCENT2, "#050510", 0.55]} />
      <CameraRig />
      <PointerRig>
        <NebulaDust />
        <GalaxySpiral />
        <OrbitingCore />
        <EnergyPulseRings />
        <CosmicRingSystem />
        <FloatingShards />
        <HorizonGrid />
      </PointerRig>
    </>
  );
}

export function HeroScene() {
  const reduce = useReducedMotion();
  if (reduce) return null;

  return (
    <div className="hero-webgl" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.18, 6.4], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ width: "100%", height: "100%" }}
      >
        <Suspense fallback={null}>
          <SceneContents />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default HeroScene;
