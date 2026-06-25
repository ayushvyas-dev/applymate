'use client';

import { Button } from '@/components/ui/button';

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
import { JobItem } from '@/actions/jobs';
import { ResumeItem } from '@/actions/resume';
export default function CoverLetterForm({
  jobs,
  resumes,
}: {
  jobs: JobItem[];
  resumes: ResumeItem[];
}) {
  return (
    <div className='w-[35%] h-full  flex flex-col p-4 border-r'>
      <Field>
        <FieldLabel>Select job</FieldLabel>
        <Select>
          <SelectTrigger className='w-45'>
            <SelectValue placeholder='Select job' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {jobs.map((job: JobItem) => (
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
          <SelectTrigger className='w-45'>
            <SelectValue placeholder='Select resume' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {resumes.map((resume: ResumeItem) => (
                <SelectItem key={resume._id} value={resume.title}>
                  {resume.title}
                </SelectItem>
              ))}
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
        <Textarea style={{ height: '150px' }} className='h-35' />
      </Field>

      <Button className='cursor-pointer mt-4'>Generate</Button>
    </div>
  );
}
