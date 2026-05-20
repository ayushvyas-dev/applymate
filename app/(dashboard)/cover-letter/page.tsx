'use client';

import { Button } from '@/components/ui/button';
import { useCompletion } from '@ai-sdk/react';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

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
    <div className=' flex-1 w-full h-full  border rounded-md'>
      <div className='flex h-full'>
        <div className='w-[40%] h-full flex flex-col p-4 border-r'>
          <Button className='w-[60%]'>Select Job</Button>
          <Button className='w-[60%]'>Select Resume</Button>
          <ToggleGroup variant='outline' type='single'>
            <ToggleGroupItem value='bold' aria-label='Toggle bold'>
              Professional
            </ToggleGroupItem>
            <ToggleGroupItem value='italic' aria-label='Toggle italic'>
              Enthusiastic
            </ToggleGroupItem>
            <ToggleGroupItem
              value='strikethrough'
              aria-label='Toggle strikethrough'
            >
              Confident
            </ToggleGroupItem>
            <ToggleGroupItem value='' aria-label='Toggle strikethrough'>
              Friendly
            </ToggleGroupItem>
          </ToggleGroup>
          <ToggleGroup variant='outline' type='single'>
            <ToggleGroupItem value='bold' aria-label='Toggle bold'>
              Short
            </ToggleGroupItem>
            <ToggleGroupItem value='italic' aria-label='Toggle italic'>
              Medium
            </ToggleGroupItem>
            <ToggleGroupItem
              value='strikethrough'
              aria-label='Toggle strikethrough'
            >
              Long
            </ToggleGroupItem>
          </ToggleGroup>
          <Button className='w-[60%]'>Choose Tone</Button>
          <Button className='w-[60%]'>Choose Length</Button>
          <Button className='w-[60%]'>Additional Instructions(Optional)</Button>
          <Button className='w-[60%]' onClick={handleGenerate}>
            Generate
          </Button>
          <div className='whitespace-pre-wrap rounded-md border p-4'>
            {completion}
          </div>
          <p>1</p>
        </div>
        <div className='w-[60%] h-full p-2'>
          <div>Generate to view</div>
        </div>
      </div>
    </div>
  );
}
