import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/app/components/Pages/DASHBOARD/user/app-sidebar";
import { Toaster } from "@/components/ui/toaster";

export default function UserLayout({ children }) {
  return (
    <SidebarProvider style={{
      // "--sidebar-width": "20rem",
    // "--sidebar-width-mobile": "20rem",
    }}>
      <AppSidebar />
      <main className="w-full dark:bg-black">
        <SidebarTrigger />
        {children}
        <Toaster />
      </main>
    </SidebarProvider>
  );
}
