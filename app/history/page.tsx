"use client"

import { useEffect, useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  CheckCircle,
  Clock,
  Truck,
  XCircle,
  LucideIcon,
} from "lucide-react"
import { toast } from "sonner"

interface Order {
  id: string
  type: string
  status: "completed" | "processing" | "delivered" | "cancelled"
  date: string
  amount: number
  items: string
  icon: LucideIcon
}

const statusConfig: {
  [key in Order["status"]]: {
    label: string
    color: string
    icon: LucideIcon
  }
} = {
  completed: { label: "Completed", color: "bg-green-200 text-green-800", icon: CheckCircle },
  processing: { label: "Processing", color: "bg-yellow-200 text-yellow-800", icon: Clock },
  delivered: { label: "Delivered", color: "bg-blue-200 text-blue-800", icon: Truck },
  cancelled: { label: "Cancelled", color: "bg-red-200 text-red-800", icon: XCircle },
}

const mockOrders: Order[] = [
  {
    id: "1",
    type: "Basic Print",
    status: "completed",
    date: "2025-07-01T10:30:00Z",
    amount: 150,
    items: "10 pages, color",
    icon: CheckCircle,
  },
  {
    id: "2",
    type: "Gift Card",
    status: "processing",
    date: "2025-07-05T14:20:00Z",
    amount: 500,
    items: "1 birthday card",
    icon: Clock,
  },
  {
    id: "3",
    type: "Brochure",
    status: "delivered",
    date: "2025-07-10T09:15:00Z",
    amount: 1200,
    items: "50 copies, glossy",
    icon: Truck,
  },
  {
    id: "4",
    type: "Business Card",
    status: "cancelled",
    date: "2025-07-12T16:45:00Z",
    amount: 800,
    items: "100 cards, matte",
    icon: XCircle,
  },
]

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [filter, setFilter] = useState<"all" | Order["status"]>("all")
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)

  useEffect(() => {
    // Fetch mock user and order data
    setUser({ name: "Bhoomi", email: "bhoomi@example.com" })
    setOrders(mockOrders)
  }, [])

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const filteredOrders =
    filter === "all" ? orders : orders.filter((order) => order.status === filter)

  const handleTrackOrder = (orderId: string) => {
    toast.info(`Tracking order #${orderId}...`)
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Order History</h2>
        <p className="text-muted-foreground">View and manage all your orders</p>
      </div>

      <div className="mb-4 flex gap-2">
        {["all", "completed", "processing", "delivered", "cancelled"].map((status) => (
          <Button
            key={status}
            variant={filter === status ? "default" : "outline"}
            onClick={() => setFilter(status as Order["status"] | "all")}
            className="capitalize"
          >
            {status}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredOrders.map((order) => {
          const statusInfo = statusConfig[order.status]
          const StatusIcon = statusInfo.icon

          return (
            <Card key={order.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">
                  {order.type}
                </CardTitle>
                <Badge className={statusInfo.color}>
                  <StatusIcon className="h-3 w-3 mr-1" />
                  {statusInfo.label}
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Ordered on: {formatDate(order.date)}
                </p>
                <p className="text-sm text-muted-foreground">
                  Items: {order.items}
                </p>
                <p className="text-sm text-muted-foreground">
                  Amount: ₹{order.amount}
                </p>
                <Button
                  variant="outline"
                  className="mt-3"
                  onClick={() => handleTrackOrder(order.id)}
                >
                  Track Order
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default OrderHistoryPage
