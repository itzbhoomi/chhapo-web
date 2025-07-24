import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, password, name, phone, isLogin } = body

    if (!email || !password) {
      return NextResponse.json({ error: "Missing credentials" }, { status: 400 })
    }

    if (isLogin) {
      const existing = await prisma.login.findUnique({ where: { email } })

      if (!existing || existing.password !== password) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
      }

      return NextResponse.json({ message: "Login successful", user: existing })
    } else {
      const existing = await prisma.login.findUnique({ where: { email } })
      if (existing) {
        return NextResponse.json({ error: "User already exists" }, { status: 409 })
      }

      const user = await prisma.login.create({
        data: { email, password, name},
      })

      return NextResponse.json({ message: "Account created", user })
    }
  } catch (err) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}
