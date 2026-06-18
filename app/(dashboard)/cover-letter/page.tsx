'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { useCompletion } from '@ai-sdk/react';
import { getJobs } from '@/actions/jobs';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Field, FieldLabel } from '@/components/ui/field';

export default function CoverLetterGenerator() {
  // const { completion, complete, isLoading, error } = useCompletion({
  //   api: '/api/cover-letter',
  //   streamProtocol: 'text',
  // });

  // async function handleGenerate() {
  //   await complete('');
  // }

  interface Job {
    _id: string;
    title: string;
    company: string;
    descriptiion: string;
  }

  const [selected, setSelected] = useState('');

  const { data: jobs = [], isLoading } = useQuery({
    queryKey: ['jobs'],
    queryFn: () => getJobs(),
  });

  // Combobox or select component for select job and select resume

  return (
    <div className=' flex-1 w-full h-full  border rounded-md'>
      <div className='flex h-full'>
        <div className='w-[35%] h-full  flex flex-col p-4 border-r'>
          <Field>
            <FieldLabel>Select job</FieldLabel>
            <Select>
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Select job' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {jobs.map((job: Job) => (
                    <SelectItem key={job._id} value={job.title}>
                      {job.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>

          <Field className='mt-2'>
            <FieldLabel>Select resume</FieldLabel>
            <Select>
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Select resume' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value='light'>Light</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>

          <Field className='mt-2'>
            <FieldLabel>Choose Tone</FieldLabel>
            <ToggleGroup
              className=''
              variant='outline'
              type='single'
              defaultValue='professional'
            >
              <ToggleGroupItem
                className='cursor-pointer  '
                value='professional'
                aria-label='Toggle professional'
              >
                Professional
              </ToggleGroupItem>
              <ToggleGroupItem
                className='cursor-pointer  '
                value='enthusiastic'
                aria-label='Toggle enthusiastic'
              >
                Enthusiastic
              </ToggleGroupItem>

              <ToggleGroupItem
                className='cursor-pointer '
                value='confident'
                aria-label='Toggle confident'
              >
                Confident
              </ToggleGroupItem>
            </ToggleGroup>
          </Field>
          <Field className='mt-2'>
            <FieldLabel>Choose Length</FieldLabel>
            <ToggleGroup variant='outline' type='single' defaultValue='short'>
              <ToggleGroupItem
                className='cursor-pointer'
                value='short'
                aria-label='Toggle short'
              >
                Short
              </ToggleGroupItem>
              <ToggleGroupItem
                className='cursor-pointer'
                value='medium'
                aria-label='Toggle medium'
              >
                Medium
              </ToggleGroupItem>
              <ToggleGroupItem
                className='cursor-pointer'
                value='long'
                aria-label='Toggle long'
              >
                Long
              </ToggleGroupItem>
            </ToggleGroup>
          </Field>
          <Field className='mt-2'>
            <FieldLabel>Additional Instructions</FieldLabel>
            <Textarea className='h-[140px]' />
          </Field>

          <Button className='cursor-pointer mt-4'>Generate</Button>
        </div>

        <div>
          <h1>Generated cover letter </h1>
          <div></div>
        </div>
      </div>
    </div>

    // <div className='flex flex-col gap-6 max-w-3xl mx-auto p-6'>
    //   <div className='flex justify-between items-center'>
    //     <h2 className='text-2xl font-bold '>Cover Letter Generator</h2>

    //     <Button
    //       onClick={handleGenerate}
    //       disabled={isLoading}
    //       className='bg-indigo-500 hover:bg-indigo-600'
    //     >
    //       {isLoading ? 'Crafting...' : 'Start AI Generation'}
    //     </Button>
    //   </div>

    //   {error && (
    //     <div className='text-rose-500 text-sm font-medium'>
    //       Error: {error.message}
    //     </div>
    //   )}

    //   {/* 3. The Output Area */}
    //   <Card className=' border-zinc-800 min-h-[400px]'>
    //     <CardContent className='p-6'>
    //       <ScrollArea className='h-full'>
    //         {completion ? (
    //           // The text will automatically type out here in real-time
    //           <div className='whitespace-pre-wrap  leading-relaxed'>
    //             {completion}
    //           </div>
    //         ) : (
    //           <div className=' flex items-center justify-center h-[350px]'>
    //             Your AI-generated cover letter will appear here...
    //           </div>
    //         )}
    //       </ScrollArea>
    //     </CardContent>
    //   </Card>
    // </div>
  );
}
