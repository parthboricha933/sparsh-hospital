'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, Torus, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function DNAHelix() {
  const groupRef = useRef<THREE.Group>(null);
  const sphereCount = 20;

  const positions = useMemo(() => {
    const pos: { x: number; y: number; z: number; strand: number }[] = [];
    for (let i = 0; i < sphereCount; i++) {
      const t = (i / sphereCount) * Math.PI * 4;
      const y = (i / sphereCount) * 8 - 4;
      pos.push({ x: Math.cos(t) * 1.2, y, z: Math.sin(t) * 1.2, strand: 0 });
      pos.push({ x: Math.cos(t + Math.PI) * 1.2, y, z: Math.sin(t + Math.PI) * 1.2, strand: 1 });
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[-5, 0, -2]} scale={0.6}>
      {positions.map((pos, i) => (
        <mesh key={i} position={[pos.x, pos.y, pos.z]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial
            color={pos.strand === 0 ? '#0066FF' : '#00D4FF'}
            emissive={pos.strand === 0 ? '#0066FF' : '#00D4FF'}
            emissiveIntensity={0.5}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
      {/* Connecting lines between strands */}
      {positions
        .filter((_, i) => i % 2 === 0 && i < positions.length - 1)
        .map((pos, i) => {
          const paired = positions[i * 2 + 1];
          if (!paired) return null;
          const midX = (pos.x + paired.x) / 2;
          const midZ = (pos.z + paired.z) / 2;
          return (
            <mesh key={`link-${i}`} position={[midX, pos.y, midZ]}>
              <cylinderGeometry args={[0.02, 0.02, Math.abs(pos.x - paired.x), 4]} />
              <meshStandardMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={0.3} transparent opacity={0.4} />
            </mesh>
          );
        })}
    </group>
  );
}

function MedicalCross() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={meshRef} position={[5, 1, -3]} scale={0.5}>
        {/* Vertical bar */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.5, 2, 0.3]} />
          <meshStandardMaterial
            color="#0066FF"
            emissive="#0066FF"
            emissiveIntensity={0.4}
            transparent
            opacity={0.7}
            roughness={0.2}
          />
        </mesh>
        {/* Horizontal bar */}
        <mesh position={[0, 0.4, 0]}>
          <boxGeometry args={[1.5, 0.5, 0.3]} />
          <meshStandardMaterial
            color="#0066FF"
            emissive="#0066FF"
            emissiveIntensity={0.4}
            transparent
            opacity={0.7}
            roughness={0.2}
          />
        </mesh>
      </group>
    </Float>
  );
}

function HolographicRing({ position, scale: s = 1, speed = 1 }: { position: [number, number, number]; scale?: number; speed?: number }) {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.x = state.clock.elapsedTime * speed * 0.5;
      ringRef.current.rotation.y = state.clock.elapsedTime * speed * 0.3;
    }
  });

  return (
    <Torus ref={ringRef} args={[1.5 * s, 0.03 * s, 16, 100]} position={position}>
      <meshStandardMaterial
        color="#00D4FF"
        emissive="#00D4FF"
        emissiveIntensity={0.6}
        transparent
        opacity={0.4}
      />
    </Torus>
  );
}

function CapsuleShape() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.15;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5 + 0.5;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <mesh ref={meshRef} position={[4, -1, -4]} scale={0.4}>
        <capsuleGeometry args={[0.5, 1.5, 8, 16]} />
        <MeshDistortMaterial
          color="#0044CC"
          emissive="#00D4FF"
          emissiveIntensity={0.2}
          transparent
          opacity={0.3}
          distort={0.2}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

function GlowingSphere({ position, color }: { position: [number, number, number]; color: string }) {
  return (
    <Float speed={2} floatIntensity={0.8}>
      <Sphere args={[0.3, 32, 32]} position={position}>
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

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#0066FF" />
      <pointLight position={[-10, -5, 5]} intensity={0.3} color="#00D4FF" />

      <DNAHelix />
      <MedicalCross />
      <CapsuleShape />
      <HolographicRing position={[-3, 2, -5]} scale={0.8} speed={0.8} />
      <HolographicRing position={[2, -2, -6]} scale={1.2} speed={0.5} />
      <HolographicRing position={[0, 3, -4]} scale={0.5} speed={1.2} />

      <GlowingSphere position={[-6, -1, -3]} color="#0066FF" />
      <GlowingSphere position={[6, 2, -5]} color="#00D4FF" />
      <GlowingSphere position={[-2, -3, -4]} color="#00E5FF" />
    </>
  );
}

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
