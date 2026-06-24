'use client';

import { useState } from 'react';

import ResumeMatcherForm from './ResumeMatcherForm';
import ResumeMatcherResult from './ResumeMatcherResult';

type MatchResult = {
  atsScore: number;
  improvements: string[];
  matches: string[];
};

interface ResumeMatcherClientProps {
  jobs: Job[];
  resumes: Resume[];
}

export default function ResumeMatcherClient({
  jobs,
  resumes,
}: ResumeMatcherClientProps) {
  const [result, setResult] = useState<MatchResult | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className='flex w-full h-full'>
      <ResumeMatcherForm
        jobs={jobs}
        resumes={resumes}
        setResult={setResult}
        setLoading={setLoading}
      />

      <ResumeMatcherResult result={result} loading={loading} />
    </div>
  );
}
