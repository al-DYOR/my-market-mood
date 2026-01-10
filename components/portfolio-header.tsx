"use client"

import { Button } from "@/components/ui/button"
import { Menu, Moon, Sun } from "lucide-react"
import { useState, useEffect } from "react"

export function PortfolioHeader() {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark")
    setTheme(isDark ? "dark" : "light")
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    document.documentElement.classList.toggle("dark")
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: "smooth" })
    setMobileMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-accent" />
            <span className="font-semibold text-lg">Daily Spirit</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("work")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Work
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </button>
            <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-border flex flex-col gap-4">
            <button
              onClick={() => scrollToSection("work")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
            >
              Work
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
            >
              Contact
            </button>
          </div>
        )}
      </nav>
    </header>
  )
}
