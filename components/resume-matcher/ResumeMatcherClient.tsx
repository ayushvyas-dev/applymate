'use client';

import { useState } from 'react';

import ResumeMatcherForm from './ResumeMatcherForm';
import ResumeMatcherResult from './ResumeMatcherResult';
import { JobItem } from '@/actions/jobs';
import { ResumeItem } from '@/actions/resume';

export interface MatchResult {
  atsScore: number;
  improvements: string[];
  matches: string[];
}

interface ResumeMatcherClientProps {
  jobs: JobItem[];
  resumes: ResumeItem[];
}

export default function ResumeMatcherClient({
  jobs: jobs,
  resumes,
}: ResumeMatcherClientProps) {
  const [result, setResult] = useState<MatchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className='flex w-full h-full'>
      <ResumeMatcherForm
        jobs={jobs}
        resumes={resumes}
        setResult={setResult}
        setIsLoading={setIsLoading}
      />

      <ResumeMatcherResult result={result} isLoading={isLoading} />
    </div>
  );
}
