import Link from 'next/link';

export default function Hero() {
  return (
    <div className='min-h-screen bg-cyan-200'>
      <main className=''>
        <section className=''>
          <div className=' flex justify-center p-2'>
            <h1 className='max-w-lg text-5xl m-4 mt-12 font-semibold text-black text-center'>
              Land Your Dream Job Faster with AI
            </h1>
          </div>
        </section>
        <section>
          <div className='flex justify-center gap-2 text-sm text-[#334050]  p-2 m-4'>
            <p>AI Resume Builder</p>
            <p>Automated Job Tracking</p>
            <p>Resume Analyzer</p>
          </div>
          <div className='text-center'>
            <Link
              href='/login'
              className='bg-blue-600 px-2 py-2 rounded-md font-semibold '
            >
              Get Started
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
