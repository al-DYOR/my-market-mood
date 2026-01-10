"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function PortfolioHero() {
  const scrollToWork = () => {
    const element = document.getElementById("work")
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="container mx-auto px-4 py-20 md:py-32">
      <div className="max-w-4xl">
        <p className="text-sm text-muted-foreground mb-4 tracking-wide uppercase">Good morning</p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-balance">
          Crafting digital experiences with intention and spirit
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl text-pretty">
          {
            "I'm a creative developer and designer passionate about building meaningful digital products that blend thoughtful design with robust engineering."
          }
        </p>
        <Button onClick={scrollToWork} size="lg" className="group">
          View Selected Work
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </section>
  )
}
