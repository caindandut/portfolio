"use client"

import { useState, useEffect, useMemo } from "react"

export default function SnowEffect() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const flakes = useMemo(
    () =>
      Array.from({ length: isMobile ? 40 : 90 }).map(() => ({
        left: Math.random() * 100,
        duration: 8 + Math.random() * 8,
        delay: Math.random() * -16,
        opacity: 0.4 + Math.random() * 0.6,
        size: 10 + Math.random() * 12,
      })),
    [isMobile],
  )

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {flakes.map((flake, index) => (
        <div
          key={index}
          className="snowflake"
          style={{
            left: `${flake.left}%`,
            animationDuration: `${flake.duration}s`,
            animationDelay: `${flake.delay}s`,
            opacity: flake.opacity,
            fontSize: `${flake.size}px`,
          }}
        >
          ❆
        </div>
      ))}
    </div>
  )
}
