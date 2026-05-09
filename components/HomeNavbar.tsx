import Link from 'next/link';
import { Bell, User } from 'lucide-react';
export default function HomeNavbar() {
  return (
    <nav className='bg-blue-950 border-b border-zinc-800'>
      <div className=' max-w-304 mx-auto px-4 py-4 flex  items-center justify-between'>
        <Link href='/home' className='text-lg font-bold text-white'>
          AI Job
        </Link>
        <div className='flex gap-4'>
          <Link href='/login' className='  '>
            <Bell />
          </Link>
          <Link href='/login' className='  '>
            <User />
          </Link>
        </div>
      </div>
    </nav>
  );
}
