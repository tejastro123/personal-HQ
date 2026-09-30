import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

function OrbitingCore() {
  const group = useRef<THREE.Group>(null);
  const satellite = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = t * 0.18;
      group.current.rotation.x = Math.sin(t * 0.25) * 0.12;
    }
    if (satellite.current) {
      const a = t * 0.7;
      satellite.current.position.set(Math.cos(a) * 2.4, Math.sin(a * 0.8) * 0.55, Math.sin(a) * 2.4);
      satellite.current.rotation.y = t * 1.2;
    }
    if (ring.current) {
      ring.current.rotation.z = t * 0.15;
      ring.current.rotation.x = Math.PI / 2.6 + Math.sin(t * 0.2) * 0.08;
    }
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[0.85, 1]} />
        <meshStandardMaterial
          color="#4c8dff"
          emissive="#1a3a8a"
          emissiveIntensity={0.45}
          metalness={0.55}
          roughness={0.35}
          wireframe
        />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.42, 0]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#0e7490"
          emissiveIntensity={0.55}
          metalness={0.4}
          roughness={0.3}
        />
      </mesh>
      <mesh ref={ring}>
        <torusGeometry args={[1.55, 0.025, 12, 64]} />
        <meshStandardMaterial
          color="#fbbf24"
          emissive="#b45309"
          emissiveIntensity={0.4}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
      <mesh ref={satellite}>
        <boxGeometry args={[0.18, 0.12, 0.28]} />
        <meshStandardMaterial color="#e5e7eb" metalness={0.7} roughness={0.25} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[2.1, 24, 24]} />
        <meshBasicMaterial color="#4c8dff" transparent opacity={0.04} side={THREE.BackSide} />
      </mesh>
      <pointLight position={[2, 2, 2]} intensity={1.4} color="#4c8dff" />
      <pointLight position={[-2, -1, -2]} intensity={0.6} color="#22d3ee" />
    </group>
  );
}

function Scene() {
  const stars = useMemo(() => {
    const count = 80;
    return Array.from({ length: count }, (_, i) => {
      const a = (i / count) * Math.PI * 2;
      const r = 3.2 + (i % 5) * 0.35;
      return {
        pos: [Math.cos(a) * r, Math.sin(a * 1.7) * 1.4, Math.sin(a) * r] as [number, number, number],
        size: 0.02 + (i % 3) * 0.01,
      };
    });
  }, []);

  return (
    <>
      <ambientLight intensity={0.35} />
      <OrbitingCore />
      {stars.map((s, i) => (
        <mesh key={i} position={s.pos}>
          <sphereGeometry args={[s.size, 6, 6]} />
          <meshBasicMaterial color={i % 4 === 0 ? "#fbbf24" : "#94c5ff"} transparent opacity={0.7} />
        </mesh>
      ))}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.4}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.7}
      />
    </>
  );
}

export default function HeroWebGL() {
  return (
    <div className="hero-webgl" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.6, 4.2], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
