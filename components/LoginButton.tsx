'use client';

import { signIn } from 'next-auth/react';
import { ReactNode } from 'react';

type LoginButtonProps = {
  children: ReactNode;
  callbackUrl?: string;
};

export default function LoginButton({
  children,
  callbackUrl = '/home',
}: LoginButtonProps) {
  return (
    <button
      type='button'
      onClick={() => signIn('google', { callbackUrl })}
      className='w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-blue-500 text-white font-medium hover:bg-blue-600 transition cursor-pointer'
    >
      {children}
    </button>
  );
}
