import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Printer, CreditCard, FileText, Gift, Package, Star } from "lucide-react"
import Link from "next/link"

const services = [
  {
    title: "Basic Print",
    description: "Upload your documents and get them printed with various options",
    icon: Printer,
    href: "/print",
    features: ["Multiple paper types", "Color & B/W options", "Binding services", "Lamination"],
  },
  {
    title: "Gift Cards",
    description: "Create personalized gift cards with our beautiful templates",
    icon: Gift,
    href: "/giftcard",
    features: ["Ready templates", "Custom messages", "High-quality print", "Fast delivery"],
  },
  {
    title: "Business Cards",
    description: "Professional business cards printed to perfection",
    icon: CreditCard,
    href: "/business-card",
    features: ["Custom designs", "Multiple sizes", "Premium paper", "Bulk discounts"],
  },
  {
    title: "Brochures",
    description: "Eye-catching brochures for your business needs",
    icon: FileText,
    href: "/brochure",
    features: ["Various templates", "Different sizes", "Paper options", "Professional finish"],
  },
]

export default function HomePage() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4 py-12">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-violet-900 via-purple-600 to-blue-900 bg-clip-text text-transparent">
          Welcome to Chhapo
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Print to impress. Delivered by express!</p><p>
          Your one-stop solution for all printing needs. From basic documents to custom gift cards, we deliver quality
          prints right to your doorstep.
        </p>
        
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service) => (
          <Card key={service.title} className="glass-card border-0 shadow-xl">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg gradient-primary">
                  <service.icon className="h-8 w-9 text-violet-800" />
                </div>
                <div>
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 bg-primary rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button asChild className="w-full">
                <Link href={service.href}>Get Started</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="gradient-primary border-0 glass-card">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Package className="h-8 w-8" />
            <div>
              <CardTitle>Need Bulk Orders?</CardTitle>
              <CardDescription>
                Contact us for special pricing on large quantity orders
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Button asChild variant="secondary" className="bg-black hover:bg-white hover:text-black">
            <Link href="/bulk-order" className="text-white">Request Bulk Quote</Link>
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
        <div className="text-center space-y-2">
          <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Printer className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-semibold">High Quality Prints</h3>
          <p className="text-sm text-muted-foreground">Professional grade printing with premium materials</p>
        </div>
        <div className="text-center space-y-2">
          <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Package className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-semibold">Fast Delivery</h3>
          <p className="text-sm text-muted-foreground">Quick turnaround times with reliable delivery</p>
        </div>
        <div className="text-center space-y-2">
          <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Star className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-semibold">Customer Satisfaction</h3>
          <p className="text-sm text-muted-foreground">100% satisfaction guarantee on all orders</p>
        </div>
      </div>
    </div>
  )
}
