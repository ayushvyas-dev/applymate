'use client';

import { Dispatch, SetStateAction } from 'react';
import * as React from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { matchResume, ResumeItem } from '@/actions/resume';
import { MatchResult } from './ResumeMatcherClient';

import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from '@/components/ui/field';
import { Textarea } from '../ui/textarea';
import { JobItem } from '@/actions/jobs';

const formSchema = z.object({
  title: z.string(),
  description: z.string().min(1, 'Description is required'),
  resumeId: z.string().min(1, 'Resume is required'),
});

interface ResumeMatcherFormProps {
  jobs: JobItem[];
  resumes: ResumeItem[];
  setResult: Dispatch<SetStateAction<MatchResult | null>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export default function ResumeMatcherForm({
  jobs,
  resumes,
  setResult,
  setIsLoading,
}: ResumeMatcherFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      resumeId: '',
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    if (!data.resumeId || !data.description) {
      toast.error('Select Resume & Job');
      return;
    }
    try {
      // Find selected resume
      setIsLoading(true);
      const selectedResume = resumes.find(
        (resume) => resume._id === data.resumeId,
      );
      if (!selectedResume) {
        toast.error('Please select a valid resume');
        return;
      }

      const response = await matchResume({
        description: data.description,
        resumeText: selectedResume.resumeText,
      });

      if (response.success) {
        setResult(response.data);
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      console.error(error);
      toast.error('something went wrong');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className='w-[35%] h-full  flex flex-col p-4  border-r'>
      <form id='form-rhf-demo' onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name='title'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='form-rhf-demo-title'>
                  Select job
                </FieldLabel>
                <Select
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value);

                    const selectedJob = jobs.find(
                      (job: JobItem) => job.title === value,
                    );

                    if (selectedJob) {
                      form.setValue('description', selectedJob.description);
                    }
                  }}
                >
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
            )}
          />

          <div className='text-center my-2'>or</div>

          <Controller
            name='description'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='form-rhf-demo-description'>
                  Job Description
                </FieldLabel>

                <Textarea
                  {...field}
                  placeholder='Paste or Type the Job Description.'
                  style={{ height: '180px' }}
                  className='h-60 '
                  aria-invalid={fieldState.invalid}
                />

                <p className='text-sm text-muted-foreground mt-2'>
                  {field.value.length}/2000 characters
                </p>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name='resumeId'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='form-rhf-demo-title'>
                  Select resume
                </FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className='w-45'>
                    <SelectValue placeholder='Select resume' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {resumes.map((resume: ResumeItem) => (
                        <SelectItem key={resume._id} value={resume._id}>
                          {resume.title}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </form>

      <Button
        className='cursor-pointer mt-4'
        type='submit'
        form='form-rhf-demo'
      >
        Match
      </Button>
    </div>
  );
}
