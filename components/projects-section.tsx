"use client"

import { useState, useRef, Suspense } from "react"
import { ExternalLink, Github, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useInView } from "@/hooks/use-in-view"
import ProjectCard from "@/components/project-card"
import ModelViewer from "@/components/model-viewer"

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce application with product management, shopping cart, user authentication, and payment integration.",
    tags: ["React", "Node.js", "MySQL", "TailwindCSS"],
    image: "/ecommerce-dashboard-with-products.jpg",
    github: "https://github.com/caindandut",
    demo: "#",
    has3D: true,
  },
  {
    id: 2,
    title: "Task Management App",
    description:
      "A collaborative task management application with real-time updates, drag-and-drop functionality, and team workspaces.",
    tags: ["React", "Express", "MongoDB", "Socket.io"],
    image: "/task-management-kanban.png",
    github: "https://github.com/caindandut",
    demo: "#",
    has3D: true,
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description:
      "A beautiful weather application showing real-time weather data, forecasts, and interactive maps with location search.",
    tags: ["React", "API Integration", "Charts", "Geolocation"],
    image: "/weather-dashboard.png",
    github: "https://github.com/caindandut",
    demo: "#",
    has3D: false,
  },
]

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { threshold: 0.1 })

  return (
    <section id="projects" ref={sectionRef} className="relative py-20 md:py-32 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">💼 Featured Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A selection of my recent work showcasing various skills and technologies
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-cyan-400 mx-auto rounded-full mt-4" />
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isInView={isInView}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <Card
            className="w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-card border-primary/20"
            onClick={(e) => e.stopPropagation()}
          >
            <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <CardTitle id="modal-title" className="text-2xl gradient-text">
                  {selectedProject.title}
                </CardTitle>
                <div className="flex flex-wrap gap-2 mt-3">
                  {selectedProject.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setSelectedProject(null)} aria-label="Close modal">
                <X className="h-5 w-5" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 3D Model Viewer */}
              {selectedProject.has3D && (
                <div className="h-64 md:h-80 rounded-lg overflow-hidden bg-muted/50">
                  <Suspense
                    fallback={
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                      </div>
                    }
                  >
                    <ModelViewer />
                  </Suspense>
                </div>
              )}

              <p className="text-muted-foreground leading-relaxed">{selectedProject.description}</p>

              <div className="flex gap-4">
                <Button asChild className="flex-1 bg-primary hover:bg-primary/90">
                  <a href={selectedProject.demo} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="flex-1 border-primary text-primary hover:bg-primary/10 bg-transparent"
                >
                  <a href={selectedProject.github} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    Source Code
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </section>
  )
}
