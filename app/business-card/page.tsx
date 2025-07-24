"use client"

import { useEffect, useState } from "react"
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
import { FileUpload } from "@/components/file-upload"
import { toast } from "sonner"
import { CreditCard, Wallet } from "lucide-react"
import { OrderSuccessDialog } from "@/components/order-success-dialog"
import { TrackOrderDialog } from "@/components/track-order-dialog"

export default function BusinessCardPage() {
  const [file, setFile] = useState<File | null>(null)
  const [size, setSize] = useState<string>("")
  const [quantity, setQuantity] = useState<string>("")
  const [orderId, setOrderId] = useState("")
  const [walletBalance, setWalletBalance] = useState(1000)

  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [showTrackDialog, setShowTrackDialog] = useState(false)

  const DELIVERY_CHARGE = 50

  const sizePrices = {
    standard: 2,
    square: 2.5,
    mini: 1.5,
  }

  useEffect(() => {
    const stored = localStorage.getItem("walletBalance")
    if (stored) {
      setWalletBalance(parseInt(stored))
    } else {
      localStorage.setItem("walletBalance", "1000")
    }
  }, [])

  const getTotalPrice = () => {
    const base = sizePrices[size as keyof typeof sizePrices] || 0
    const total = base * parseInt(quantity || "0")
    return Math.round(total + DELIVERY_CHARGE)
  }

  const handleSubmit = () => {
    if (!file || !size || !quantity) {
      toast.error("Please fill all fields and upload your business card design")
      return
    }

    const price = getTotalPrice()

    if (walletBalance < price) {
      toast.error("Insufficient wallet balance. Please reduce quantity or recharge.")
      return
    }

    const newBalance = walletBalance - price
    localStorage.setItem("walletBalance", newBalance.toString())
    setWalletBalance(newBalance)

    const newOrderId = `BC${Date.now().toString().slice(-6)}`
    setOrderId(newOrderId)
    setShowSuccessDialog(true)
    toast.success(`₹${price} deducted from wallet. Order placed!`)
  }

  const handleResetWallet = () => {
    localStorage.setItem("walletBalance", "1000")
    setWalletBalance(1000)
    toast.success("Wallet reset to ₹1000")
  }

  const handleTrackOrder = () => {
    setShowSuccessDialog(false)
    setShowTrackDialog(true)
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 space-y-6">
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
            Business Card Upload
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Select your business card size</Label>
            <Select onValueChange={(value) => setSize(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Choose size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard (3.5" x 2") – ₹2/card</SelectItem>
                <SelectItem value="square">Square (2.5" x 2.5") – ₹2.5/card</SelectItem>
                <SelectItem value="mini">Mini (2.75" x 1.10") – ₹1.5/card</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Upload your card design (PDF/PNG)</Label>
            <FileUpload onFileSelect={(file) => setFile(file)} />
          </div>

          <div className="space-y-2">
            <Label>Select quantity</Label>
            <Select onValueChange={(value) => setQuantity(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Choose quantity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="100">100</SelectItem>
                <SelectItem value="250">250</SelectItem>
                <SelectItem value="500">500</SelectItem>
                <SelectItem value="1000">1000</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {size && quantity && (
            <div className="text-sm text-muted-foreground">
              <p>Card Cost: ₹{(sizePrices[size as keyof typeof sizePrices] || 0) * parseInt(quantity)}</p>
              <p>Delivery Charge: ₹{DELIVERY_CHARGE}</p>
              <p className="font-semibold text-green-600">Total: ₹{getTotalPrice()}</p>
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
        orderType="Business Card"
        totalAmount={getTotalPrice()}
      />

      <TrackOrderDialog
        isOpen={showTrackDialog}
        onClose={() => setShowTrackDialog(false)}
        orderId={orderId}
        orderType="Business Card"
      />
    </div>
  )
}
