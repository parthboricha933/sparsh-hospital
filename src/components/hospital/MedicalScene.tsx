'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, Torus, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

/* ──────────────────────────────────────────────
   Rotating DNA Double Helix
   ────────────────────────────────────────────── */
function DNAHelix() {
  const groupRef = useRef<THREE.Group>(null);
  const sphereCount = 24;

  const positions = useMemo(() => {
    const pos: { x: number; y: number; z: number; strand: number }[] = [];
    for (let i = 0; i < sphereCount; i++) {
      const t = (i / sphereCount) * Math.PI * 4;
      const y = (i / sphereCount) * 10 - 5;
      pos.push({ x: Math.cos(t) * 1.2, y, z: Math.sin(t) * 1.2, strand: 0 });
      pos.push({ x: Math.cos(t + Math.PI) * 1.2, y, z: Math.sin(t + Math.PI) * 1.2, strand: 1 });
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.12;
    }
  });

  return (
    <group ref={groupRef} position={[-6.5, 0, -3]} scale={0.55}>
      {positions.map((pos, i) => (
        <mesh key={i} position={[pos.x, pos.y, pos.z]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial
            color={pos.strand === 0 ? '#0066FF' : '#00D4FF'}
            emissive={pos.strand === 0 ? '#0066FF' : '#00D4FF'}
            emissiveIntensity={0.6}
            transparent
            opacity={0.85}
          />
        </mesh>
      ))}
      {positions
        .filter((_, i) => i % 2 === 0 && i < positions.length - 1)
        .map((pos, i) => {
          const paired = positions[i * 2 + 1];
          if (!paired) return null;
          const midX = (pos.x + paired.x) / 2;
          const midZ = (pos.z + paired.z) / 2;
          return (
            <mesh key={`link-${i}`} position={[midX, pos.y, midZ]}>
              <cylinderGeometry args={[0.015, 0.015, Math.abs(pos.x - paired.x), 4]} />
              <meshStandardMaterial
                color="#00E5FF"
                emissive="#00E5FF"
                emissiveIntensity={0.35}
                transparent
                opacity={0.35}
              />
            </mesh>
          );
        })}
    </group>
  );
}

/* ──────────────────────────────────────────────
   Heartbeat / EKG Wave (3‑D tube)
   ────────────────────────────────────────────── */
function HeartbeatWave() {
  const groupRef = useRef<THREE.Group>(null);

  const curve = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const segments = 200;
    for (let i = 0; i <= segments; i++) {
      const t = (i / segments) * Math.PI * 6;
      const x = (i / segments) * 16 - 8;
      let y = 0;
      // Create the classic ECG pattern repeating
      const phase = t % (Math.PI * 2);
      if (phase > 1.8 && phase < 2.1) {
        y = 0.15 * Math.sin((phase - 1.8) * Math.PI / 0.3);
      } else if (phase > 2.4 && phase < 2.7) {
        y = -0.1 * Math.sin((phase - 2.4) * Math.PI / 0.3);
      } else if (phase > 2.9 && phase < 3.5) {
        y = 1.2 * Math.sin((phase - 2.9) * Math.PI / 0.6);
      } else if (phase > 3.5 && phase < 3.8) {
        y = -0.25 * Math.sin((phase - 3.5) * Math.PI / 0.3);
      } else if (phase > 4.8 && phase < 5.2) {
        y = 0.18 * Math.sin((phase - 4.8) * Math.PI / 0.4);
      }
      pts.push(new THREE.Vector3(x, y, 0));
    }
    return new THREE.CatmullRomCurve3(pts);
  }, []);

  const tubeGeometry = useMemo(() => {
    return new THREE.TubeGeometry(curve, 300, 0.02, 8, false);
  }, [curve]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.5;
    }
  });

  return (
    <group ref={groupRef} position={[0, -3.2, -2]} scale={0.5}>
      <mesh geometry={tubeGeometry}>
        <meshStandardMaterial
          color="#00D4FF"
          emissive="#00D4FF"
          emissiveIntensity={0.8}
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  );
}

/* ──────────────────────────────────────────────
   Floating Medical Cross (Plus Icon)
   ────────────────────────────────────────────── */
function MedicalCross() {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.25;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.4) * 0.1;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.6}>
      <group ref={meshRef} position={[6, 1.5, -4]} scale={0.45}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.5, 2, 0.3]} />
          <meshStandardMaterial
            color="#0066FF"
            emissive="#0066FF"
            emissiveIntensity={0.45}
            transparent
            opacity={0.75}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[0, 0.4, 0]}>
          <boxGeometry args={[1.5, 0.5, 0.3]} />
          <meshStandardMaterial
            color="#0066FF"
            emissive="#0066FF"
            emissiveIntensity={0.45}
            transparent
            opacity={0.75}
            roughness={0.2}
          />
        </mesh>
      </group>
    </Float>
  );
}

/* ──────────────────────────────────────────────
   Holographic Ring
   ────────────────────────────────────────────── */
function HolographicRing({
  position,
  scale: s = 1,
  speed = 1,
}: {
  position: [number, number, number];
  scale?: number;
  speed?: number;
}) {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.x = state.clock.elapsedTime * speed * 0.5;
      ringRef.current.rotation.y = state.clock.elapsedTime * speed * 0.3;
    }
  });

  return (
    <Torus ref={ringRef} args={[1.5 * s, 0.025 * s, 16, 100]} position={position}>
      <meshStandardMaterial
        color="#00D4FF"
        emissive="#00D4FF"
        emissiveIntensity={0.6}
        transparent
        opacity={0.35}
      />
    </Torus>
  );
}

/* ──────────────────────────────────────────────
   Transparent Capsule
   ────────────────────────────────────────────── */
function CapsuleShape() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.18;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.12;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.45) * 0.5 + 0.5;
    }
  });

  return (
    <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.35}>
      <mesh ref={meshRef} position={[4.5, -1.5, -5]} scale={0.38}>
        <capsuleGeometry args={[0.5, 1.5, 8, 16]} />
        <MeshDistortMaterial
          color="#0044CC"
          emissive="#00D4FF"
          emissiveIntensity={0.25}
          transparent
          opacity={0.25}
          distort={0.2}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

/* ──────────────────────────────────────────────
   Glowing Micro‑sphere
   ────────────────────────────────────────────── */
function GlowingSphere({
  position,
  color,
  size = 0.3,
}: {
  position: [number, number, number];
  color: string;
  size?: number;
}) {
  return (
    <Float speed={2} floatIntensity={0.8}>
      <Sphere args={[size, 32, 32]} position={position}>
        <MeshDistortMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.6}
          transparent
          opacity={0.5}
          distort={0.3}
          speed={3}
        />
      </Sphere>
    </Float>
  );
}

/* ──────────────────────────────────────────────
   Holographic Hexagon (flat medical badge shape)
   ────────────────────────────────────────────── */
function HolographicHexagon() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.15;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.35) * 0.3 + 2;
    }
  });

  const shape = useMemo(() => {
    const s = new THREE.Shape();
    const r = 0.8;
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 6;
      const x = r * Math.cos(angle);
      const y = r * Math.sin(angle);
      if (i === 0) s.moveTo(x, y);
      else s.lineTo(x, y);
    }
    s.closePath();
    return s;
  }, []);

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.2}>
      <mesh ref={meshRef} position={[-4.5, 2.5, -5]}>
        <shapeGeometry args={[shape]} />
        <meshStandardMaterial
          color="#00D4FF"
          emissive="#00D4FF"
          emissiveIntensity={0.3}
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>
    </Float>
  );
}

/* ──────────────────────────────────────────────
   Scene Composition
   ────────────────────────────────────────────── */
function Scene() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#0066FF" />
      <pointLight position={[-10, -5, 5]} intensity={0.3} color="#00D4FF" />
      <pointLight position={[0, -4, 3]} intensity={0.15} color="#00E5FF" />

      {/* Primary 3D medical elements */}
      <DNAHelix />
      <HeartbeatWave />
      <MedicalCross />
      <CapsuleShape />

      {/* Holographic rings */}
      <HolographicRing position={[-3.5, 2.5, -6]} scale={0.75} speed={0.7} />
      <HolographicRing position={[3, -2.5, -7]} scale={1.1} speed={0.45} />
      <HolographicRing position={[0.5, 3.5, -5]} scale={0.45} speed={1.1} />

      {/* Holographic hexagon */}
      <HolographicHexagon />

      {/* Ambient glowing spheres */}
      <GlowingSphere position={[-7, -1.5, -4]} color="#0066FF" size={0.2} />
      <GlowingSphere position={[7, 2, -6]} color="#00D4FF" size={0.25} />
      <GlowingSphere position={[-2.5, -3.5, -5]} color="#00E5FF" size={0.18} />
      <GlowingSphere position={[5, -0.5, -8]} color="#0066FF" size={0.22} />
      <GlowingSphere position={[-5.5, 3, -7]} color="#B3E5FC" size={0.15} />
    </>
  );
}

/* ──────────────────────────────────────────────
   Exported Canvas Wrapper
   ────────────────────────────────────────────── */
export default function MedicalScene() {
  return (
    <div className="absolute inset-0 three-canvas-container">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
