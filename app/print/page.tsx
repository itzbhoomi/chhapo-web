"use client"

import { useState } from "react"
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
import { Printer, Eye } from "lucide-react"
import { DocumentPreview } from "@/components/document-preview"

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

    return totalPrice * quantity
  }

  const handleSubmit = () => {
    if (!file) {
      return
    }

    const newOrderId = `PS${Date.now().toString().slice(-6)}`
    setOrderId(newOrderId)
    setShowSuccessDialog(true)
  }

  const handleTrackOrder = () => {
    setShowSuccessDialog(false)
    setShowTrackDialog(true)
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
                <RadioGroup
                  value={orientation}
                  onValueChange={(value: "portrait" | "landscape") => setOrientation(value)}
                >
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
                <RadioGroup value={paperType} onValueChange={(value: "normal" | "glossy") => setPaperType(value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="normal" id="normal" />
                    <Label htmlFor="normal">Normal</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="glossy" id="glossy" />
                    <Label htmlFor="glossy">Glossy (+₹5 per page)</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label>Color</Label>
                <RadioGroup value={color} onValueChange={(value: "bw" | "color") => setColor(value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bw" id="bw" />
                    <Label htmlFor="bw">Black & White</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="color" id="color" />
                    <Label htmlFor="color">Color (+₹5 per page)</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label>Print Sides</Label>
                <RadioGroup value={sides} onValueChange={(value: "front" | "both") => setSides(value)}>
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
                <Select value={binding} onValueChange={(value: "none" | "stapled" | "spiral") => setBinding(value)}>
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
