import {
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import AppLogo from '@/assets/images/spotify-logo.svg'

export function TeamSwitcher() {

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="h-14 py-1 items-center justify-center flex">
          <img src={AppLogo} alt="Spotify Logo" className="object-contain w-full h-full" />
        </div>
        <hr className="border-spacing-x-0.5 w-full" />
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
