import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"

const projects = [
  {
    title: "Mindful Calendar",
    description: "A beautiful calendar app that helps you plan your days with intention",
    image: "/minimal-calendar-app-interface.jpg",
    tags: ["Design", "React", "TypeScript"],
    year: "2024",
  },
  {
    title: "Portfolio CMS",
    description: "Content management system for creative professionals",
    image: "/modern-cms-dashboard-interface.jpg",
    tags: ["Next.js", "Database", "UI/UX"],
    year: "2024",
  },
  {
    title: "Creative Studio",
    description: "Landing page and brand identity for a creative agency",
    image: "/creative-agency-website-landing-page.jpg",
    tags: ["Branding", "Web Design", "Animation"],
    year: "2023",
  },
  {
    title: "Task Flow",
    description: "Simple and elegant task management for focused work",
    image: "/minimalist-task-manager-app.jpg",
    tags: ["Product Design", "React", "Mobile"],
    year: "2023",
  },
]

export function PortfolioWork() {
  return (
    <section id="work" className="container mx-auto px-4 py-20 md:py-32">
      <div className="mb-12">
        <p className="text-sm text-muted-foreground mb-2 tracking-wide uppercase">Selected work</p>
        <h2 className="text-3xl md:text-5xl font-bold">Recent Projects</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <Card
            key={index}
            className="group overflow-hidden border-border hover:border-accent transition-all duration-300 cursor-pointer"
          >
            <div className="relative overflow-hidden aspect-video bg-muted">
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <ExternalLink className="h-6 w-6 text-foreground" />
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <span className="text-sm text-muted-foreground">{project.year}</span>
              </div>
              <p className="text-muted-foreground mb-4 leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, tagIndex) => (
                  <Badge key={tagIndex} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
