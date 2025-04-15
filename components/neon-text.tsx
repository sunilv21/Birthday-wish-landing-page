"use client"

import type React from "react"

import { cn } from "@/lib/utils"

interface NeonTextProps {
  text: string
  size?: "small" | "medium" | "large" | "xlarge" | "huge"
  color?: "pink" | "cyan" | "purple" | "yellow"
}

export default function NeonText({ text, size = "medium", color = "pink" }: NeonTextProps) {
  const sizeClasses = {
    small: "text-xl md:text-2xl",
    medium: "text-2xl md:text-3xl",
    large: "text-3xl md:text-5xl lg:text-6xl",
    xlarge: "text-4xl md:text-6xl lg:text-8xl",
    huge: "text-5xl md:text-7xl lg:text-9xl",
  }

  const colorClasses = {
    pink: "text-pink-500 shadow-pink-500",
    cyan: "text-cyan-400 shadow-cyan-400",
    purple: "text-purple-500 shadow-purple-500",
    yellow: "text-yellow-300 shadow-yellow-300",
  }

  return (
    <div
      className={cn(
        "font-bold tracking-wider",
        sizeClasses[size],
        "animate-pulse",
        "transition-all duration-300 ease-in-out",
        "neon-text",
      )}
      style={
        {
          color: `var(--${color}-color)`,
          textShadow: `
          0 0 5px var(--${color}-color),
          0 0 10px var(--${color}-color),
          0 0 20px var(--${color}-color),
          0 0 40px var(--${color}-color)
        `,
          "--pink-color": "#ec4899",
          "--cyan-color": "#22d3ee",
          "--purple-color": "#a855f7",
          "--yellow-color": "#fde047",
        } as React.CSSProperties
      }
    >
      {text}
    </div>
  )
}
