"use client"

import { useEffect, useState } from "react"
import { Clock } from "lucide-react"

/**
 * CLIENT-SIDE RENDERING (CSR) COMPONENT
 *
 * This component demonstrates CSR because:
 * 1. It uses the 'use client' directive
 * 2. It relies on browser APIs (Date, setInterval)
 * 3. It updates dynamically without server interaction
 * 4. State changes trigger re-renders on the client
 */
export function LiveClock() {
  const [time, setTime] = useState<Date>(new Date())

  useEffect(() => {
    // Update time every second
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)

    // Cleanup interval on unmount
    return () => clearInterval(interval)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-8">
      <Clock className="h-16 w-16 text-primary" />
      <div className="text-center space-y-2">
        <p className="text-5xl font-bold tabular-nums">{formatTime(time)}</p>
        <p className="text-lg text-muted-foreground">{formatDate(time)}</p>
      </div>
      <p className="text-sm text-muted-foreground">⚡ Updates every second using client-side JavaScript</p>
    </div>
  )
}
