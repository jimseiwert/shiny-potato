import Image from "next/image";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
} from "@/components/ui/sidebar"
import { ISideBarItem } from "@/app/interfaces/sideBarItem.interface"
import SideBarItem from "./SideBarItem"
import { ArrowRightCircle, Calendar, ChartBar, CircleDollarSign, Cog, CookingPot, Files, FileUser, Fish, House, Images, Newspaper, User, Users } from "lucide-react"


const navigation: ISideBarItem[] = [
  { name: 'Dashboard', href: '/member/dashboard', icon: House },
  // { name: 'Forum', href: '/member/forum', icon: User },
  // { name: 'Fishing', href: '/member/fishing', icon: Fish },
  { name: 'Events', href: '/member/events', icon: Calendar },
  { name: 'Documents', href: '/member/documents', icon: Files },
  // { name: 'Gallery', href: '/member/gallery', icon: Images   },
]

const adminNavigation: ISideBarItem[]  = [
  { name: 'Applications', href: '/admin/applications', icon: FileUser },
  { name: 'Bulletins', href: '/admin/bulletins', icon: Newspaper },
  { name: 'Dinners', href: '/admin/dinners', icon: CookingPot },
  { name: 'Fishing', href: '/admin/fishing', icon: Fish},
  { name: 'Members', href: '/admin/members', icon: Users },
  { name: 'Statements', href: '/admin/statements', icon: CircleDollarSign},
  { name: 'Reports', href: '/admin/reports', icon: ChartBar},
  { name: 'Conversion', href: '/admin/conversion', icon: ArrowRightCircle},
]
export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarHeader>
          <div className="flex group items-center gap-2">
          <Image src="/logo.png" alt="logo" width={40} height={40} />
          <span className="text-xl font-semibold">Maywood Sportsmens Club</span>
          </div>
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupLabel>Member</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SideBarItem key={item.name} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Admin</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminNavigation.map((item) => (
                <SideBarItem key={item.name} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarFooter>
        <SideBarItem key={"profile"} item={{name: 'Settings', href: '/member/profile', icon: Cog}} />
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  )
}
