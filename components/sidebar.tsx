import { Printer, CreditCard, FileText, Gift, Package, Home, History, User } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import Link from "next/link"

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Basic Print",
    url: "/print",
    icon: Printer,
  },
  {
    title: "Gift Cards",
    url: "/giftcard",
    icon: Gift,
  },
  {
    title: "Business Cards",
    url: "/business-card",
    icon: CreditCard,
  },
  {
    title: "Brochures",
    url: "/brochure",
    icon: FileText,
  },
  {
    title: "Bulk Orders",
    url: "/bulk-order",
    icon: Package,
  },
  {
    title: "Order History",
    url: "/historys",
    icon: History,
  },
  {
    title: "Login",
    url: "/login",
    icon: User,
  },
]

export function AppSidebar() {
  return (
    <Sidebar className="glass-sidebar border-r-0">
      <SidebarHeader className="p-4 border-b border-white/20">
        <div className="flex items-center gap-2">
          <Printer className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Chhapo</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Services</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
