"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronDown } from "lucide-react"

function AnimatedTitle() {
  const [displayText, setDisplayText] = useState("")
  const [currentPhrase, setCurrentPhrase] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const [showCursor, setShowCursor] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  const phrases = [
    { text: "Hi, I'm Le Dang Khanh", highlight: "Le Dang Khanh" },
    { text: "Web Developer", highlight: "Web Developer" },
  ]

  // Set mounted state to prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Cursor blink effect
  useEffect(() => {
    if (!isMounted) return
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)
    return () => clearInterval(cursorInterval)
  }, [isMounted])

  // Typing effect - only start after mount to prevent hydration issues
  useEffect(() => {
    if (!isMounted) return
    
    const phrase = phrases[currentPhrase].text

    if (isTyping) {
      if (displayText.length < phrase.length) {
        const timeout = setTimeout(
          () => {
            setDisplayText(phrase.slice(0, displayText.length + 1))
          },
          80 + Math.random() * 40,
        )
        return () => clearTimeout(timeout)
      } else {
        const timeout = setTimeout(() => {
          setIsTyping(false)
        }, 2500)
        return () => clearTimeout(timeout)
      }
    } else {
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1))
        }, 40)
        return () => clearTimeout(timeout)
      } else {
        setCurrentPhrase((prev) => (prev + 1) % phrases.length)
        setIsTyping(true)
      }
    }
  }, [displayText, isTyping, currentPhrase, isMounted])

  return (
    <div className="relative">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-bold tracking-tight">
        <span className="relative inline-block">
          {/* Multiple glow layers for depth */}
          <span
            className="absolute inset-0 blur-3xl opacity-40 bg-gradient-to-r from-cyan-400 via-primary to-cyan-400 bg-clip-text text-transparent animate-pulse"
            aria-hidden="true"
          >
            {displayText}
          </span>
          <span
            className="absolute inset-0 blur-xl opacity-60 bg-gradient-to-r from-primary via-cyan-300 to-primary bg-clip-text text-transparent"
            aria-hidden="true"
          >
            {displayText}
          </span>

          {/* Main text with animated gradient */}
          <span className="relative bg-gradient-to-r from-primary via-cyan-300 via-50% to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient drop-shadow-2xl">
            {displayText}
          </span>

          {/* Glowing cursor - only show after mount */}
          {isMounted && (
            <span
              className={`inline-block w-[3px] md:w-[4px] h-[0.85em] ml-1 md:ml-2 rounded-full bg-gradient-to-b from-primary to-cyan-400 align-middle shadow-lg shadow-primary/50 transition-opacity duration-100 ${
                showCursor ? "opacity-100" : "opacity-0"
              }`}
            />
          )}
        </span>
      </h1>

      <div className="mt-4 md:mt-6 flex justify-center items-center gap-1 md:gap-2">
        <div className="h-[2px] w-8 md:w-16 bg-gradient-to-r from-transparent via-primary/50 to-primary rounded-full animate-pulse" />
        <div className="h-1 w-1.5 md:w-2 rounded-full bg-primary animate-ping" />
        <div className="h-[3px] w-16 md:w-32 bg-gradient-to-r from-primary via-cyan-400 to-primary rounded-full shadow-lg shadow-primary/30" />
        <div className="h-1 w-1.5 md:w-2 rounded-full bg-cyan-400 animate-ping delay-150" />
        <div className="h-[2px] w-8 md:w-16 bg-gradient-to-l from-transparent via-primary/50 to-primary rounded-full animate-pulse" />
      </div>

      <div className="absolute -inset-10 md:-inset-20 pointer-events-none overflow-hidden" suppressHydrationWarning>
        <div className="absolute top-0 left-1/4 w-1.5 md:w-2 h-1.5 md:h-2 bg-primary rounded-full animate-float-slow opacity-70 shadow-lg shadow-primary/50" suppressHydrationWarning />
        <div className="absolute top-1/4 right-5 md:right-10 w-2 md:w-3 h-2 md:h-3 bg-cyan-400 rounded-full animate-float opacity-50 shadow-lg shadow-cyan-400/50" suppressHydrationWarning />
        <div className="absolute bottom-5 md:bottom-10 left-1/3 w-1 md:w-1.5 h-1 md:h-1.5 bg-primary rounded-full animate-float-slow opacity-60" suppressHydrationWarning />
        <div className="absolute top-1/3 left-2 md:left-5 w-1.5 md:w-2 h-1.5 md:h-2 bg-cyan-300 rounded-full animate-float opacity-40" suppressHydrationWarning />
        <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-white rounded-full animate-ping opacity-80" suppressHydrationWarning />
        <div className="absolute top-1/2 left-5 md:left-10 w-1 h-1 bg-cyan-400 rounded-full animate-ping delay-300 opacity-60" suppressHydrationWarning />
      </div>
    </div>
  )
}

function MobileFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-cyan-500/20 animate-pulse" />
        <div className="absolute inset-4 rounded-full bg-gradient-to-br from-primary/30 to-cyan-500/30 animate-pulse delay-75" />
        <div className="absolute inset-8 rounded-full bg-gradient-to-br from-primary/40 to-cyan-500/40 animate-pulse delay-150" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-primary to-cyan-400 animate-float shadow-2xl shadow-primary/50" />
        </div>
      </div>
    </div>
  )
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden py-20"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/20" />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pointer-events-none">
        <div className="mb-8 md:mb-12 lg:mb-16 pointer-events-auto">
          <AnimatedTitle />
        </div>
      </div>

      {/* Scroll Indicator */}
      <a
        href="#about"
        className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-10 text-muted-foreground hover:text-primary transition-colors"
        aria-label="Scroll to about section"
      >
        <ChevronDown className="h-6 w-6 md:h-8 md:w-8 animate-bounce" />
      </a>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-5 md:left-10 w-1.5 md:w-2 h-1.5 md:h-2 bg-primary rounded-full animate-pulse hidden sm:block" suppressHydrationWarning />
      <div className="absolute top-1/3 right-10 md:right-20 w-2 md:w-3 h-2 md:h-3 bg-cyan-400 rounded-full animate-pulse delay-150 hidden sm:block" suppressHydrationWarning />
      <div className="absolute bottom-1/3 left-10 md:left-20 w-1.5 md:w-2 h-1.5 md:h-2 bg-primary rounded-full animate-pulse delay-300 hidden sm:block" suppressHydrationWarning />
    </section>
  )
}
