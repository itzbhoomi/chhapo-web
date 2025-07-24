"use client"

import React, { useState } from "react"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff, Printer, Mail, Lock, User, Phone } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (!formData.email || !formData.password) {
      toast.error("Please fill in all required fields")
      setIsLoading(false)
      return
    }

    if (!isLogin) {
      if (!formData.name) {
        toast.error("Please fill in all required fields")
        setIsLoading(false)
        return
      }

      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match")
        setIsLoading(false)
        return
      }
    }

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          isLogin,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong")
      }

      localStorage.setItem("user", JSON.stringify(data.user))
      toast.success(data.message)
      router.push("/")
    } catch (err: any) {
      toast.error(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleMode = () => {
    setIsLogin(!isLogin)
    setFormData({
      email: "",
      password: "",
      name: "",
      confirmPassword: "",
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="p-3 rounded-full gradient-primary">
              <Printer className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Chhapo
          </h1>
          <p className="text-muted-foreground mt-2">
            {isLogin ? "Welcome back! Sign in to your account" : "Create your PrintSprint account"}
          </p>
        </div>

        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="text-center">{isLogin ? "Sign In" : "Create Account"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="pl-10 glass border-white/20"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="pl-10 glass border-white/20"
                  />
                </div>
              </div>

              <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="pl-10 glass border-white/20"
                />
              </div>
            </div>


              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className="pl-10 pr-10 glass border-white/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      className="pl-10 glass border-white/20"
                    />
                  </div>
                </div>
              )}

              {isLogin && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span>Remember me</span>
                  </label>
                  <Link href="#" className="text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
              )}

              <Button type="submit" className="w-full gradient-primary text-white border-0 h-12" disabled={isLoading}>
                {isLoading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
              </Button>
            </form>

            <div className="mt-6">
              <Separator className="my-4" />
              <div className="text-center text-sm">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <button onClick={toggleMode} className="text-primary hover:underline font-medium">
                  {isLogin ? "Sign up" : "Sign in"}
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6 text-sm text-muted-foreground">
          <p>By continuing, you agree to our</p>
          <div className="flex justify-center gap-4 mt-1">
            <Link href="#" className="hover:text-primary">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-primary">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
