import AddJob from '@/components/job-board/add-job';
import JobBoard from '@/components/job-board/board';
import { Separator } from '@/components/ui/separator';

export default function BoardPage() {
  return (
    <div className='relative min-h-full'>
      {/* Background blobs matching hero / auth / profile / documents pages */}
      <div
        aria-hidden
        className='pointer-events-none fixed inset-0 -z-10 overflow-hidden'
      >
        <div className='absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/8 blur-3xl' />
        <div className='absolute -bottom-20 -right-20 h-[300px] w-[300px] rounded-full bg-chart-2/8 blur-3xl' />
        <div className='absolute top-60 -left-20 h-[250px] w-[250px] rounded-full bg-chart-3/6 blur-3xl' />
      </div>

      <div className='mx-auto max-w-7xl px-4 py-6'>
        {/* Page header */}
        <div className='mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'>
          <div>
            <h1 className='text-3xl font-bold tracking-tight'>
              Your Applications
            </h1>
            <p className='mt-1 text-sm text-muted-foreground'>
              Track and manage every stage of your job search pipeline
            </p>
          </div>
          <AddJob />
        </div>

        <Separator className='mb-8' />

        <JobBoard />
      </div>
    </div>
  );
}
