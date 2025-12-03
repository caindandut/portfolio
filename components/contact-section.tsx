"use client"

import { useRef, useState, useEffect } from "react"
import { Mail, Github, Send } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useInView } from "@/hooks/use-in-view"

const socialLinks = [
  {
    name: "Gmail",
    icon: Mail,
    href: "mailto:khanhdangabc2@gmail.com",
    color: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
    label: "khanhdangabc2@gmail.com",
  },
  {
    name: "GitHub",
    icon: Github,
    href: "https://github.com/caindandut",
    color: "bg-gray-500/10 text-gray-400 hover:bg-gray-500/20",
    label: "@caindandut",
  },
]

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const isInView = useInView(sectionRef, { threshold: 0.2 })

  return (
    <section id="contact" ref={sectionRef} className="relative py-20 md:py-32 px-4 bg-secondary/20 overflow-hidden">
      {/* Simple particle-like background (không dùng quả cầu 3D, chỉ chấm tròn nhẹ) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[8%] right-[15%] w-2 h-2 bg-primary rounded-full animate-float-slow opacity-40" />
        <div className="absolute top-1/3 left-[8%] w-3 h-3 bg-cyan-400 rounded-full animate-float opacity-30" />
        <div className="absolute bottom-1/4 right-1/4 w-1.5 h-1.5 bg-primary rounded-full animate-ping opacity-50" />
        <div className="absolute top-1/2 left-1/3 w-2 h-2 bg-cyan-300 rounded-full animate-float-slow opacity-40" />
        <div className="absolute bottom-[8%] left-[15%] w-1 h-1 bg-white rounded-full animate-ping delay-300 opacity-60" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-12 md:mb-16 transition-all duration-700 ease-out ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="gradient-text">Connect With Me</span>
          </h2>
          <div className="w-20 md:w-24 h-1 bg-gradient-to-r from-primary to-cyan-400 mx-auto rounded-full mt-4" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {socialLinks.map((link, index) => {
            // Slide from right for first item, left for second item
            const slideDirection = index === 0 ? "translate-x-10" : "-translate-x-10"
            const slideDirectionActive = "translate-x-0"
            
            return (
            <a
              key={link.name}
              href={link.href}
              target={link.name === "GitHub" ? "_blank" : undefined}
              rel={link.name === "GitHub" ? "noopener noreferrer" : undefined}
              className={`group transition-all duration-700 ease-out ${
                isInView ? `opacity-100 ${slideDirectionActive} scale-100` : `opacity-0 ${slideDirection} scale-95`
              }`}
              style={{ transitionDelay: `${index * 150 + 200}ms` }}
            >
              <Card className="glass-card border-border/50 hover:border-primary/50 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-primary/10 group-hover:scale-[1.02]">
                <CardContent className="p-4 md:p-6 flex items-center gap-3 md:gap-4">
                  <div className={`p-3 md:p-4 rounded-xl ${link.color} transition-colors shrink-0`}>
                    <link.icon className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-base md:text-lg group-hover:text-primary transition-colors">
                      {link.name}
                    </h3>
                    <p className="text-muted-foreground text-xs md:text-sm truncate">{link.label}</p>
                  </div>
                  <Send className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
                </CardContent>
              </Card>
            </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
