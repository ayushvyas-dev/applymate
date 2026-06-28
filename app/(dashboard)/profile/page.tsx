import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { dbConnect } from '@/lib/db';
import User from '@/models/User';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Mail, User as UserIcon, ExternalLink } from 'lucide-react';

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/');
  }

  await dbConnect();
  const dbUser = await User.findOne({ email: session.user.email }).lean<{
    name: string;
    email: string;
    avatar?: string | null;
    provider: string;
    createdAt: Date;
  }>();

  const name = dbUser?.name ?? session.user.name ?? 'User';
  const email = dbUser?.email ?? session.user.email ?? '';
  const avatarUrl = dbUser?.avatar ?? session.user.image ?? '';
  const provider = dbUser?.provider ?? 'credentials';
  const initials = name
    .split(' ')
    .map((w: string) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
  const memberSince = dbUser?.createdAt
    ? new Date(dbUser.createdAt).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    })
    : '';

  return (
    <div className='relative min-h-full'>
      {/* Background blobs matching hero / auth pages */}
      <div
        aria-hidden
        className='pointer-events-none fixed inset-0 -z-10 overflow-hidden'
      >
        <div className='absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/8 blur-3xl' />
        <div className='absolute -bottom-20 -right-20 h-[300px] w-[300px] rounded-full bg-chart-2/8 blur-3xl' />
        <div className='absolute top-60 -left-20 h-[250px] w-[250px] rounded-full bg-chart-3/6 blur-3xl' />
      </div>

      <div className='mx-auto max-w-5xl px-4 py-6'>
        {/* Page header */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold tracking-tight'>
            Profile
          </h1>
          <p className='mt-1 text-sm text-muted-foreground'>
            Your personal information and social profiles
          </p>
        </div>

        {/* Profile Card */}
        <Card className='shadow-lg'>
          <CardHeader className='pb-0'>
            <div className='flex flex-col items-center gap-4 sm:flex-row sm:items-start'>
              {/* Avatar */}
              <Avatar className='size-20 ring-4 ring-primary/20'>
                {avatarUrl && (
                  <AvatarImage src={avatarUrl} alt={name} />
                )}
                <AvatarFallback className='bg-primary text-lg font-bold text-primary-foreground'>
                  {initials}
                </AvatarFallback>
              </Avatar>

              {/* Name & badge */}
              <div className='flex flex-col items-center gap-2 sm:items-start'>
                <CardTitle className='text-2xl'>{name}</CardTitle>
                <div className='flex items-center gap-2'>
                  <Badge
                    variant='secondary'
                    className='capitalize'
                  >
                    {provider === 'google' ? '🔗 Google' : '📧 Email'}
                  </Badge>
                  {memberSince && (
                    <span className='text-xs text-muted-foreground'>
                      Member since {memberSince}
                    </span>
                  )}
                </div>
                <CardDescription className='mt-1 max-w-sm text-center sm:text-left'>
                  Manage your profile details and connected social accounts.
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className='mt-2'>
            <Separator className='mb-6' />

            {/* Info rows */}
            <div className='space-y-5'>
              {/* Email */}
              <div className='flex items-start gap-3'>
                <span className='mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10'>
                  <Mail className='size-4 text-primary' />
                </span>
                <div className='min-w-0 flex-1'>
                  <p className='text-xs font-medium text-muted-foreground'>
                    Email Address
                  </p>
                  <p className='truncate text-sm font-medium'>
                    {email}
                  </p>
                </div>
              </div>

              {/* Name */}
              <div className='flex items-start gap-3'>
                <span className='mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10'>
                  <UserIcon className='size-4 text-primary' />
                </span>
                <div className='min-w-0 flex-1'>
                  <p className='text-xs font-medium text-muted-foreground'>
                    Full Name
                  </p>
                  <p className='truncate text-sm font-medium'>
                    {name}
                  </p>
                </div>
              </div>

              <Separator />

              {/* Social Profiles heading */}
              <div>
                <h3 className='text-sm font-semibold tracking-tight'>
                  Social Profiles
                </h3>
                <p className='mt-0.5 text-xs text-muted-foreground'>
                  Your connected professional profiles
                </p>
              </div>

              {/* GitHub */}
              <div className='flex items-start gap-3'>
                <span className='mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10'>
                  {/* GitHub SVG icon */}
                  <svg
                    className='size-4 text-primary'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z' />
                  </svg>
                </span>
                <div className='min-w-0 flex-1'>
                  <p className='text-xs font-medium text-muted-foreground'>
                    GitHub Profile
                  </p>
                  <p className='flex items-center gap-1.5 text-sm text-muted-foreground italic'>
                    <span>Not connected</span>
                    <ExternalLink className='size-3 opacity-50' />
                  </p>
                </div>
              </div>

              {/* LinkedIn */}
              <div className='flex items-start gap-3'>
                <span className='mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10'>
                  {/* LinkedIn SVG icon */}
                  <svg
                    className='size-4 text-primary'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
                  </svg>
                </span>
                <div className='min-w-0 flex-1'>
                  <p className='text-xs font-medium text-muted-foreground'>
                    LinkedIn Profile
                  </p>
                  <p className='flex items-center gap-1.5 text-sm text-muted-foreground italic'>
                    <span>Not connected</span>
                    <ExternalLink className='size-3 opacity-50' />
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
