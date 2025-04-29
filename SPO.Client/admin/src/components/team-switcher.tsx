import {
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import AppLogo from '@/assets/images/spotify-logo.svg'

export function TeamSwitcher() {

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="h-13 w-full">
          <img src={AppLogo} alt="Spotify Logo" className="w-full h-full object-contain" />
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
