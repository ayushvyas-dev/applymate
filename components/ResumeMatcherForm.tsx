'use client';

import { Button } from '@/components/ui/button';

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

export default function ResumeMatcherForm({ jobs: jobs, resumes: resumes }) {
  return (
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
      <div className='text-center my-2'>or</div>

      <Field className=''>
        <FieldLabel>Job Description</FieldLabel>
        <Textarea className='h-[140px]' />
      </Field>

      <Field className='mt-2'>
        <FieldLabel>Select resume</FieldLabel>
        <Select>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Select resume' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {resumes.map((resume: Resume) => (
                <SelectItem key={resume._id} value={resume.title}>
                  {resume.title}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>

      <Button className='cursor-pointer mt-4'>Match</Button>
    </div>
  );
}
