'use client';

import { signOut } from 'next-auth/react';

export default function SignOutButton() {
  const logOut = () => {
    if (!window.confirm('Are you sure you want to log out?')) {
      return;
    }
    signOut({ callbackUrl: '/' });
  };
  return (
    <button
      type='button'
      onClick={logOut}
      className='cursor-pointer bg-red-500 rounded-md p-2'
    >
      LogOut
    </button>
  );
}
