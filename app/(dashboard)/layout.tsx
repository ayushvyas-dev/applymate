import DashboardNavbar from '@/components/dashboard/Navbar';
import AppSidebar from '@/components/dashboard/Sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';

  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/');
  }
  const avatar = session.user.image ?? '/default-avatar.png';

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <div className='h-screen w-full flex flex-col bg-background'>
        <header className=' shrink-0'>
          <DashboardNavbar avatar={avatar} />
        </header>

        <div className='flex flex-1 overflow-hidden'>
          <AppSidebar />

          <main className='flex-1 overflow-y-auto p-4 '>{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
