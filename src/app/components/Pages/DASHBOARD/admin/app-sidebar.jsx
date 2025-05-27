"use client";

import * as React from "react";
import { Menu } from "lucide-react";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { Description, DialogTitle } from "@radix-ui/react-dialog";
import { DashboardAdminNav } from "@/app/Data/adminData";
import { useSession } from "next-auth/react";

const { user, adminRoutes } = DashboardAdminNav;

export function AppSidebar({ ...props }) {
  const { state, open, toggleSidebar, isMobile } = useSidebar();
  const { data: session } = useSession() //getsssion
  return (
    <>
      {!isMobile ? (
        <Sidebar collapsible="icon" {...props}>
          <SidebarHeader className="border border-r-0 h-16 px-1 mx-1  flex flex-row justify-start items-center">
            <div
              className={`flex w-full  items-center gap-4 ${
                open ? "px-6" : "justify-center"
              }`}
            >
              <Menu
                onClick={toggleSidebar}
                className="hover:bg-gray-100 cursor-pointer"
              />

              {state !== "collapsed" ? (
                <img
                  src="/assets/images/SiteLogo.png"
                  alt="Logo"
                  className="h-10"
                />
              ) : (
                ""
              )}
            </div>
          </SidebarHeader>
          <SidebarContent className={"tfc_scroll"}>
            <NavMain items={adminRoutes} />
          </SidebarContent>
          <SidebarFooter>
            <NavUser user={user} />
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>
      ) : (
        <Sidebar collapsible="icon" {...props}>
          <DialogTitle className="sr-only"> Sidebar Title</DialogTitle>
          <Description className="sr-only">Sidebar Description</Description>
          <SidebarHeader className="border border-r-0 h-16 px-1 mx-1  flex flex-row justify-start items-center">
            <div
              className={`flex w-full  items-center gap-4 ${
                open ? "px-6" : "justify-center"
              }`}
            >
              <Menu
                onClick={toggleSidebar}
                className="hover:bg-gray-100 cursor-pointer"
              />

              {state !== "collapsed" ? (
                <img
                  src="/assets/images/SiteLogo.png"
                  alt="Logo"
                  className="h-10"
                />
              ) : (
                ""
              )}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <NavMain items={adminRoutes} />
          </SidebarContent>
          <SidebarFooter>
            <NavUser user={user} />
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>
      )}
    </>
  );
}
