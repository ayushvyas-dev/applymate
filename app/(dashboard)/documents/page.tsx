import { getUserResumes } from '@/actions/resume';
import UploadFileButton from '@/components/documents/UploadFileButton';
import ResumeCard from '@/components/documents/ResumeCard';
import { Separator } from '@/components/ui/separator';
import { FileText } from 'lucide-react';

interface ResumeItem {
  _id: string;
  title: string;
  fileUrl: string;
  fileKey: string;
  fileName: string;
  fileSize: number;
  pageCount: number;
  resumeText: string;
  isDefault: boolean;
}

export default async function DocumentPage() {
  const resumes = await getUserResumes();

  return (
    <div className='relative min-h-full'>
      {/* Background blobs matching hero / auth / profile pages */}
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
        <div className='mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'>
          <div>
            <h1 className='text-3xl font-bold tracking-tight'>Documents</h1>
            <p className='mt-1 text-sm text-muted-foreground'>
              Upload your resume to get cover letter and resume matches
            </p>
          </div>
          <UploadFileButton />
        </div>

        <Separator className='mb-8' />

        {/* All uploaded resumes */}
        {resumes.length === 0 ? (
          <div className='flex flex-col items-center justify-center rounded-xl border border-dashed border-border/60 bg-muted/30 px-6 py-20 text-center'>
            <span className='mb-4 inline-flex size-14 items-center justify-center rounded-2xl bg-primary/10'>
              <FileText className='size-6 text-primary' />
            </span>
            <h3 className='text-lg font-semibold'>No resumes uploaded yet</h3>
            <p className='mt-1 max-w-sm text-sm text-muted-foreground'>
              Upload your first resume to unlock AI-powered cover letters,
              resume matching, and improvement tips.
            </p>
          </div>
        ) : (
          <div className='grid gap-6 sm:grid-cols-2 xl:grid-cols-3'>
            {resumes.map((resume: ResumeItem) => (
              <ResumeCard
                key={resume._id.toString()}
                resume={JSON.parse(JSON.stringify(resume))}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
