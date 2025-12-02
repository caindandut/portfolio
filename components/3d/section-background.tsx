"use client"

import { useRef, useMemo } from "react"
import { useFrame, Canvas } from "@react-three/fiber"
import { Float } from "@react-three/drei"
import type * as THREE from "three"
import { Suspense } from "react"

function FloatingCubes() {
  const cubesRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (cubesRef.current) {
      cubesRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  const cubes = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      position: [(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 6] as [
        number,
        number,
        number,
      ],
      scale: 0.2 + Math.random() * 0.3,
      rotationSpeed: 0.5 + Math.random() * 1,
    }))
  }, [])

  return (
    <group ref={cubesRef}>
      {cubes.map((cube, i) => (
        <Float key={i} speed={1.5} rotationIntensity={cube.rotationSpeed} floatIntensity={0.5}>
          <mesh position={cube.position} scale={cube.scale}>
            <octahedronGeometry args={[1, 0]} />
            <meshBasicMaterial color="#00BFFF" wireframe transparent opacity={0.3} />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

function GridPlane() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
      <planeGeometry args={[30, 30, 20, 20]} />
      <meshBasicMaterial color="#00BFFF" wireframe transparent opacity={0.1} />
    </mesh>
  )
}

function ParticleWave() {
  const particlesCount = 100
  const particlesRef = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3)
    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return positions
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      const positionsArray = particlesRef.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < particlesCount; i++) {
        positionsArray[i * 3 + 1] =
          Math.sin(state.clock.elapsedTime + positionsArray[i * 3] * 0.5) * 0.5 + (positions[i * 3 + 1] || 0)
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particlesCount} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.1} color="#00d4ff" transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

interface SectionBackgroundProps {
  variant?: "cubes" | "grid" | "particles"
}

export default function SectionBackground({ variant = "cubes" }: SectionBackgroundProps) {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-50">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }} dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          {variant === "cubes" && <FloatingCubes />}
          {variant === "grid" && <GridPlane />}
          {variant === "particles" && <ParticleWave />}
          <FloatingCubes />
          <ParticleWave />
        </Suspense>
      </Canvas>
    </div>
  )
}
