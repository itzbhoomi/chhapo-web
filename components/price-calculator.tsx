"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface PriceCalculatorProps {
  pages: number
  color: "bw" | "color"
  paperType: "normal" | "glossy"
  binding: "none" | "stapled" | "spiral"
  lamination: boolean
  quantity?: number
}

export function PriceCalculator({
  pages,
  color,
  paperType,
  binding,
  lamination,
  quantity = 1,
}: PriceCalculatorProps) {
  const deliveryCharge = 50

  const calculatePrice = () => {
    let basePrice = 0

    // Base printing cost
    if (paperType === "normal") {
      basePrice = color === "bw" ? 5 : 10
    } else {
      basePrice = color === "bw" ? 10 : 15
    }

    let totalPrice = basePrice * pages

    // Binding cost
    if (binding === "stapled") {
      totalPrice += 20
    } else if (binding === "spiral") {
      totalPrice += 40
    }

    // Lamination cost
    if (lamination) {
      totalPrice += 30
    }

    return totalPrice * quantity + deliveryCharge
  }

  const getBreakdown = () => {
    const basePrice = paperType === "normal" ? (color === "bw" ? 5 : 10) : color === "bw" ? 10 : 15

    const breakdown = [
      {
        item: `${color.toUpperCase()} Print (${paperType})`,
        calculation: `₹${basePrice} × ${pages} pages`,
        amount: basePrice * pages,
      },
    ]

    if (binding !== "none") {
      const bindingCost = binding === "stapled" ? 20 : 40
      breakdown.push({
        item: `${binding.charAt(0).toUpperCase() + binding.slice(1)} Binding`,
        calculation: `₹${bindingCost}`,
        amount: bindingCost,
      })
    }

    if (lamination) {
      breakdown.push({
        item: "Lamination",
        calculation: "₹30",
        amount: 30,
      })
    }

    return breakdown
  }

  const breakdown = getBreakdown()
  const subtotal = breakdown.reduce((sum, item) => sum + item.amount, 0)
  const total = subtotal * quantity + deliveryCharge

  return (
    <Card className="glass-card border-0">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">Price Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {breakdown.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <div>
              <p className="font-medium">{item.item}</p>
              <p className="text-sm text-muted-foreground">{item.calculation}</p>
            </div>
            <p className="font-medium">₹{item.amount}</p>
          </div>
        ))}

        {quantity > 1 && (
          <>
            <Separator />
            <div className="flex justify-between items-center">
              <p className="font-medium">Subtotal per copy</p>
              <p className="font-medium">₹{subtotal}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="font-medium">Quantity</p>
              <p className="font-medium">×{quantity}</p>
            </div>
          </>
        )}

        <div className="flex justify-between items-center">
          <p className="font-medium">Delivery Charge</p>
          <p className="font-medium">₹{deliveryCharge}</p>
        </div>

        <Separator />
        <div className="flex justify-between items-center text-lg font-bold">
          <p>Total</p>
          <p className="text-primary">₹{total}</p>
        </div>
      </CardContent>
    </Card>
  )
}
