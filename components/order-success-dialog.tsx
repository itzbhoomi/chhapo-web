"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, Package } from "lucide-react"

interface OrderSuccessDialogProps {
  isOpen: boolean
  onClose: () => void
  onTrackOrder: () => void
  orderId: string
  orderType: string
  totalAmount: number
}

export function OrderSuccessDialog({
  isOpen,
  onClose,
  onTrackOrder,
  orderId,
  orderType,
  totalAmount,
}: OrderSuccessDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card border-0 max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <DialogTitle className="text-xl">Order Placed Successfully!</DialogTitle>
          <DialogDescription>Your {orderType.toLowerCase()} order has been confirmed</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Order Details */}
          <div className="p-4 rounded-lg bg-gray-50 space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Order ID</span>
              <span className="font-mono text-sm">#{orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Service</span>
              <span className="text-sm font-medium">{orderType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Total Amount</span>
              <span className="text-sm font-bold text-primary">₹{totalAmount}</span>
            </div>
          </div>

          {/* Express Delivery Promise */}
          <div className="p-4 rounded-lg bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-5 w-5 text-blue-600" />
              <span className="font-semibold text-blue-800">Express Delivery</span>
            </div>
            <p className="text-sm text-blue-700">
              Your order will be delivered within <strong>10 minutes</strong>!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button onClick={onTrackOrder} className="flex-1 gradient-primary text-white border-0">
              <Package className="h-4 w-4 mr-2" />
              Track Order
            </Button>
            <Button onClick={onClose} variant="outline" className="flex-1 glass border-gray-200 bg-transparent">
              Continue Shopping
            </Button>
          </div>

          {/* Contact Info */}
          <p className="text-xs text-center text-muted-foreground">Need help? Contact us at support@printsprint.com</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
