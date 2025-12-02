"use client"

import { Github, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="relative py-8 md:py-12 px-4 border-t border-border overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-4 left-[20%] w-1 h-1 bg-primary rounded-full animate-ping opacity-40" />
        <div className="absolute bottom-6 right-[30%] w-1.5 h-1.5 bg-cyan-400 rounded-full animate-float-slow opacity-30" />
        <div className="absolute top-1/2 left-[10%] w-1 h-1 bg-primary rounded-full animate-float opacity-50" />
        <div className="absolute bottom-4 right-[15%] w-1 h-1 bg-cyan-300 rounded-full animate-ping delay-300 opacity-40" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 group">
            <span className="text-xl md:text-2xl font-bold gradient-text relative">
              LDK
              <span className="absolute -inset-2 bg-primary/10 rounded-lg opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300" />
            </span>
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <a
              href="mailto:khanhdangabc2@gmail.com"
              className="relative p-2 md:p-3 rounded-full bg-primary/5 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 group"
              aria-label="Send email"
            >
              <Mail className="w-4 h-4 md:w-5 md:h-5 relative z-10" />
              <span className="absolute inset-0 rounded-full bg-primary/20 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300" />
            </a>
            <a
              href="https://github.com/caindandut"
              target="_blank"
              rel="noopener noreferrer"
              className="relative p-2 md:p-3 rounded-full bg-primary/5 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 group"
              aria-label="Visit GitHub profile"
            >
              <Github className="w-4 h-4 md:w-5 md:h-5 relative z-10" />
              <span className="absolute inset-0 rounded-full bg-primary/20 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
