import Link from 'next/link';
export default function HeroNavbar() {
  return (
    <nav className='bg-white border-b border-zinc-300'>
      <div className=' max-w-304 mx-auto px-4 py-4 flex items-center justify-between'>
        <Link href='/home' className='text-lg font-bold text-gray-800'>
          ApplyMate AI
        </Link>
        <div>
          <Link
            href='/login'
            className='bg-blue-600 px-2 py-2 rounded-md font-semibold '
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
