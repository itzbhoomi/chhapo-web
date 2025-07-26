"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import { Shield, Users, Package, TrendingUp, DollarSign, Clock, Eye } from "lucide-react"

// Mock data for dashboard
const revenueData = [
  { month: "Jan", revenue: 45000, orders: 120 },
  { month: "Feb", revenue: 52000, orders: 140 },
  { month: "Mar", revenue: 48000, orders: 130 },
  { month: "Apr", revenue: 61000, orders: 165 },
  { month: "May", revenue: 55000, orders: 150 },
  { month: "Jun", revenue: 67000, orders: 180 },
]

const serviceData = [
  { name: "Basic Print", value: 45, color: "#8884d8" },
  { name: "Business Cards", value: 25, color: "#82ca9d" },
  { name: "Brochures", value: 20, color: "#ffc658" },
  { name: "Gift Cards", value: 10, color: "#ff7300" },
]

const recentOrders = [
  {
    id: "PS123456",
    customer: "John Doe",
    service: "Basic Print",
    amount: 150,
    status: "processing",
    date: "2024-01-15T10:30:00Z",
  },
  {
    id: "PS123457",
    customer: "Jane Smith",
    service: "Business Cards",
    amount: 1500,
    status: "completed",
    date: "2024-01-15T09:15:00Z",
  },
  {
    id: "PS123458",
    customer: "Mike Johnson",
    service: "Brochures",
    amount: 2800,
    status: "pending",
    date: "2024-01-15T08:45:00Z",
  },
  {
    id: "PS123459",
    customer: "Sarah Wilson",
    service: "Gift Cards",
    amount: 200,
    status: "delivered",
    date: "2024-01-14T16:20:00Z",
  },
]

const statusConfig = {
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800" },
  processing: { label: "Processing", color: "bg-blue-100 text-blue-800" },
  completed: { label: "Completed", color: "bg-green-100 text-green-800" },
  delivered: { label: "Delivered", color: "bg-purple-100 text-purple-800" },
  cancelled: { label: "Cancelled", color: "bg-red-100 text-red-800" },
}

export default function AdminDashboard() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [stats, setStats] = useState({
    totalOrders: 1245,
    totalRevenue: 328000,
    activeCustomers: 892,
    pendingOrders: 23,
  })

  useEffect(() => {
    const adminAuth = localStorage.getItem("adminAuth")
    if (adminAuth === "true") {
      setIsAdmin(true)
    }
  }, [])

  const handleAdminLogin = () => {
    const password = prompt("Enter admin password:")
    if (password === "admin123") {
      localStorage.setItem("adminAuth", "true")
      setIsAdmin(true)
    } else {
      alert("Invalid password")
    }
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
        <Card className="glass-card border-0 max-w-md w-full">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <Shield className="h-8 w-8 text-red-600" />
            </div>
            <CardTitle className="text-xl">Admin Access Required</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">This area is restricted to authorized administrators only.</p>
            <Button onClick={handleAdminLogin} className="w-full gradient-primary text-white border-0">
              Admin Login
            </Button>
            <p className="text-xs text-muted-foreground">Demo password: admin123</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">Manage your PrintSprint business operations</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-green-100 text-green-800">
            <div className="w-2 h-2 bg-green-600 rounded-full mr-2" />
            Online
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              localStorage.removeItem("adminAuth")
              setIsAdmin(false)
            }}
            className="glass border-white/20"
          >
            Logout
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-card border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold">{stats.totalOrders.toLocaleString()}</p>
                <p className="text-xs text-green-600 mt-1">+12% from last month</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">₹{stats.totalRevenue.toLocaleString()}</p>
                <p className="text-xs text-green-600 mt-1">+18% from last month</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Customers</p>
                <p className="text-2xl font-bold">{stats.activeCustomers.toLocaleString()}</p>
                <p className="text-xs text-green-600 mt-1">+8% from last month</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Orders</p>
                <p className="text-2xl font-bold">{stats.pendingOrders}</p>
                <p className="text-xs text-yellow-600 mt-1">Needs attention</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Revenue Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value, name) => [`₹${value.toLocaleString()}`, "Revenue"]} />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle>Service Distribution</CardTitle>
          </CardHeader>
          <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={serviceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name ?? ""} ${(percent ?? 0) * 100}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {serviceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          </CardContent>
        </Card>
      </div>

      <Card className="glass-card border-0">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Orders</CardTitle>
          <Button variant="outline" size="sm" className="glass border-white/20 bg-transparent">
            <Eye className="h-4 w-4 mr-2" />
            View All
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-white/10 rounded-lg">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-semibold">#{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.customer}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{order.service}</p>
                    <p className="text-xs text-muted-foreground">{new Date(order.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge className={statusConfig[order.status as keyof typeof statusConfig].color}>
                    {statusConfig[order.status as keyof typeof statusConfig].label}
                  </Badge>
                  <p className="font-bold text-primary">₹{order.amount}</p>
                  <Button size="sm" variant="ghost">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card border-0 hover:shadow-lg transition-all cursor-pointer">
          <CardContent className="p-6 text-center">
            <Package className="h-12 w-12 mx-auto mb-4 text-blue-600" />
            <h3 className="font-semibold mb-2">Manage Orders</h3>
            <p className="text-sm text-muted-foreground">View and update order status</p>
          </CardContent>
        </Card>

        <Card className="glass-card border-0 hover:shadow-lg transition-all cursor-pointer">
          <CardContent className="p-6 text-center">
            <Users className="h-12 w-12 mx-auto mb-4 text-green-600" />
            <h3 className="font-semibold mb-2">Customer Management</h3>
            <p className="text-sm text-muted-foreground">Manage customer accounts</p>
          </CardContent>
        </Card>

        <Card className="glass-card border-0 hover:shadow-lg transition-all cursor-pointer">
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-12 w-12 mx-auto mb-4 text-purple-600" />
            <h3 className="font-semibold mb-2">Analytics</h3>
            <p className="text-sm text-muted-foreground">Detailed business insights</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
