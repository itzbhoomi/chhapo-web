import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar"
import { Separator } from "@/components/ui/separator"
import { Toaster } from "sonner"  

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Chhapo - Print to impress. Delivered by express",
  description: "Custom printing solutions for all your needs",
  icons: {
    icon: "/logo.jpg", 
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 border-b border-white/20 px-4 glass backdrop-blur-md">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <div className="flex items-center gap-2">
                <span className="font-semibold">Chhapo</span>
              </div>
            </header>
            <main className="flex-1 overflow-auto p-4">{children}</main>
          </SidebarInset>
        </SidebarProvider>
  
        <Toaster richColors position="top-center" />
      </body>
    </html>
  )
}
