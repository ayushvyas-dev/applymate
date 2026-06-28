'use client';
import {
  LogOut,
  Sun,
  Moon,
  Settings,
  User,
  Sparkles,
  LayoutDashboard,
} from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from 'next-themes';
import { signOut } from 'next-auth/react';

export default function DashboardNavbar({ avatar }: { avatar: string }) {
  const { theme, setTheme } = useTheme();
  return (
    <nav className='sticky top-0 z-50 border-b bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60'>
      <div className='mx-auto flex h-14 items-center justify-between px-6'>
        {/* ─── Logo ─── */}
        <Link href='/dashboard' className='flex items-center gap-2 group'>
          <span className='inline-flex size-8 items-center justify-center rounded-lg bg-primary shadow-sm transition-transform group-hover:scale-105'>
            <Sparkles className='size-4 text-primary-foreground' />
          </span>
          <span className='text-base font-bold tracking-tight'>
            Apply
            <span className='text-primary'>Mate</span>
          </span>
        </Link>

        {/* ─── Right actions ─── */}
        <div className='flex items-center gap-2'>
          {/* Dashboard link */}
          <Button variant='ghost' size='sm' asChild>
            <Link href='/dashboard' className='gap-1.5'>
              <LayoutDashboard className='size-4' />
              <span className='hidden sm:inline'>Dashboard</span>
            </Link>
          </Button>

          {/* Theme toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' size='icon-sm'>
                <Sun className='size-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90' />
                <Moon className='absolute size-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0' />
                <span className='sr-only'>Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent sideOffset={10} align='end'>
              <DropdownMenuItem onClick={() => setTheme('light')}>
                <Sun className='size-4' />
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>
                <Moon className='size-4' />
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')}>
                <Settings className='size-4' />
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='ghost'
                size='icon-sm'
                className='rounded-full p-0'
              >
                <Avatar className='size-7 ring-2 ring-border transition-shadow hover:ring-primary/50'>
                  <AvatarImage
                    src={`https://images.weserv.nl/?url=${avatar}`}
                  />
                  <AvatarFallback className='bg-primary text-[10px] font-bold text-primary-foreground'>
                    AM
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent sideOffset={10} align='end' className='w-48'>
              <DropdownMenuLabel className='font-normal'>
                <span className='text-sm font-semibold'>My Account</span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link href='/profile'>
                    <User className='size-4' />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href='/settings'>
                    <Settings className='size-4' />
                    Settings
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() =>
                    signOut({
                      callbackUrl: '/',
                    })
                  }
                  variant='destructive'
                >
                  <LogOut className='size-4' />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
