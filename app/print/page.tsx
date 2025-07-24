"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { FileUpload } from "@/components/file-upload"
import { PriceCalculator } from "@/components/price-calculator"
import { OrderSuccessDialog } from "@/components/order-success-dialog"
import { TrackOrderDialog } from "@/components/track-order-dialog"
import { Printer, Eye, Wallet } from "lucide-react"
import { DocumentPreview } from "@/components/document-preview"
import { toast } from "sonner"

export default function PrintPage() {
  const [file, setFile] = useState<File | null>(null)
  const [pages, setPages] = useState(1)
  const [orientation, setOrientation] = useState<"portrait" | "landscape">("portrait")
  const [paperType, setPaperType] = useState<"normal" | "glossy">("normal")
  const [color, setColor] = useState<"bw" | "color">("bw")
  const [sides, setSides] = useState<"front" | "both">("front")
  const [binding, setBinding] = useState<"none" | "stapled" | "spiral">("none")
  const [lamination, setLamination] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [showPreview, setShowPreview] = useState(false)

  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [showTrackDialog, setShowTrackDialog] = useState(false)
  const [orderId, setOrderId] = useState("")

  const [walletBalance, setWalletBalance] = useState(1000)

  const DELIVERY_CHARGE = 50

  useEffect(() => {
    const stored = localStorage.getItem("walletBalance")
    if (stored) {
      setWalletBalance(parseInt(stored))
    } else {
      localStorage.setItem("walletBalance", "1000")
    }
  }, [])

  const calculatePrice = () => {
    let basePrice = 0

    if (paperType === "normal") {
      basePrice = color === "bw" ? 5 : 10
    } else {
      basePrice = color === "bw" ? 10 : 15
    }

    let totalPrice = basePrice * pages

    if (binding === "stapled") {
      totalPrice += 20
    } else if (binding === "spiral") {
      totalPrice += 40
    }

    if (lamination) {
      totalPrice += 30
    }

    totalPrice = totalPrice * quantity + DELIVERY_CHARGE

    return totalPrice
  }

  const handleSubmit = () => {
    if (!file) return

    const price = calculatePrice()

    if (walletBalance < price) {
      toast.error("Insufficient wallet balance. Please reduce your order or recharge.")
      return
    }

    const newBalance = walletBalance - price
    localStorage.setItem("walletBalance", newBalance.toString())
    setWalletBalance(newBalance)

    const newOrderId = `PS${Date.now().toString().slice(-6)}`
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
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg gradient-primary">
          <Printer className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Basic Print Service
          </h1>
          <p className="text-muted-foreground">Upload your documents and customize your print options</p>
        </div>
      </div>

      <Card className="glass-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5" />
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="glass-card border-0">
            <CardHeader>
              <CardTitle>Upload Document</CardTitle>
            </CardHeader>
            <CardContent>
              <FileUpload onFileSelect={setFile} />
              {file && (
                <div className="mt-4 flex gap-2">
                  <Button
                    onClick={() => setShowPreview(!showPreview)}
                    variant="outline"
                    className="glass border-white/20"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    {showPreview ? "Hide Preview" : "Show Preview"}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {file && showPreview && <DocumentPreview file={file} />}

          <Card className="glass-card border-0">
            <CardHeader>
              <CardTitle>Print Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="pages">Number of Pages</Label>
                  <Input
                    id="pages"
                    type="number"
                    min="1"
                    value={pages}
                    onChange={(e) => setPages(Number.parseInt(e.target.value) || 1)}
                    className="glass border-white/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
                    className="glass border-white/20"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label>Orientation</Label>
                <RadioGroup value={orientation} onValueChange={(v) => setOrientation(v)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="portrait" id="portrait" />
                    <Label htmlFor="portrait">Portrait</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="landscape" id="landscape" />
                    <Label htmlFor="landscape">Landscape</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label>Paper Type</Label>
                <RadioGroup value={paperType} onValueChange={(v) => setPaperType(v)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="normal" id="normal" />
                    <Label htmlFor="normal">Normal</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="glossy" id="glossy" />
                    <Label htmlFor="glossy">Glossy (+₹5/page)</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label>Color</Label>
                <RadioGroup value={color} onValueChange={(v) => setColor(v)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bw" id="bw" />
                    <Label htmlFor="bw">Black & White</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="color" id="color" />
                    <Label htmlFor="color">Color (+₹5/page)</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label>Print Sides</Label>
                <RadioGroup value={sides} onValueChange={(v) => setSides(v)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="front" id="front" />
                    <Label htmlFor="front">Front Only</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="both" id="both" />
                    <Label htmlFor="both">Front & Back</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label>Binding</Label>
                <Select value={binding} onValueChange={(v) => setBinding(v)}>
                  <SelectTrigger className="glass border-white/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No Binding</SelectItem>
                    <SelectItem value="stapled">Stapled (+₹20)</SelectItem>
                    <SelectItem value="spiral">Spiral (+₹40)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="lamination" checked={lamination} onCheckedChange={setLamination} />
                <Label htmlFor="lamination">Lamination (+₹30)</Label>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <div className="glass-card border-0">
            <PriceCalculator
              pages={pages}
              color={color}
              paperType={paperType}
              binding={binding}
              lamination={lamination}
              quantity={quantity}
            />
            <div className="text-sm px-4 pb-2 text-muted-foreground">+ ₹{DELIVERY_CHARGE} delivery included</div>
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full gradient-primary text-white border-0 h-12 text-lg font-semibold"
            disabled={!file}
          >
            Place Order
          </Button>
        </div>
      </div>

      <OrderSuccessDialog
        isOpen={showSuccessDialog}
        onClose={() => setShowSuccessDialog(false)}
        onTrackOrder={handleTrackOrder}
        orderId={orderId}
        orderType="Basic Print"
        totalAmount={calculatePrice()}
      />

      <TrackOrderDialog
        isOpen={showTrackDialog}
        onClose={() => setShowTrackDialog(false)}
        orderId={orderId}
        orderType="Basic Print"
      />
    </div>
  )
}
