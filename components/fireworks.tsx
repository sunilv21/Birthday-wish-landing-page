"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  size: number
  color: string
  speedX: number
  speedY: number
  alpha: number
  decay: number
}

export default function Fireworks() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Create fireworks
    const createFirework = (x: number, y: number) => {
      const colors = [
        "#ff00ff", // Pink
        "#00ffff", // Cyan
        "#ff00aa", // Hot pink
        "#aa00ff", // Purple
        "#ffaa00", // Orange
        "#ff0066", // Magenta
      ]

      const particleCount = 80 + Math.random() * 50

      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = 1 + Math.random() * 5

        particlesRef.current.push({
          x,
          y,
          size: 2 + Math.random() * 3,
          color: colors[Math.floor(Math.random() * colors.length)],
          speedX: Math.cos(angle) * speed,
          speedY: Math.sin(angle) * speed,
          alpha: 1,
          decay: 0.01 + Math.random() * 0.02,
        })
      }
    }

    // Randomly create fireworks
    const createRandomFirework = () => {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height * 0.6 + canvas.height * 0.2
      createFirework(x, y)
    }

    // Initial fireworks
    for (let i = 0; i < 3; i++) {
      createRandomFirework()
    }

    // Create new fireworks periodically
    const fireworkInterval = setInterval(() => {
      createRandomFirework()
    }, 800)

    // Animation loop
    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        particle.x += particle.speedX
        particle.y += particle.speedY
        particle.speedY += 0.03 // Gravity
        particle.alpha -= particle.decay

        if (particle.alpha <= 0) {
          particlesRef.current.splice(index, 1)
          return
        }

        ctx.globalAlpha = particle.alpha
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
      })

      ctx.globalAlpha = 1

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      clearInterval(fireworkInterval)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed left-0 top-0 h-full w-full" style={{ pointerEvents: "none" }} />
}
