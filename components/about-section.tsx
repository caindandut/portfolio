"use client"

import { useRef } from "react"
import { MapPin, GraduationCap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useInView } from "@/hooks/use-in-view"

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const isInView = useInView(sectionRef, { threshold: 0.2 })

  return (
    <section id="about" ref={sectionRef} className="relative py-20 md:py-32 px-4 overflow-hidden">
      {/* Simple particle-like background (không dùng quả cầu 3D, chỉ chấm tròn nhẹ) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-[10%] w-2 h-2 bg-primary rounded-full animate-float-slow opacity-40" />
        <div className="absolute top-1/3 right-[15%] w-3 h-3 bg-cyan-400 rounded-full animate-float opacity-30" />
        <div className="absolute bottom-1/4 left-1/4 w-1.5 h-1.5 bg-primary rounded-full animate-ping opacity-50" />
        <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-cyan-300 rounded-full animate-float-slow opacity-40" />
        <div className="absolute bottom-20 right-[10%] w-1 h-1 bg-white rounded-full animate-ping delay-300 opacity-60" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-12 md:mb-16 transition-all duration-700 ease-out ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="gradient-text">About Me</span>
          </h2>
          <div className="w-20 md:w-24 h-1 bg-gradient-to-r from-primary to-cyan-400 mx-auto rounded-full" />
        </div>

        <div
          className={`flex justify-center transition-all duration-700 ease-out delay-200 ${
            isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
          }`}
        >
          <Card className="glass-card border-border/50 p-6 md:p-8 max-w-xl w-full hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 hover:scale-[1.02]">
            <CardContent className="p-0 space-y-6 md:space-y-8">
              {/* Education */}
              <div className="flex items-start sm:items-center gap-3 md:gap-4 group">
                <div className="p-3 md:p-4 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors shrink-0">
                  <GraduationCap className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                </div>
                <div>
                  <p className="text-muted-foreground text-xs md:text-sm mb-1">Education</p>
                  <p className="text-base sm:text-lg md:text-xl font-semibold group-hover:text-primary transition-colors">
                    Da Nang University of Science and Technology – DUT
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

              {/* Location */}
              <div className="flex items-start sm:items-center gap-3 md:gap-4 group">
                <div className="p-3 md:p-4 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors shrink-0">
                  <MapPin className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                </div>
                <div>
                  <p className="text-muted-foreground text-xs md:text-sm mb-1">Location</p>
                  <p className="text-base sm:text-lg md:text-xl font-semibold group-hover:text-primary transition-colors">
                    Da Nang City, Vietnam
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
