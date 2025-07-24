"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { CreditCard } from "lucide-react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

export default function GiftCardPage() {
  const [occasion, setOccasion] = useState("")
  const [size, setSize] = useState("")
  const [quantity, setQuantity] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [name, setName] = useState("")
  const [orderId, setOrderId] = useState("")
  const [open, setOpen] = useState(false)

  const templates = {
    birthday: ["/birthday/bd1.jpeg", "/birthday/bd2.jpeg", "/birthday/bd3.jpeg", "/birthday/bd4.jpeg"],
    love: ["/love/l1.jpg", "/love/l2.jpg", "/love/l3.jpg", "/love/l4.jpg"],
    black: ["/black/bl1.jpg", "/black/bl2.jpg", "/black/bl3.jpg", "/black/bl4.jpg"],
    congratulations: ["/golden/g1.jpg", "/golden/g2.jpg", "/golden/g3.jpg", "/golden/g4.jpg"],
    blue: ["/blue/b1.jpg", "/blue/b2.jpg", "/blue/b3.jpg", "/blue/b4.jpg"],
  }

  const prices = {
    birthday: 30,
    love: 40,
    anniversary: 35,
    congratulations: 25,
    festival: 20,
  }

  const getTotalPrice = () => {
    const base = prices[occasion] || 0
    return base * parseInt(quantity || "0")
  }

  const handleSubmit = () => {
    if (!occasion || !size || !quantity || !selectedTemplate || !name) {
      toast.error("Please fill all fields and select a template")
      return
    }

    const newOrderId =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)

    setOrderId(newOrderId)
    setOpen(true)
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-6">
      <Card className="border-green-200 bg-green-50 dark:bg-white/5 dark:border-white/10">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Custom Gift Card Order
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">

          {/* Occasion */}
          <div className="space-y-2">
            <Label>Occasion</Label>
            <Select onValueChange={(value) => {
              setOccasion(value)
              setSelectedTemplate("")
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Select Occasion" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(templates).map((key) => (
                  <SelectItem key={key} value={key}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Size */}
          <div className="space-y-2">
            <Label>Select Card Size</Label>
            <Select onValueChange={(value) => setSize(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Choose size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard (5in × 7in)</SelectItem>
                <SelectItem value="square">Square (5in × 5in)</SelectItem>
                <SelectItem value="mini">Mini (3in × 4in)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Quantity */}
          <div className="space-y-2">
            <Label>Select Quantity</Label>
            <Select onValueChange={(value) => setQuantity(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Choose quantity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label>Recipient Name</Label>
            <Input
              placeholder="Enter name to display on card"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Templates */}
          {occasion && (
            <div className="space-y-2">
              <Label>Choose a template</Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {templates[occasion].map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    onClick={() => setSelectedTemplate(src)}
                    className={`cursor-pointer border-2 rounded-lg ${
                      selectedTemplate === src
                        ? "border-green-500"
                        : "border-transparent"
                    }`}
                    style={{
                      width:
                        size === "standard"
                          ? "140px"
                          : size === "square"
                          ? "120px"
                          : "100px",
                      height:
                        size === "standard"
                          ? "200px"
                          : size === "square"
                          ? "120px"
                          : "130px",
                      objectFit: "cover",
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Price */}
          {occasion && quantity && (
            <div className="space-y-2">
              <Label>Total Price</Label>
              <p className="font-semibold text-green-600">₹{getTotalPrice()}</p>
            </div>
          )}

          {/* Submit */}
          <Button onClick={handleSubmit} className="w-full">
            Submit Order
          </Button>
        </CardContent>
      </Card>

      {/* Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Order Placed</DialogTitle>
            <DialogDescription>
              Your custom gift card order has been placed successfully!
            </DialogDescription>
          </DialogHeader>
          <div className="text-sm text-muted-foreground">
            <p>Order ID: <span className="font-mono">{orderId}</span></p>
            <p>Total Price: <span className="font-semibold">₹{getTotalPrice()}</span></p>
          </div>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="secondary">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
