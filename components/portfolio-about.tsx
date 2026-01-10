import { Card } from "@/components/ui/card"
import { Code2, Palette, Sparkles } from "lucide-react"

const skills = [
  {
    icon: Code2,
    title: "Development",
    description: "Building robust and scalable applications with modern web technologies",
  },
  {
    icon: Palette,
    title: "Design",
    description: "Creating beautiful and intuitive user interfaces that delight users",
  },
  {
    icon: Sparkles,
    title: "Creative Direction",
    description: "Guiding projects with a clear vision and attention to detail",
  },
]

export function PortfolioAbout() {
  return (
    <section id="about" className="bg-muted/30 py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <p className="text-sm text-muted-foreground mb-2 tracking-wide uppercase">About</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Building with purpose</h2>
          <div className="max-w-3xl">
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              {
                "I believe the best digital products come from a deep understanding of both design and code. My approach combines technical expertise with creative thinking to build experiences that are not only functional but also meaningful."
              }
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              With a background in full-stack development and a passion for design, I help bring ideas to life through
              careful craftsmanship and attention to detail.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {skills.map((skill, index) => {
            const Icon = skill.icon
            return (
              <Card key={index} className="p-6 border-border bg-card hover:bg-accent/5 transition-colors">
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{skill.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{skill.description}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
