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
import { FileUpload } from "@/components/file-upload"
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

export default function BusinessCardPage() {
  const [file, setFile] = useState<File | null>(null)
  const [size, setSize] = useState<string>("")
  const [quantity, setQuantity] = useState<string>("")
  const [open, setOpen] = useState(false)
  const [orderId, setOrderId] = useState("")

  const handleSubmit = () => {
    if (!file) {
      toast.error("Please upload your business card design")
      return
    }

    const newOrderId =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)

    setOrderId(newOrderId)
    setOpen(true)
  }

  return (
    <div className="max-w-2xl mx-auto mt-10">
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
                <SelectItem value="standard">Standard (3.5" x 2")</SelectItem>
                <SelectItem value="square">Square (2.5" x 2.5")</SelectItem>
                <SelectItem value="mini">Mini (2.75" x 1.10")</SelectItem>
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

          <Button onClick={handleSubmit} className="w-full">
            Submit Order
          </Button>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Order Submitted</DialogTitle>
            <DialogDescription>
              Your business card order has been successfully placed!
            </DialogDescription>
          </DialogHeader>
          <div className="text-sm text-muted-foreground">
            Order ID: <span className="font-mono">{orderId}</span>
          </div>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
