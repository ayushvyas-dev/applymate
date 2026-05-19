'use client';

import { useCompletion } from '@ai-sdk/react';

export default function CoverLetterGenerator() {
  const { completion, complete, isLoading } = useCompletion({
    api: '/api/cover-letter',
  });

  async function handleGenerate() {
    await complete(
      JSON.stringify({
        company: 'Zomato',
        role: 'Frontend Intern',
        skills: ['React', 'Next.js', 'Tailwind'],
        tone: 'professional',
        jobDescription: 'We are looking for...',
      }),
    );
  }

  return (
    <div className='space-y-4'>
      <button
        onClick={handleGenerate}
        className='rounded-md bg-black px-4 py-2 text-white'
      >
        Generate
      </button>

      <div className='whitespace-pre-wrap rounded-md border p-4'>
        {completion}
      </div>
    </div>
  );
}
