"use client"

import { useEffect, useState } from "react"

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col items-center justify-center">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-border rounded-full" />
        <div className="absolute top-0 left-0 w-20 h-20 border-4 border-primary rounded-full border-t-transparent animate-spin" />
      </div>

      <div className="mt-8 w-64">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Loading...</span>
          <span>{Math.min(100, Math.round(progress))}%</span>
        </div>
        <div className="h-1 bg-border rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-cyan-400 transition-all duration-300"
            style={{ width: `${Math.min(100, progress)}%` }}
          />
        </div>
      </div>

      <p className="mt-4 text-muted-foreground font-mono text-sm">Initializing 3D Environment...</p>
    </div>
  )
}
