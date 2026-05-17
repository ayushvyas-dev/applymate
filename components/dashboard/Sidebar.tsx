'use client';
import Link from 'next/link';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { ClipboardList, FileText, Home } from 'lucide-react';

const items = [
  { title: 'Home', url: '/dashboard', icon: Home },
  { title: 'Board', url: '/board', icon: ClipboardList },
  { title: 'Documents', url: '/documents', icon: FileText },
];

export default function AppSidebar() {
  return (
    <Sidebar
      variant='sidebar'
      className='top-14 h-[calc(100svh-3.5rem)] mt-0.5  '
      collapsible='icon'
    >
      <SidebarHeader></SidebarHeader>
      <SidebarContent>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarContent>
      <SidebarFooter>
        <SidebarTrigger />
      </SidebarFooter>
    </Sidebar>
  );
}
