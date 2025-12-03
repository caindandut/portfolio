"use client"

import { useRef, useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useInView } from "@/hooks/use-in-view"

const techCategories = [
  {
    title: "Languages",
    emoji: "💬",
    items: [
      {
        name: "JavaScript",
        icon: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/javascript-colored.svg",
      },
      {
        name: "Python",
        icon: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/python-colored.svg",
      },
      {
        name: "C++",
        icon: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/cplusplus-colored.svg",
      },
      {
        name: "Java",
        icon: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/java-colored.svg",
      },
      {
        name: "PHP",
        icon: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/php-colored.svg",
      },
    ],
  },
  {
    title: "Frontend Frameworks & UI Libraries",
    emoji: "🎨",
    items: [
      {
        name: "HTML5",
        icon: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/html5-colored.svg",
      },
      {
        name: "CSS3",
        icon: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/css3-colored.svg",
      },
      {
        name: "React",
        icon: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/react-colored.svg",
      },
      {
        name: "TailwindCSS",
        icon: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/tailwindcss-colored.svg",
      },
      { name: "Shadcn UI", icon: "https://avatars.githubusercontent.com/u/139895814?s=200&v=4" },
      {
        name: "Bootstrap",
        icon: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/bootstrap-colored.svg",
      },
      {
        name: "Vite",
        icon: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/vite-colored.svg",
      },
    ],
  },
  {
    title: "Backend Frameworks",
    emoji: "⚙️",
    items: [
      {
        name: "NodeJS",
        icon: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/nodejs-colored.svg",
      },
      {
        name: "Express",
        icon: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/express-colored-dark.svg",
      },
    ],
  },
  {
    title: "Database & Tools",
    emoji: "🗄️",
    items: [
      {
        name: "MySQL",
        icon: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/mysql-colored.svg",
      },
      {
        name: "MongoDB",
        icon: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/mongodb-colored.svg",
      },
      {
        name: "Docker",
        icon: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/docker-colored.svg",
      },
      {
        name: "Git",
        icon: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/git-colored.svg",
      },
      {
        name: "VS Code",
        icon: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/visualstudiocode-colored.svg",
      },
    ],
  },
]

export default function TechSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { threshold: 0.1 })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <section id="tech" ref={sectionRef} className="relative py-20 md:py-32 px-4 bg-secondary/20 overflow-hidden">
      {/* Simple particle-like background (giữ lại chấm tròn nhẹ, không dùng quả địa cầu 3D) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[5%] left-[15%] w-2 h-2 bg-primary rounded-full animate-float opacity-40" />
        <div className="absolute top-1/4 right-[10%] w-3 h-3 bg-cyan-400 rounded-full animate-float-slow opacity-30" />
        <div className="absolute bottom-1/3 left-[8%] w-1.5 h-1.5 bg-primary rounded-full animate-ping opacity-50" />
        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-cyan-300 rounded-full animate-float opacity-40" />
        <div className="absolute bottom-[10%] left-1/3 w-1 h-1 bg-white rounded-full animate-ping delay-500 opacity-60" />
        <div className="absolute top-[15%] right-1/3 w-1.5 h-1.5 bg-primary rounded-full animate-float-slow delay-200 opacity-50" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-12 md:mb-16 transition-all duration-700 ease-out ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="gradient-text">Tech Stack</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base px-4" />
          <div className="w-20 md:w-24 h-1 bg-gradient-to-r from-primary to-cyan-400 mx-auto rounded-full mt-4" />
        </div>

        {/* Tech Categories */}
        <div className="grid gap-6 md:gap-8">
          {techCategories.map((category, categoryIndex) => {
            // Alternate slide direction for visual interest
            const slideDirection = categoryIndex % 2 === 0 ? "-translate-x-10" : "translate-x-10"
            const slideDirectionActive = "translate-x-0"
            
            return (
            <Card
              key={category.title}
              className={`glass-card border-border/50 hover:border-primary/30 transition-all duration-700 ease-out hover:shadow-lg hover:shadow-primary/5 ${
                isInView ? `opacity-100 ${slideDirectionActive}` : `opacity-0 ${slideDirection}`
              }`}
              style={{ transitionDelay: `${categoryIndex * 150}ms` }}
            >
              <CardHeader className="pb-2 md:pb-4">
                <CardTitle className="text-lg sm:text-xl md:text-2xl font-semibold flex items-center gap-2 md:gap-3">
                  <span className="text-xl md:text-2xl">{category.emoji}</span>
                  <span className="break-words">{category.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
                  {category.items.map((item, itemIndex) => (
                    <div
                      key={item.name}
                      className={`group flex flex-col items-center gap-1 sm:gap-2 p-2 sm:p-3 md:p-4 rounded-lg md:rounded-xl bg-background/50 hover:bg-primary/10 border border-border/50 hover:border-primary/50 transition-all duration-500 ease-out cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-primary/10 ${
                        isInView ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
                      }`}
                      style={{
                        transitionDelay: `${categoryIndex * 150 + itemIndex * 50}ms`,
                      }}
                    >
                      <div className="relative">
                        <img
                          src={item.icon || "/placeholder.svg"}
                          alt={item.name}
                          width={40}
                          height={40}
                          className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 transition-transform duration-300 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <span className="text-xs sm:text-sm text-muted-foreground group-hover:text-foreground transition-colors text-center">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
