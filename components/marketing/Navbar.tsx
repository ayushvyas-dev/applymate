import { Sun, Moon, User, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '../ui/dropdown-menu';

export default function MarketingNavbar() {
  return (
    <nav className='z-10  top-0 border-b bg-background'>
      <div className='flex h-14 items-center justify-between   p-2'>
        <div>
          <Link href='/'>Logo</Link>
        </div>
        <div>Features</div>
        <div className='flex items-center gap-4'>
          <Button>
            <Link href='/signup'>Get Started</Link>
          </Button>
          <Button variant={'outline'}>
            <Link href='/login'>Login</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
