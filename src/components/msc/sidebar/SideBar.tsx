import Image from "next/image";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
} from "@/components/ui/sidebar"
import { ISideBarItem } from "@/server/interfaces/sideBarItem"
import SideBarItem from "./SideBarItem"
import { getUserMenu } from "@/server/db/queries/menu";




export async function AppSidebar() {
  const userMenu: {member: ISideBarItem[], admin: ISideBarItem[]} = await getUserMenu();
  
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
              {userMenu.member.map((item) => (
                <SideBarItem key={item.name} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {userMenu.admin.length > 0 && (
        <SidebarGroup>
          <SidebarGroupLabel>Admin</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {userMenu.admin.map((item) => (
                <SideBarItem key={item.name} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  )
}
