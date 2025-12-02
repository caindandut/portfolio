"use client"

import { useEffect, useState } from "react"

export default function MouseGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      const isCoarsePointer = window.matchMedia?.("(pointer: coarse)").matches
      setIsMobile(window.innerWidth < 768 || isCoarsePointer)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile) return

    const handleMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      if (!visible) setVisible(true)
    }

    window.addEventListener("pointermove", handleMove)
    return () => window.removeEventListener("pointermove", handleMove)
  }, [visible, isMobile])

  // Không hiển thị hiệu ứng trên mobile / thiết bị cảm ứng
  if (isMobile) {
    return null
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-20" aria-hidden="true">
      <div
        className={`mouse-glow ${visible ? "opacity-100" : "opacity-0"}`}
        style={{
          transform: `translate3d(${position.x - 95}px, ${position.y - 95}px, 0)`,
        }}
      />
    </div>
  )
}


