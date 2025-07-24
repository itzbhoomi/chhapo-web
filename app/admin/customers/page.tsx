"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Users, Search, Mail, Phone, MapPin, Calendar, Package, TrendingUp } from "lucide-react"

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  address: string
  joinDate: string
  totalOrders: number
  totalSpent: number
  lastOrder: string
  status: "active" | "inactive"
}

const mockCustomers: Customer[] = [
  {
    id: "CUST001",
    name: "Tanya",
    email: "tanya@rod.com",
    phone: "+91 98765 43210",
    address: "123 Main St, Mumbai, Maharashtra 400001",
    joinDate: "2023-06-15",
    totalOrders: 12,
    totalSpent: 8500,
    lastOrder: "2024-01-15",
    status: "active",
  },
  {
    id: "CUST002",
    name: "Riya",
    email: "riya@rat.com",
    phone: "+91 98765 43211",
    address: "456 Oak Ave, Delhi, Delhi 110001",
    joinDate: "2023-08-22",
    totalOrders: 8,
    totalSpent: 5200,
    lastOrder: "2024-01-10",
    status: "active",
  },
  {
    id: "CUST003",
    name: "Bhoomi",
    email: "bhu@sak.com",
    phone: "+91 98765 43212",
    address: "789 Pine Rd, Bangalore, Karnataka 560001",
    joinDate: "2023-04-10",
    totalOrders: 15,
    totalSpent: 12300,
    lastOrder: "2024-01-12",
    status: "active",
  },
  {
    id: "CUST004",
    name: "Ayush",
    email: "ayu@shu.com",
    phone: "+91 98765 43213",
    address: "321 Elm St, Chennai, Tamil Nadu 600001",
    joinDate: "2023-09-05",
    totalOrders: 6,
    totalSpent: 3800,
    lastOrder: "2023-12-20",
    status: "inactive",
  },
  {
    id: "CUST005",
    name: "KUshagra",
    email: "kush@sa.com",
    phone: "+91 98765 43214",
    address: "654 Maple Dr, Pune, Maharashtra 411001",
    joinDate: "2023-07-18",
    totalOrders: 20,
    totalSpent: 15600,
    lastOrder: "2024-01-14",
    status: "active",
  },
]

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers)
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>(mockCustomers)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [showCustomerDialog, setShowCustomerDialog] = useState(false)

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    const filtered = customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(term.toLowerCase()) ||
        customer.email.toLowerCase().includes(term.toLowerCase()) ||
        customer.phone.includes(term),
    )
    setFilteredCustomers(filtered)
  }

  const handleViewCustomer = (customer: Customer) => {
    setSelectedCustomer(customer)
    setShowCustomerDialog(true)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const totalCustomers = customers.length
  const activeCustomers = customers.filter((c) => c.status === "active").length
  const totalRevenue = customers.reduce((sum, customer) => sum + customer.totalSpent, 0)
  const avgOrderValue = totalRevenue / customers.reduce((sum, customer) => sum + customer.totalOrders, 0)

  return (
    <div className="space-y-6">
      
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg gradient-primary">
          <Users className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Customer Management
          </h1>
          <p className="text-muted-foreground">Manage and view customer information</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-card border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Customers</p>
                <p className="text-2xl font-bold">{totalCustomers}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Customers</p>
                <p className="text-2xl font-bold">{activeCustomers}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</p>
              </div>
              <Package className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Order Value</p>
                <p className="text-2xl font-bold">₹{Math.round(avgOrderValue)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card border-0">
        <CardContent className="p-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search customers by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 glass border-white/20"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card border-0">
        <CardHeader>
          <CardTitle>Customers ({filteredCustomers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredCustomers.map((customer) => (
              <div
                key={customer.id}
                className="flex items-center justify-between p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-all cursor-pointer"
                onClick={() => handleViewCustomer(customer)}
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {getInitials(customer.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-semibold">{customer.name}</h3>
                      <Badge
                        className={
                          customer.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }
                      >
                        {customer.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{customer.email}</p>
                    <p className="text-sm text-muted-foreground">{customer.phone}</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-semibold">{customer.totalOrders} orders</p>
                  <p className="text-sm text-primary font-bold">₹{customer.totalSpent.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Last: {formatDate(customer.lastOrder)}</p>
                </div>
              </div>
            ))}

            {filteredCustomers.length === 0 && (
              <div className="text-center py-12">
                <Users className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Customers Found</h3>
                <p className="text-muted-foreground">Try adjusting your search terms.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={showCustomerDialog} onOpenChange={setShowCustomerDialog}>
        <DialogContent className="glass-card border-0 max-w-2xl">
          <DialogHeader>
            <DialogTitle>Customer Details</DialogTitle>
          </DialogHeader>

          {selectedCustomer && (
            <div className="space-y-6">
              
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                    {getInitials(selectedCustomer.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-bold">{selectedCustomer.name}</h2>
                  <p className="text-muted-foreground">Customer ID: {selectedCustomer.id}</p>
                  <Badge
                    className={
                      selectedCustomer.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }
                  >
                    {selectedCustomer.status}
                  </Badge>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">{selectedCustomer.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">{selectedCustomer.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 md:col-span-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                    <div>
                      <p className="text-sm font-medium">Address</p>
                      <p className="text-sm text-muted-foreground">{selectedCustomer.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Order Statistics</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">{selectedCustomer.totalOrders}</p>
                    <p className="text-sm text-blue-800">Total Orders</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">₹{selectedCustomer.totalSpent.toLocaleString()}</p>
                    <p className="text-sm text-green-800">Total Spent</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">
                      ₹{Math.round(selectedCustomer.totalSpent / selectedCustomer.totalOrders)}
                    </p>
                    <p className="text-sm text-purple-800">Avg Order</p>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <p className="text-2xl font-bold text-orange-600">{formatDate(selectedCustomer.lastOrder)}</p>
                    <p className="text-sm text-orange-800">Last Order</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Account Information</h3>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Member Since</p>
                    <p className="text-sm text-muted-foreground">{formatDate(selectedCustomer.joinDate)}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline" className="glass border-white/20 bg-transparent">
                  View Orders
                </Button>
                <Button variant="outline" className="glass border-white/20 bg-transparent">
                  Send Message
                </Button>
                <Button onClick={() => setShowCustomerDialog(false)} className="gradient-primary text-white border-0">
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
