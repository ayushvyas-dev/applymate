import DashboardNavbar from '@/components/dashboard/Navbar';
import AppSidebar from '@/components/dashboard/Sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { cookies } from 'next/headers';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <div className='min-h-screen w-full flex flex-col bg-background'>
        <header className=' '>
          <DashboardNavbar />
        </header>

        <div className='flex flex-1 oveflow-hidden'>
          <AppSidebar />

          <main className='flex-1 overflow-y-auto p-4 '>{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
