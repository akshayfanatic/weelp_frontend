import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/app/components/Pages/DASHBOARD/admin/app-sidebar';
import AdminHeader from '@/app/components/Pages/DASHBOARD/admin/header';
import { Toaster } from '@/components/ui/toaster';

export default function AdminLayout({ children }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-50 w-full">
        <div>
          <AppSidebar />
        </div>
        <div className="flex flex-col w-full">
          <>
            <AdminHeader />
          </>
          <main className="flex-1 overflow-auto tfc_scroll">
            <div className="container mx-auto p-8 sm:p-12 w-full">{children}</div>
          </main>
        </div>
        <Toaster />
      </div>
    </SidebarProvider>
  );
}
