"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "Gift Cards", value: 240 },
  { name: "Document Prints", value: 400 },
  { name: "Business Cards", value: 100 },
  { name: "Brochures", value: 300 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export default function AdminAnalyticsPage() {
  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Order Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                labelLine={false}
                label={(props) => {
                  const { name, percent } = props
                  return `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`
                }}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
