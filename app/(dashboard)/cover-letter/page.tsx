import { getJobs } from '@/actions/jobs';
import { getUserResumes } from '@/actions/resume';
import CoverLetterClient from '@/components/cover-letter/CoverLetterClient';
import { Separator } from '@/components/ui/separator';

export default async function CoverLetterPage() {
  const jobs = await getJobs();
  const resumes = await getUserResumes();

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
        <div className='mb-8'>
          <h1 className='text-3xl font-bold tracking-tight'>
            Cover Letter
          </h1>
          <p className='mt-1 text-sm text-muted-foreground'>
            Generate an AI-powered cover letter tailored to the job and your resume
          </p>
        </div>

        <Separator className='mb-8' />

        <CoverLetterClient jobs={jobs} resumes={resumes} />
      </div>
    </div>
  );
}
