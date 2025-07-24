"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import { TrendingUp, DollarSign, Users, Package, Target } from "lucide-react"

// Mock data for analytics
const revenueData = [
  { month: "Jan", revenue: 45000, orders: 120, customers: 89 },
  { month: "Feb", revenue: 52000, orders: 140, customers: 95 },
  { month: "Mar", revenue: 48000, orders: 130, customers: 88 },
  { month: "Apr", revenue: 61000, orders: 165, customers: 102 },
  { month: "May", revenue: 55000, orders: 150, customers: 98 },
  { month: "Jun", revenue: 67000, orders: 180, customers: 115 },
  { month: "Jul", revenue: 72000, orders: 195, customers: 125 },
  { month: "Aug", revenue: 68000, orders: 185, customers: 120 },
  { month: "Sep", revenue: 75000, orders: 200, customers: 130 },
  { month: "Oct", revenue: 82000, orders: 220, customers: 140 },
  { month: "Nov", revenue: 78000, orders: 210, customers: 135 },
  { month: "Dec", revenue: 85000, orders: 230, customers: 150 },
]

const serviceData = [
  { name: "Basic Print", value: 45, revenue: 180000, color: "#8884d8" },
  { name: "Business Cards", value: 25, revenue: 125000, color: "#82ca9d" },
  { name: "Brochures", value: 20, revenue: 95000, color: "#ffc658" },
  { name: "Gift Cards", value: 10, revenue: 48000, color: "#ff7300" },
]

const dailyOrdersData = [
  { day: "Mon", orders: 25, revenue: 3200 },
  { day: "Tue", orders: 32, revenue: 4100 },
  { day: "Wed", orders: 28, revenue: 3600 },
  { day: "Thu", orders: 35, revenue: 4500 },
  { day: "Fri", orders: 42, revenue: 5400 },
  { day: "Sat", orders: 38, revenue: 4900 },
  { day: "Sun", orders: 22, revenue: 2800 },
]

const customerGrowthData = [
  { month: "Jan", newCustomers: 45, totalCustomers: 450 },
  { month: "Feb", newCustomers: 52, totalCustomers: 502 },
  { month: "Mar", newCustomers: 48, totalCustomers: 550 },
  { month: "Apr", newCustomers: 61, totalCustomers: 611 },
  { month: "May", newCustomers: 55, totalCustomers: 666 },
  { month: "Jun", newCustomers: 67, totalCustomers: 733 },
]

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg gradient-primary">
            <TrendingUp className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Analytics Dashboard
            </h1>
            <p className="text-muted-foreground">Detailed business insights and performance metrics</p>
          </div>
        </div>
        <Select defaultValue="12months">
          <SelectTrigger className="w-40 glass border-white/20">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 Days</SelectItem>
            <SelectItem value="30days">Last 30 Days</SelectItem>
            <SelectItem value="3months">Last 3 Months</SelectItem>
            <SelectItem value="12months">Last 12 Months</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-card border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">₹7,48,000</p>
                <p className="text-xs text-green-600 mt-1">+15.3% from last period</p>
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
                <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold">2,025</p>
                <p className="text-xs text-green-600 mt-1">+12.8% from last period</p>
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
                <p className="text-sm font-medium text-muted-foreground">New Customers</p>
                <p className="text-2xl font-bold">328</p>
                <p className="text-xs text-green-600 mt-1">+8.2% from last period</p>
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
                <p className="text-sm font-medium text-muted-foreground">Avg Order Value</p>
                <p className="text-2xl font-bold">₹369</p>
                <p className="text-xs text-green-600 mt-1">+2.1% from last period</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Target className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue and Orders Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, \"Revenue\"]]} />\
                <Area type=\"monotone\" dataKey=\"revenue\" stroke=\"#8884d8\" fill=\"#8884d8\" fillOpacity={0.6} />\
              </AreaChart>\
            </ResponsiveContainer>\
          </CardContent>\
        </Card>
\
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle>Orders Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [value, "Orders"]} />
                <Line type="monotone" dataKey="orders" stroke="#82ca9d" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>\
          </CardContent>
        </Card>
      </div>

      {/* Service Distribution and Daily Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle>Service Revenue Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={serviceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}\
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}\
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="revenue"
                >\
                  {serviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}\
                </Pie>\
                <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, "Revenue"]} />\
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-card border-0">
          <CardHeader>\
            <CardTitle>Daily Performance (This Week)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dailyOrdersData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="orders" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Customer Growth and Service Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle>Customer Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={customerGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="newCustomers" stackId="1" stroke="#8884d8" fill="#8884d8" />
                <Area type="monotone" dataKey="totalCustomers" stackId="2" stroke="#82ca9d" fill="#82ca9d" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle>Service Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {serviceData.map((service, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: service.color }} />
                    <span className="font-medium">{service.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">₹{service.revenue.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">{service.value}% of total</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Insights */}
      <Card className="glass-card border-0">
        <CardHeader>
          <CardTitle>Performance Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <TrendingUp className="h-12 w-12 mx-auto text-green-600 mb-4" />
              <h3 className="font-semibold text-green-800 mb-2">Revenue Growth</h3>
              <p className="text-sm text-green-700">
                Revenue has increased by 15.3% compared to the previous period, showing strong business growth.
              </p>
            </div>
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <Users className="h-12 w-12 mx-auto text-blue-600 mb-4" />
              <h3 className="font-semibold text-blue-800 mb-2">Customer Acquisition</h3>
              <p className="text-sm text-blue-700">
                New customer acquisition rate is up 8.2%, indicating effective marketing and customer satisfaction.
              </p>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <Package className="h-12 w-12 mx-auto text-purple-600 mb-4" />
              <h3 className="font-semibold text-purple-800 mb-2">Order Volume</h3>
              <p className="text-sm text-purple-700">
                Order volume increased by 12.8%, with Friday being the peak day for orders this week.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )\
}
