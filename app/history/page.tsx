"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrackOrderDialog } from "@/components/track-order-dialog"
import {
  History,
  Search,
  Filter,
  Package,
  Clock,
  CheckCircle,
  Truck,
  FileText,
  Gift,
  CreditCard,
  Printer,
} from "lucide-react"

interface Order {
  id: string
  type: string
  status: "completed" | "processing" | "delivered" | "cancelled"
  date: string
  amount: number
  items: string
  icon: any
}

// Mock order data
const mockOrders: Order[] = [
  {
    id: "PS123456",
    type: "Basic Print",
    status: "delivered",
    date: "2024-01-15",
    amount: 150,
    items: "Document Print - 10 pages, Color, Glossy",
    icon: Printer,
  },
  {
    id: "PS123457",
    type: "Gift Card",
    status: "delivered",
    date: "2024-01-14",
    amount: 200,
    items: "Birthday Special Template - Premium Gold",
    icon: Gift,
  },
  {
    id: "PS123458",
    type: "Business Card",
    status: "processing",
    date: "2024-01-13",
    amount: 1500,
    items: "500 cards - Standard size, Premium cardstock",
    icon: CreditCard,
  },
  {
    id: "PS123459",
    type: "Brochure",
    status: "completed",
    date: "2024-01-12",
    amount: 2800,
    items: "Corporate Template - A4, Glossy, Tri-fold, 200 pieces",
    icon: FileText,
  },
  {
    id: "PS123460",
    type: "Basic Print",
    status: "delivered",
    date: "2024-01-11",
    amount: 85,
    items: "Document Print - 5 pages, B&W, Normal, Stapled",
    icon: Printer,
  },
  {
    id: "PS123461",
    type: "Gift Card",
    status: "cancelled",
    date: "2024-01-10",
    amount: 150,
    items: "Love & Romance Template",
    icon: Gift,
  },
]

const statusConfig = {
  completed: { label: "Completed", color: "bg-blue-100 text-blue-800", icon: CheckCircle },
  processing: { label: "Processing", color: "bg-yellow-100 text-yellow-800", icon: Clock },
  delivered: { label: "Delivered", color: "bg-green-100 text-green-800", icon: CheckCircle },
  cancelled: { label: "Cancelled", color: "bg-red-100 text-red-800", icon: Package },
}

export default function HistoryPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [showTrackDialog, setShowTrackDialog] = useState(false)
  const [selectedOrderId, setSelectedOrderId] = useState("")
  const [selectedOrderType, setSelectedOrderType] = useState("")
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
      const savedOrders = localStorage.getItem("userOrders")
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders))
      } else {
        setOrders(mockOrders)
        localStorage.setItem("userOrders", JSON.stringify(mockOrders))
      }
    }
  }, [])

  useEffect(() => {
    let filtered = orders

    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.items.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter)
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter((order) => order.type === typeFilter)
    }

    setFilteredOrders(filtered)
  }, [orders, searchTerm, statusFilter, typeFilter])

  const handleTrackOrder = (orderId: string, orderType: string) => {
    setSelectedOrderId(orderId)
    setSelectedOrderType(orderType)
    setShowTrackDialog(true)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <History className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold mb-2">Please Login</h1>
        <p className="text-muted-foreground mb-6">You need to be logged in to view your order history.</p>
        <Button asChild className="gradient-primary text-white border-0">
          <a href="/login">Login Now</a>
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg gradient-primary">
          <History className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Order History
          </h1>
          <p className="text-muted-foreground">Track and manage all your PrintSprint orders</p>
        </div>
      </div>

      <Card className="glass-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search Orders</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by order ID, type, or items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 glass border-white/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="glass border-white/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Service Type</label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="glass border-white/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Basic Print">Basic Print</SelectItem>
                  <SelectItem value="Gift Card">Gift Card</SelectItem>
                  <SelectItem value="Business Card">Business Card</SelectItem>
                  <SelectItem value="Brochure">Brochure</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <Card className="glass-card border-0">
            <CardContent className="text-center py-12">
              <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Orders Found</h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm || statusFilter !== "all" || typeFilter !== "all"
                  ? "Try adjusting your filters to see more results."
                  : "You haven't placed any orders yet. Start printing with us!"}
              </p>
              <Button asChild className="gradient-primary text-white border-0">
                <a href="/">Start Printing</a>
              </Button>
            </CardContent>
          </Card>
        ) : (
          filteredOrders.map((order) => {
            const statusInfo = statusConfig[order.status]
            const IconComponent = order.icon

            return (
              <Card key={order.id} className="glass-card border-0 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg gradient-primary">
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-semibold text-lg">Order #{order.id}</h3>
                          <Badge className={statusInfo.color}>
                            <statusInfo.icon className="h-3 w-3 mr-1" />
                            {statusInfo.label}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{order.type}</p>
                        <p className="text-sm text-muted-foreground">{order.items}</p>
                        <p className="text-xs text-muted-foreground mt-2">Ordered on {formatDate(order.date)}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary mb-2">₹{order.amount}</p>
                      <div className="flex gap-2">
                        {order.status === "processing" && (
                          <Button
                            size="sm"
                            onClick={() => handleTrackOrder(order.id, order.type)}
                            className="gradient-primary text-white border-0"
                          >
                            <Truck className="h-4 w-4 mr-1" />
                            Track
                          </Button>
                        )}
                        <Button size="sm" variant="outline" className="glass border-white/20 bg-transparent">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card border-0">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{orders.length}</div>
            <div className="text-sm text-muted-foreground">Total Orders</div>
          </CardContent>
        </Card>
        <Card className="glass-card border-0">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {orders.filter((o) => o.status === "delivered").length}
            </div>
            <div className="text-sm text-muted-foreground">Delivered</div>
          </CardContent>
        </Card>
        <Card className="glass-card border-0">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {orders.filter((o) => o.status === "processing").length}
            </div>
            <div className="text-sm text-muted-foreground">Processing</div>
          </CardContent>
        </Card>
        <Card className="glass-card border-0">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              ₹{orders.reduce((sum, order) => sum + order.amount, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total Spent</div>
          </CardContent>
        </Card>
      </div>

      <TrackOrderDialog
        isOpen={showTrackDialog}
        onClose={() => setShowTrackDialog(false)}
        orderId={selectedOrderId}
        orderType={selectedOrderType}
      />
    </div>
  )
}
