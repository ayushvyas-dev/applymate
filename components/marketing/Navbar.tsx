'use client';

import Link from 'next/link';
import { Button } from '../ui/button';
import { Sparkles } from 'lucide-react';

export default function MarketingNavbar() {
  return (
    <nav className='sticky top-0 z-50 border-b bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60'>
      <div className='mx-auto flex h-14 max-w-6xl items-center justify-between px-6'>
        {/* ─── Logo ─── */}
        <Link href='/' className='flex items-center gap-2 group'>
          <span className='inline-flex size-8 items-center justify-center rounded-lg bg-primary shadow-sm transition-transform group-hover:scale-105'>
            <Sparkles className='size-4 text-primary-foreground' />
          </span>
          <span className='text-base font-bold tracking-tight'>
            Apply
            <span className='text-primary'>Mate</span>
          </span>
        </Link>

        {/* ─── Center link ─── */}
        <div className='hidden sm:block'>
          <Link
            href='#features'
            className='text-sm font-medium text-muted-foreground transition-colors hover:text-foreground'
          >
            Features
          </Link>
        </div>

        {/* ─── Actions ─── */}
        <div className='flex items-center gap-2'>
          <Button variant='ghost' size='sm' asChild>
            <Link href='/login'>Sign In</Link>
          </Button>
          <Button size='sm' asChild>
            <Link href='/signup'>Get Started</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
