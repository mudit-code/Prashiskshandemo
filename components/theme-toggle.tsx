
"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    try {
      const stored = (localStorage.getItem("theme") as "light" | "dark" | null) || null
      const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      const initial = stored ?? (prefersDark ? "dark" : "light")
      setTheme(initial)
      if (initial === "dark") {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    } catch {
      // no-op
    }
  }, [])

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light"
    setTheme(next)
    try {
      localStorage.setItem("theme", next)
    } catch {}
    if (next === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggle}
      aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      className="group gap-2 border-primary bg-transparent text-primary hover:bg-transparent hover:text-primary dark:border-white dark:text-white dark:hover:bg-transparent dark:hover:text-white"
    >
      {theme === "light" ? (
        // sun icon
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="transition-transform group-hover:scale-110"
        >
          <path
            fill="currentColor"
            d="M6.76 4.84l-1.8-1.79L3.17 4.84l1.79 1.8zm10.48 14.32l1.79 1.8l1.79-1.8l-1.8-1.79zM12 4V1h-0v3zm0 19v-3h0v3zM4 12H1v0h3zm22 0h-3v0h3zM6.76 19.16l-1.8 1.79l1.79 1.8l1.8-1.79zM19.16 6.76l1.79-1.8l-1.8-1.79l-1.79 1.8zM12 7a5 5 0 1 1 0 10a5 5 0 0 1 0-10z"
          />
        </svg>
      ) : (
        // moon icon
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="transition-transform group-hover:scale-110"
        >
          <path fill="currentColor" d="M21 12.79A9 9 0 0 1 11.21 3A7 7 0 1 0 21 12.79z" />
        </svg>
      )}
      <span className="sr-only">Theme</span>
    </Button>
  )
}

export default ThemeToggle
