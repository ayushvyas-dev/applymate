'use client';

import { useCompletion } from '@ai-sdk/react';
import CoverLetterForm from './CoverLetterForm';
import CoverLetterResult from './CoverLetterResult';
import { JobItem } from '@/actions/jobs';
import { ResumeItem } from '@/actions/resume';
import { FormValues } from './CoverLetterForm';

interface CoverLetterClientProps {
  jobs: JobItem[];
  resumes: ResumeItem[];
}

export default function CoverLetterClient({
  jobs,
  resumes,
}: CoverLetterClientProps) {
  const { completion, complete, isLoading, error } = useCompletion({
    api: '/api/cover-letter',
    streamProtocol: 'text',
  });

  async function handleGenerate(data: FormValues) {
    await complete(JSON.stringify(data));
  }

  return (
    <div className='grid gap-6 lg:grid-cols-[380px_1fr]'>
      <CoverLetterForm
        jobs={jobs}
        resumes={resumes}
        handleGenerate={handleGenerate}
        isLoading={isLoading}
      />

      <CoverLetterResult result={completion} isLoading={isLoading} />
    </div>
  );
}