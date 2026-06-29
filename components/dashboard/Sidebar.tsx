'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  SidebarSeparator,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { TooltipProvider } from '@/components/ui/tooltip';
import {
  LayoutDashboard,
  Kanban,
  FolderOpen,
  FileSignature,
  ScanSearch,
  Sparkles,
} from 'lucide-react';

const items = [
  {
    title: 'Home',
    url: '/dashboard',
    icon: LayoutDashboard,
    gradient: 'from-violet-500/20 to-purple-500/20',
    iconColor: 'text-violet-500',
  },
  {
    title: 'Board',
    url: '/board',
    icon: Kanban,
    gradient: 'from-blue-500/20 to-cyan-500/20',
    iconColor: 'text-blue-500',
  },
  {
    title: 'Documents',
    url: '/documents',
    icon: FolderOpen,
    gradient: 'from-emerald-500/20 to-green-500/20',
    iconColor: 'text-emerald-500',
  },
  {
    title: 'Cover Letter',
    url: '/cover-letter',
    icon: FileSignature,
    gradient: 'from-amber-500/20 to-orange-500/20',
    iconColor: 'text-amber-500',
  },
  {
    title: 'Resume Matcher',
    url: '/resume-matcher',
    icon: ScanSearch,
    gradient: 'from-rose-500/20 to-pink-500/20',
    iconColor: 'text-rose-500',
  },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <TooltipProvider>
      <Sidebar
        variant='sidebar'
        className='top-14 h-[calc(100svh-3.5rem)]'
        collapsible='icon'
      >




        {/* ─── Navigation ─── */}
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className='mb-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground'>
              Navigation
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => {
                  const isActive = pathname === item.url;

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        tooltip={item.title}
                        className={
                          isActive
                            ? 'bg-primary/10 text-primary font-medium hover:bg-primary/15'
                            : 'text-muted-foreground hover:text-foreground'
                        }
                      >
                        <Link href={item.url}>
                          <span
                            className={`inline-flex size-7 shrink-0 items-center justify-center rounded-md bg-gradient-to-br ${item.gradient} transition-transform group-hover/menu-button:scale-105`}
                          >
                            <item.icon
                              className={`size-4 ${isActive ? item.iconColor : 'text-muted-foreground'}`}
                            />
                          </span>
                          <span className='truncate'>{item.title}</span>

                          {/* active indicator bar */}
                          {isActive && (
                            <span className='ml-auto h-5 w-0.5 rounded-full bg-primary' />
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {/* ─── Footer: collapse toggle ─── */}
        <SidebarFooter className='p-3'>
          <Separator className='mb-3' />
          <SidebarTrigger
            className='w-full justify-center rounded-md border border-border/50 bg-muted/50 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors'
          />
        </SidebarFooter>
      </Sidebar>
    </TooltipProvider>
  );
}
