'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MatchResult } from './ResumeMatcherClient';

interface ResumeMatcherResultProps {
  result: MatchResult | null;
  isLoading: boolean;
}

export default function ResumeMatcherResult({
  result,
  isLoading,
}: ResumeMatcherResultProps) {
  return (
    <div className='flex flex-row h-full overflow-y-auto  p-4 pt-0'>
      {isLoading && (
        <div className='flex h-full items-center justify-center'>
          <p className='text-muted-foreground'>Analyzing resume...</p>
        </div>
      )}

      {!isLoading && !result && (
        <div className='flex h-full items-center justify-center'>
          <p className='text-muted-foreground'>
            Select a job and resume to begin analysis.
          </p>
        </div>
      )}

      {!isLoading && result && (
        <div className='space-y-6 '>
          <Card className=''>
            <CardHeader>
              <CardTitle>Generated Result</CardTitle>
            </CardHeader>

            <CardContent>
              <CardTitle>ATS Score</CardTitle>
              <div className='text-5xl font-bold'>{result.atsScore}/100</div>
            </CardContent>

            <CardContent>
              <CardTitle>What Could Be Improved</CardTitle>
              <ul className='list-disc space-y-2 pl-5'>
                {result.improvements.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </CardContent>
            <CardHeader>
              <CardTitle>What Fits the Job Description</CardTitle>
            </CardHeader>

            <CardContent>
              <ul className='list-disc space-y-2 pl-5'>
                {result.matches.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
