"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Package, Search, Filter, Eye, Edit, CheckCircle, Clock, Truck, X, Phone, FileText } from "lucide-react"

interface Order {
  id: string
  customer: {
    name: string
    email: string
    phone: string
    address: string
  }
  service: string
  items: string
  status: "pending" | "processing" | "printing" | "ready" | "delivered" | "cancelled"
  amount: number
  date: string
  dueDate: string
  notes: string
  priority: "low" | "medium" | "high"
}

const mockOrders: Order[] = [
  {
    id: "PS123456",
    customer: {
      name: "John Doe",
      email: "john@example.com",
      phone: "+91 98765 43210",
      address: "123 Main St, Mumbai, Maharashtra 400001",
    },
    service: "Basic Print",
    items: "Document Print - 50 pages, Color, Glossy, Spiral Binding",
    status: "processing",
    amount: 750,
    date: "2024-01-15T10:30:00Z",
    dueDate: "2024-01-16T18:00:00Z",
    notes: "Customer requested rush delivery",
    priority: "high",
  },
  {
    id: "PS123457",
    customer: {
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+91 98765 43211",
      address: "456 Oak Ave, Delhi, Delhi 110001",
    },
    service: "Business Cards",
    items: "500 cards - Standard size, Premium cardstock, Glossy finish",
    status: "printing",
    amount: 1500,
    date: "2024-01-15T09:15:00Z",
    dueDate: "2024-01-17T12:00:00Z",
    notes: "Logo file provided separately",
    priority: "medium",
  },
  {
    id: "PS123458",
    customer: {
      name: "Mike Johnson",
      email: "mike@example.com",
      phone: "+91 98765 43212",
      address: "789 Pine Rd, Bangalore, Karnataka 560001",
    },
    service: "Brochures",
    items: "Corporate Template - A4, Glossy, Tri-fold, 200 pieces",
    status: "pending",
    amount: 2800,
    date: "2024-01-15T08:45:00Z",
    dueDate: "2024-01-18T15:00:00Z",
    notes: "Waiting for final approval from client",
    priority: "low",
  },
  {
    id: "PS123459",
    customer: {
      name: "Sarah Wilson",
      email: "sarah@example.com",
      phone: "+91 98765 43213",
      address: "321 Elm St, Chennai, Tamil Nadu 600001",
    },
    service: "Gift Cards",
    items: "Birthday Special Template - Premium Gold, 10 cards",
    status: "ready",
    amount: 200,
    date: "2024-01-14T16:20:00Z",
    dueDate: "2024-01-15T10:00:00Z",
    notes: "Ready for pickup",
    priority: "medium",
  },
]

const statusConfig = {
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800", icon: Clock },
  processing: { label: "Processing", color: "bg-blue-100 text-blue-800", icon: Package },
  printing: { label: "Printing", color: "bg-purple-100 text-purple-800", icon: FileText },
  ready: { label: "Ready", color: "bg-green-100 text-green-800", icon: CheckCircle },
  delivered: { label: "Delivered", color: "bg-gray-100 text-gray-800", icon: Truck },
  cancelled: { label: "Cancelled", color: "bg-red-100 text-red-800", icon: X },
}

const priorityConfig = {
  low: { label: "Low", color: "bg-gray-100 text-gray-800" },
  medium: { label: "Medium", color: "bg-yellow-100 text-yellow-800" },
  high: { label: "High", color: "bg-red-100 text-red-800" },
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders)
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(mockOrders)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [showOrderDialog, setShowOrderDialog] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const { toast } = useToast()

  useEffect(() => {
    let filtered = orders

    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.service.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter)
    }

    if (priorityFilter !== "all") {
      filtered = filtered.filter((order) => order.priority === priorityFilter)
    }

    setFilteredOrders(filtered)
  }, [orders, searchTerm, statusFilter, priorityFilter])

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order)
    setIsEditing(false)
    setShowOrderDialog(true)
  }

  const handleEditOrder = (order: Order) => {
    setSelectedOrder(order)
    setIsEditing(true)
    setShowOrderDialog(true)
  }

  const handleUpdateOrder = () => {
    if (!selectedOrder) return

    setOrders((prev) => prev.map((order) => (order.id === selectedOrder.id ? selectedOrder : order)))

    toast({
      title: "Order Updated",
      description: `Order ${selectedOrder.id} has been updated successfully.`,
    })

    setShowOrderDialog(false)
    setSelectedOrder(null)
  }

  const handleStatusChange = (orderId: string, newStatus: Order["status"]) => {
    setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))

    toast({
      title: "Status Updated",
      description: `Order ${orderId} status changed to ${newStatus}.`,
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg gradient-primary">
          <Package className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Order Management
          </h1>
          <p className="text-muted-foreground">Manage and track all customer orders</p>
        </div>
      </div>

      {/* Filters */}
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
              <Label>Search Orders</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by order ID, customer, or service..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 glass border-white/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="glass border-white/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="printing">Printing</SelectItem>
                  <SelectItem value="ready">Ready</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Priority</Label>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="glass border-white/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card className="glass-card border-0">
        <CardHeader>
          <CardTitle>Orders ({filteredOrders.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const statusInfo = statusConfig[order.status]
              const priorityInfo = priorityConfig[order.priority]
              const StatusIcon = statusInfo.icon

              return (
                <div
                  key={order.id}
                  className={`p-4 rounded-lg border transition-all hover:shadow-md ${
                    isOverdue(order.dueDate) && order.status !== "delivered"
                      ? "border-red-200 bg-red-50/50"
                      : "border-white/20 bg-white/5"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <StatusIcon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-semibold">#{order.id}</h3>
                          <Badge className={statusInfo.color}>{statusInfo.label}</Badge>
                          <Badge className={priorityInfo.color}>{priorityInfo.label}</Badge>
                          {isOverdue(order.dueDate) && order.status !== "delivered" && (
                            <Badge className="bg-red-100 text-red-800">Overdue</Badge>
                          )}
                        </div>
                        <p className="text-sm font-medium">{order.customer.name}</p>
                        <p className="text-sm text-muted-foreground">{order.service}</p>
                        <p className="text-xs text-muted-foreground mt-1">Due: {formatDate(order.dueDate)}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-lg font-bold text-primary">₹{order.amount}</p>
                        <p className="text-xs text-muted-foreground">{formatDate(order.date)}</p>
                      </div>

                      <div className="flex gap-2">
                        <Select
                          value={order.status}
                          onValueChange={(value: Order["status"]) => handleStatusChange(order.id, value)}
                        >
                          <SelectTrigger className="w-32 glass border-white/20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="processing">Processing</SelectItem>
                            <SelectItem value="printing">Printing</SelectItem>
                            <SelectItem value="ready">Ready</SelectItem>
                            <SelectItem value="delivered">Delivered</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>

                        <Button size="sm" variant="ghost" onClick={() => handleViewOrder(order)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => handleEditOrder(order)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}

            {filteredOrders.length === 0 && (
              <div className="text-center py-12">
                <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Orders Found</h3>
                <p className="text-muted-foreground">Try adjusting your filters to see more results.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Order Details Dialog */}
      <Dialog open={showOrderDialog} onOpenChange={setShowOrderDialog}>
        <DialogContent className="glass-card border-0 max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Edit Order" : "Order Details"} - #{selectedOrder?.id}
            </DialogTitle>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6">
              {/* Customer Information */}
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Customer Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Name</Label>
                    {isEditing ? (
                      <Input
                        value={selectedOrder.customer.name}
                        onChange={(e) =>
                          setSelectedOrder({
                            ...selectedOrder,
                            customer: { ...selectedOrder.customer, name: e.target.value },
                          })
                        }
                        className="glass border-white/20"
                      />
                    ) : (
                      <p className="text-sm">{selectedOrder.customer.name}</p>
                    )}
                  </div>
                  <div>
                    <Label>Email</Label>
                    {isEditing ? (
                      <Input
                        value={selectedOrder.customer.email}
                        onChange={(e) =>
                          setSelectedOrder({
                            ...selectedOrder,
                            customer: { ...selectedOrder.customer, email: e.target.value },
                          })
                        }
                        className="glass border-white/20"
                      />
                    ) : (
                      <p className="text-sm">{selectedOrder.customer.email}</p>
                    )}
                  </div>
                  <div>
                    <Label>Phone</Label>
                    {isEditing ? (
                      <Input
                        value={selectedOrder.customer.phone}
                        onChange={(e) =>
                          setSelectedOrder({
                            ...selectedOrder,
                            customer: { ...selectedOrder.customer, phone: e.target.value },
                          })
                        }
                        className="glass border-white/20"
                      />
                    ) : (
                      <p className="text-sm">{selectedOrder.customer.phone}</p>
                    )}
                  </div>
                  <div>
                    <Label>Address</Label>
                    {isEditing ? (
                      <Textarea
                        value={selectedOrder.customer.address}
                        onChange={(e) =>
                          setSelectedOrder({
                            ...selectedOrder,
                            customer: { ...selectedOrder.customer, address: e.target.value },
                          })
                        }
                        className="glass border-white/20"
                        rows={2}
                      />
                    ) : (
                      <p className="text-sm">{selectedOrder.customer.address}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Order Information */}
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Order Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Service</Label>
                    <p className="text-sm">{selectedOrder.service}</p>
                  </div>
                  <div>
                    <Label>Amount</Label>
                    <p className="text-sm font-bold text-primary">₹{selectedOrder.amount}</p>
                  </div>
                  <div>
                    <Label>Status</Label>
                    {isEditing ? (
                      <Select
                        value={selectedOrder.status}
                        onValueChange={(value: Order["status"]) =>
                          setSelectedOrder({ ...selectedOrder, status: value })
                        }
                      >
                        <SelectTrigger className="glass border-white/20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="processing">Processing</SelectItem>
                          <SelectItem value="printing">Printing</SelectItem>
                          <SelectItem value="ready">Ready</SelectItem>
                          <SelectItem value="delivered">Delivered</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <Badge className={statusConfig[selectedOrder.status].color}>
                        {statusConfig[selectedOrder.status].label}
                      </Badge>
                    )}
                  </div>
                  <div>
                    <Label>Priority</Label>
                    {isEditing ? (
                      <Select
                        value={selectedOrder.priority}
                        onValueChange={(value: Order["priority"]) =>
                          setSelectedOrder({ ...selectedOrder, priority: value })
                        }
                      >
                        <SelectTrigger className="glass border-white/20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <Badge className={priorityConfig[selectedOrder.priority].color}>
                        {priorityConfig[selectedOrder.priority].label}
                      </Badge>
                    )}
                  </div>
                </div>

                <div>
                  <Label>Items</Label>
                  <p className="text-sm">{selectedOrder.items}</p>
                </div>

                <div>
                  <Label>Notes</Label>
                  {isEditing ? (
                    <Textarea
                      value={selectedOrder.notes}
                      onChange={(e) => setSelectedOrder({ ...selectedOrder, notes: e.target.value })}
                      className="glass border-white/20"
                      rows={3}
                    />
                  ) : (
                    <p className="text-sm">{selectedOrder.notes || "No notes"}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Order Date</Label>
                    <p className="text-sm">{formatDate(selectedOrder.date)}</p>
                  </div>
                  <div>
                    <Label>Due Date</Label>
                    <p className="text-sm">{formatDate(selectedOrder.dueDate)}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setShowOrderDialog(false)} className="glass border-white/20">
                  Cancel
                </Button>
                {isEditing && (
                  <Button onClick={handleUpdateOrder} className="gradient-primary text-white border-0">
                    Save Changes
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
