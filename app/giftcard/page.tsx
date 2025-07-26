"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { CreditCard, Wallet } from "lucide-react"
import { OrderSuccessDialog } from "@/components/order-success-dialog"
import { TrackOrderDialog } from "@/components/track-order-dialog"

export default function GiftCardPage() {
  const [occasion, setOccasion] = useState("")
  const [size, setSize] = useState("")
  const [quantity, setQuantity] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [name, setName] = useState("")
  const [orderId, setOrderId] = useState("")
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [showTrackDialog, setShowTrackDialog] = useState(false)

  const [walletBalance, setWalletBalance] = useState(1000)

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
    black: 35,
    congratulations: 25,
    blue: 20,
  }

  const deliveryCharge = 50

  useEffect(() => {
    const stored = localStorage.getItem("walletBalance")
    if (stored) {
      setWalletBalance(parseInt(stored))
    } else {
      localStorage.setItem("walletBalance", "1000")
    }
  }, [])

  const getTotalPrice = () => {
    const base = prices[occasion] || 50
    const cardTotal = base * parseInt(quantity || "0")
    return cardTotal + deliveryCharge
  }

  const handleSubmit = () => {
    if (!occasion || !size || !quantity || !selectedTemplate || !name) {
      toast.error("Please fill all fields and select a template")
      return
    }

    const price = getTotalPrice()
    if (walletBalance < price) {
      toast.error("Insufficient wallet balance. Please reduce quantity or recharge wallet.")
      return
    }

    const newBalance = walletBalance - price
    localStorage.setItem("walletBalance", newBalance.toString())
    setWalletBalance(newBalance)

    const newOrderId = `GC${Date.now().toString().slice(-6)}`
    setOrderId(newOrderId)
    setShowSuccessDialog(true)
    toast.success(`₹${price} deducted from wallet. Order placed!`)
  }

  const handleTrackOrder = () => {
    setShowSuccessDialog(false)
    setShowTrackDialog(true)
  }

  const handleResetWallet = () => {
    localStorage.setItem("walletBalance", "1000")
    setWalletBalance(1000)
    toast.success("Wallet reset to ₹1000")
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-6">
      <Card className="glass-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Wallet Balance: ₹{walletBalance}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            variant="ghost"
            className="text-sm underline text-blue-500 hover:text-blue-700 p-0 mt-2"
            onClick={handleResetWallet}
          >
            Reset Wallet Balance
          </Button>
        </CardContent>
      </Card>

      <Card className="border-green-200 bg-green-50 dark:bg-white/5 dark:border-white/10">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Custom Gift Card Order
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">

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

          <div className="space-y-2">
            <Label>Custom message you want on card</Label>
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
                      selectedTemplate === src ? "border-green-500" : "border-transparent"
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

          {occasion && quantity && (
            <div className="space-y-2">
              <Label>Price Details</Label>
              <div className="text-sm space-y-1">
                <p>Card Cost: ₹{(prices[occasion] || 0) * parseInt(quantity || "0")}</p>
                <p>Delivery Charge: ₹{deliveryCharge}</p>
                <p className="font-semibold text-green-600">Total: ₹{getTotalPrice()}</p>
              </div>
            </div>
          )}

          <Button onClick={handleSubmit} className="w-full">
            Submit Order
          </Button>
        </CardContent>
      </Card>

      <OrderSuccessDialog
        isOpen={showSuccessDialog}
        onClose={() => setShowSuccessDialog(false)}
        onTrackOrder={handleTrackOrder}
        orderId={orderId}
        orderType="Gift Card"
        totalAmount={getTotalPrice()}
      />

      <TrackOrderDialog
        isOpen={showTrackDialog}
        onClose={() => setShowTrackDialog(false)}
        orderId={orderId}
        orderType="Gift Card"
      />
    </div>
  )
}
