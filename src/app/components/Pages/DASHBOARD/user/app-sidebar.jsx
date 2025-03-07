"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import UserMenu from "../UserMenu";
import { DashboardUserNav } from "@/app/Data/userData";
import Link from "next/link";
import { Description, DialogTitle } from "@radix-ui/react-dialog";

const { userRoutes } = DashboardUserNav;

export function AppSidebar() {
  const { state, open, toggleSidebar, isMobile } = useSidebar();

  return (
    <>
      {!isMobile ? (
        <Sidebar variant={"inset"} collapsible="icon" className={"border border-x-1"} >
          <SidebarInset>
            <SidebarContent>
              <SidebarGroup className={"h-full justify-between"}>
                <SidebarGroupLabel className={"hidden"}>
                  Application
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu className={" space-y-4"}>
                    {userRoutes.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          className=" text-black hover:bg-secondaryDark hover:text-white text-xl dark:hover:bg-secondaryDark "
                        >
                          <Link href={item.url}>
                            <item.icon />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
                <SidebarFooter className={"px-0"}>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <UserMenu />
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarFooter>
              </SidebarGroup>
            </SidebarContent>
          </SidebarInset>
        </Sidebar>
      ) : (
        <Sidebar variant={"inset"} collapsible="icon">
          <DialogTitle className="sr-only">Sidebar Mobile</DialogTitle>
          <Description className="sr-only">Sidebar Description</Description>
          <SidebarInset>
            <SidebarContent>
              <SidebarGroup className={"h-full justify-between"}>
                <SidebarGroupLabel className={"hidden"}>
                  Application
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu className={"space-y-2"}>
                    {userRoutes.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          className="font-medium hover:bg-secondaryDark hover:text-white text-sm"
                        >
                          <Link href={item.url}>
                            <item.icon />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
                <SidebarFooter>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <UserMenu />
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarFooter>
              </SidebarGroup>
            </SidebarContent>
          </SidebarInset>
        </Sidebar>
      )}
    </>
  );
}
