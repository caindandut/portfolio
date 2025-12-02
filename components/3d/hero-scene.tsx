"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { Float, Icosahedron, MeshDistortMaterial } from "@react-three/drei"
import type * as THREE from "three"

interface HeroSceneProps {
  mousePosition: { x: number; y: number }
}

function FloatingGeometry({ mousePosition }: HeroSceneProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.003
      meshRef.current.rotation.y += 0.005
    }
    if (groupRef.current) {
      groupRef.current.rotation.y = mousePosition.x * 2
      groupRef.current.rotation.x = mousePosition.y * 2
    }
  })

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Icosahedron ref={meshRef} args={[1.5, 1]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#00BFFF"
            roughness={0.1}
            metalness={0.8}
            distort={0.3}
            speed={2}
            transparent
            opacity={0.8}
          />
        </Icosahedron>
      </Float>
    </group>
  )
}

function ParticleField() {
  const particlesCount = 200
  const particlesRef = useRef<THREE.Points>(null)

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3)
    const colors = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15

      // Cyan to blue color range
      colors[i * 3] = 0
      colors[i * 3 + 1] = 0.5 + Math.random() * 0.5
      colors[i * 3 + 2] = 0.8 + Math.random() * 0.2
    }

    return [positions, colors]
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particlesCount} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={particlesCount} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.05} vertexColors transparent opacity={0.8} sizeAttenuation />
    </points>
  )
}

function OrbitingRings() {
  const ring1Ref = useRef<THREE.Mesh>(null)
  const ring2Ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = state.clock.elapsedTime * 0.3
      ring1Ref.current.rotation.z = state.clock.elapsedTime * 0.2
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = -state.clock.elapsedTime * 0.2
      ring2Ref.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <>
      <mesh ref={ring1Ref} position={[0, 0, 0]}>
        <torusGeometry args={[2.5, 0.02, 16, 100]} />
        <meshBasicMaterial color="#00BFFF" transparent opacity={0.4} />
      </mesh>
      <mesh ref={ring2Ref} position={[0, 0, 0]} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.8, 0.015, 16, 100]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.3} />
      </mesh>
    </>
  )
}

export default function HeroScene({ mousePosition }: HeroSceneProps) {
  return (
    <group>
      <FloatingGeometry mousePosition={mousePosition} />
      <ParticleField />
      <OrbitingRings />
    </group>
  )
}
