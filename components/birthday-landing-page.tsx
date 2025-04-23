"use client"

import { useState, useEffect } from "react"
import { Sparkles, Heart, Gift, Cake } from "lucide-react"
import Fireworks from "@/components/fireworks"
import NeonText from "@/components/neon-text"

export default function BirthdayLandingPage() {
  const [showFireworks, setShowFireworks] = useState(false)
  const name = "Sunil" // Hardcoded name - change this to your preferred name

  useEffect(() => {
    // Show fireworks after a short delay when the page loads
    const timer = setTimeout(() => {
      setShowFireworks(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-black">
      {/* Fireworks background */}
      {showFireworks && <Fireworks />}

      {/* Content */}
      <div className="container relative z-10 mx-auto flex h-full min-h-screen items-center justify-center px-4">
        <div className="flex w-full flex-col items-center justify-center space-y-6 text-center">
          {/* Two-line birthday greeting */}
          <div className="space-y-2">
            <NeonText text="Happy Birthday" size="large" color="pink" />
            <NeonText text={name} size="huge" color="cyan" />
          </div>

          <div className="mx-auto w-full max-w-2xl p-5">
            <div className="mb-4 flex justify-center">
              <div className="relative">
                <Cake className="h-14 w-14 text-pink-500" />
                <span className="absolute -right-1 -top-1 animate-ping">
                  <Sparkles className="h-5 w-5 text-yellow-400" />
                </span>
              </div>
            </div>
            <div className="text-center text-lg font-medium text-white">
              Wishing you a fantastic day filled with joy and laughter! May all your dreams come true!
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="flex items-center space-x-2 text-pink-400">
              <Gift className="h-5 w-5" />
              <span>Celebrate</span>
            </div>
            <div className="flex items-center space-x-2 text-purple-400">
              <Heart className="h-5 w-5" />
              <span>Share Love</span>
            </div>
            <div className="flex items-center space-x-2 text-cyan-400">
              <Sparkles className="h-5 w-5" />
              <span>Create Memories</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
