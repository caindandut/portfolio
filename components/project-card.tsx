"use client"

import { Suspense, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Float, useGLTF, Environment } from "@react-three/drei"
import { ExternalLink, Github, Maximize2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Project {
  id: number
  title: string
  description: string
  tags: string[]
  image: string
  github: string
  demo: string
  has3D: boolean
}

interface ProjectCardProps {
  project: Project
  index: number
  isInView: boolean
  onClick: () => void
}

function Mini3DModel() {
  const { scene } = useGLTF("/assets/3d/duck.glb")

  return (
    <Float speed={4} rotationIntensity={1} floatIntensity={2}>
      <primitive object={scene} scale={1.5} />
    </Float>
  )
}

function Model3DFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#00BFFF" wireframe />
    </mesh>
  )
}

export default function ProjectCard({ project, index, isInView, onClick }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <Card
      className={`group glass-card border-border/50 hover:border-primary/50 overflow-hidden cursor-pointer transition-all duration-500 ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      aria-label={`View details for ${project.title}`}
    >
      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden">
        {project.has3D && isHovered ? (
          <div className="absolute inset-0 bg-muted">
            <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 4], fov: 50 }}>
              <Suspense fallback={<Model3DFallback />}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <Mini3DModel />
                <Environment preset="studio" />
              </Suspense>
              <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={4} />
            </Canvas>
          </div>
        ) : (
          <>
            {!imageLoaded && <div className="absolute inset-0 bg-muted animate-pulse" />}
            <img
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
            />
          </>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60" />

        {/* 3D Badge */}
        {project.has3D && (
          <Badge className="absolute top-3 right-3 bg-primary/80 text-primary-foreground">3D Preview</Badge>
        )}

        {/* Expand Icon */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="p-2 rounded-full bg-primary/80 text-primary-foreground">
            <Maximize2 className="w-4 h-4" />
          </div>
        </div>
      </div>

      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{project.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs border-border text-muted-foreground">
              {tag}
            </Badge>
          ))}
          {project.tags.length > 3 && (
            <Badge variant="outline" className="text-xs border-border text-muted-foreground">
              +{project.tags.length - 3}
            </Badge>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="ghost"
            className="flex-1 text-muted-foreground hover:text-primary"
            onClick={(e) => {
              e.stopPropagation()
              window.open(project.github, "_blank")
            }}
            aria-label={`View ${project.title} on GitHub`}
          >
            <Github className="w-4 h-4 mr-1" />
            Code
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="flex-1 text-muted-foreground hover:text-primary"
            onClick={(e) => {
              e.stopPropagation()
              window.open(project.demo, "_blank")
            }}
            aria-label={`View ${project.title} live demo`}
          >
            <ExternalLink className="w-4 h-4 mr-1" />
            Demo
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
