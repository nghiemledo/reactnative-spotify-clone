import * as React from "react"
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { SidebarData } from "@/faker/SidebarData"
import { useAuth } from "@/contexts/AuthContext"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={SidebarData.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{
          name: user?.fullName || "Unknown",
          email: user?.email || "No email",
          avatar: user?.urlAvatar || "",
        }} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
