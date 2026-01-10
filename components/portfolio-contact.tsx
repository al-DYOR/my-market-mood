import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Linkedin, Github, Twitter } from "lucide-react"

export function PortfolioContact() {
  return (
    <section id="contact" className="container mx-auto px-4 py-20 md:py-32">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <p className="text-sm text-muted-foreground mb-2 tracking-wide uppercase">Contact</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">{"Let's work together"}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {"If you'd like to discuss a project or just say hi, I'm always open to connecting with creative minds."}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-8 border-border">
            <h3 className="text-xl font-semibold mb-6">Send a message</h3>
            <form className="space-y-4">
              <div>
                <Input placeholder="Your name" className="bg-background" />
              </div>
              <div>
                <Input type="email" placeholder="Your email" className="bg-background" />
              </div>
              <div>
                <Textarea placeholder="Your message" rows={5} className="bg-background resize-none" />
              </div>
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </Card>

          <div className="space-y-6">
            <Card className="p-6 border-border">
              <h3 className="text-xl font-semibold mb-4">Connect</h3>
              <div className="space-y-3">
                <a
                  href="mailto:hello@example.com"
                  className="flex items-center gap-3 text-muted-foreground hover:text-accent transition-colors group"
                >
                  <div className="h-10 w-10 rounded-lg bg-muted group-hover:bg-accent/10 flex items-center justify-center transition-colors">
                    <Mail className="h-5 w-5" />
                  </div>
                  <span>hello@example.com</span>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-accent transition-colors group"
                >
                  <div className="h-10 w-10 rounded-lg bg-muted group-hover:bg-accent/10 flex items-center justify-center transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </div>
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-accent transition-colors group"
                >
                  <div className="h-10 w-10 rounded-lg bg-muted group-hover:bg-accent/10 flex items-center justify-center transition-colors">
                    <Github className="h-5 w-5" />
                  </div>
                  <span>GitHub</span>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-accent transition-colors group"
                >
                  <div className="h-10 w-10 rounded-lg bg-muted group-hover:bg-accent/10 flex items-center justify-center transition-colors">
                    <Twitter className="h-5 w-5" />
                  </div>
                  <span>Twitter</span>
                </a>
              </div>
            </Card>

            <Card className="p-6 border-border bg-accent/5">
              <h3 className="text-lg font-semibold mb-2">Availability</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Currently available for freelance projects and collaborations. Response time is typically within 24
                hours.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
