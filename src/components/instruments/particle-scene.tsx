import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import type { Particle, ParticleConfig } from "@/lib/particles";
import { stepParticles } from "@/lib/particles";

const MAX_COUNT = 400;

function ParticlePoints({
  particlesRef,
  running,
  config,
  onFps,
}: {
  particlesRef: React.MutableRefObject<Particle[]>;
  running: boolean;
  config: ParticleConfig;
  onFps: (n: number) => void;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const geoRef = useRef<THREE.BufferGeometry>(null);
  const positions = useMemo(() => new Float32Array(MAX_COUNT * 3), []);
  const fpsRef = useRef({ frames: 0, last: 0 });

  useFrame((state, delta) => {
    const particles = particlesRef.current;
    const geo = geoRef.current;
    if (!geo || !particles.length) return;

    if (running) {
      const acc = Math.min(40, delta * 1000);
      let steps = Math.floor(acc / 16);
      if (steps < 1) steps = 1;
      for (let s = 0; s < steps; s++) stepParticles(particles, config);
    }

    const n = Math.min(particles.length, MAX_COUNT);
    for (let i = 0; i < n; i++) {
      const p = particles[i]!;
      positions[i * 3] = p.x * 0.55;
      positions[i * 3 + 1] = p.y * 0.55;
      positions[i * 3 + 2] = p.z * 0.55;
    }
    geo.attributes.position.needsUpdate = true;
    if (pointsRef.current) pointsRef.current.geometry.setDrawRange(0, n);

    const fps = fpsRef.current;
    fps.frames += 1;
    const now = state.clock.elapsedTime;
    if (now - fps.last >= 0.5) {
      onFps(Math.round(fps.frames / (now - fps.last)));
      fps.frames = 0;
      fps.last = now;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry ref={geoRef}>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.18}
        color="#6aa8ff"
        transparent
        opacity={0.95}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

function CentralMass() {
  return (
    <mesh>
      <sphereGeometry args={[0.28, 24, 24]} />
      <meshStandardMaterial color="#fbbf24" emissive="#b45309" emissiveIntensity={0.7} />
    </mesh>
  );
}

export default function ParticleScene({
  particlesRef,
  running,
  config,
  onFps,
}: {
  particlesRef: React.MutableRefObject<Particle[]>;
  running: boolean;
  config: ParticleConfig;
  onFps: (n: number) => void;
}) {
  return (
    <Canvas
      camera={{ position: [0, 4, 10], fov: 50 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: false }}
    >
      <color attach="background" args={["#08080b"]} />
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 6, 4]} intensity={1.2} color="#4c8dff" />
      <pointLight position={[-4, -2, -3]} intensity={0.4} color="#22d3ee" />
      <CentralMass />
      <ParticlePoints
        particlesRef={particlesRef}
        running={running}
        config={config}
        onFps={onFps}
      />
      <gridHelper args={[20, 20, "#1c1c22", "#14141a"]} position={[0, -3, 0]} />
    </Canvas>
  );
}
