"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock, Package, Truck, CheckCircle, MapPin } from "lucide-react"

interface TrackOrderDialogProps {
  isOpen: boolean
  onClose: () => void
  orderId: string
  orderType: string
}

const orderStatuses = [
  { id: 1, label: "Order Confirmed", icon: CheckCircle, time: "0 min" },
  { id: 2, label: "Processing", icon: Package, time: "2 min" },
  { id: 3, label: "Out for Delivery", icon: Truck, time: "7 min" },
  { id: 4, label: "Delivered", icon: MapPin, time: "10 min" },
]

export function TrackOrderDialog({ isOpen, onClose, orderId, orderType }: TrackOrderDialogProps) {
  const [currentStatus, setCurrentStatus] = useState(1)
  const [timeRemaining, setTimeRemaining] = useState(600) // 10 minutes in seconds
  const [progress, setProgress] = useState(25)

  useEffect(() => {
    if (!isOpen) return

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) {
          setCurrentStatus(4)
          setProgress(100)
          return 0
        }

        const newTime = prev - 1
        const elapsed = 600 - newTime
        const newProgress = Math.min((elapsed / 600) * 100, 100)
        setProgress(newProgress)

        // Update status based on time
        if (elapsed >= 420)
          setCurrentStatus(4) // 7+ minutes
        else if (elapsed >= 180)
          setCurrentStatus(3) // 3+ minutes
        else if (elapsed >= 60) setCurrentStatus(2) // 1+ minute

        return newTime
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isOpen])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card border-0 max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            Track Your Order
          </DialogTitle>
          <DialogDescription>
            Order #{orderId} • {orderType}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Delivery Promise */}
          <div className="text-center p-4 rounded-lg bg-gradient-to-r from-green-100 to-blue-100 border border-green-200">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock className="h-5 w-5 text-green-600" />
              <span className="font-semibold text-green-800">Express Delivery</span>
            </div>
            <p className="text-sm text-green-700">Guaranteed delivery within 10 minutes!</p>
            <div className="text-2xl font-bold text-green-800 mt-2">{formatTime(timeRemaining)}</div>
            <p className="text-xs text-green-600">remaining</p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Order Status Timeline */}
          <div className="space-y-4">
            {orderStatuses.map((status, index) => {
              const isActive = currentStatus >= status.id
              const isCurrent = currentStatus === status.id

              return (
                <div key={status.id} className="flex items-center gap-3">
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <status.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className={`font-medium ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                        {status.label}
                      </span>
                      <Badge variant={isActive ? "default" : "secondary"} className="text-xs">
                        {status.time}
                      </Badge>
                    </div>
                    {isCurrent && <p className="text-sm text-primary font-medium">In Progress...</p>}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Delivery Info */}
          <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="h-4 w-4 text-blue-600" />
              <span className="font-medium text-blue-800">Delivery Address</span>
            </div>
            <p className="text-sm text-blue-700">Your current location (as provided during checkout)</p>
          </div>

          <Button onClick={onClose} className="w-full gradient-primary text-white border-0">
            Close Tracking
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
