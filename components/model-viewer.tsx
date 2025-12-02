"use client"

import { Canvas } from "@react-three/fiber"
import { useGLTF, Float } from "@react-three/drei"

function DuckModel() {
  const { scene } = useGLTF("/assets/3d/duck.glb")

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <primitive object={scene} scale={2} />
    </Float>
  )
}

function LoadingSpinner() {
  return (
    <mesh>
      <torusGeometry args={[0.5, 0.1, 16, 32]} />
      <meshBasicMaterial color="#00BFFF" wireframe />
    </mesh>
  )
}

export default function ModelViewer() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5], fov: 50 }}
     \
