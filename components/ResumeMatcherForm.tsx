'use client';

import * as React from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { matchResume } from '@/actions/resume';

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
import { Textarea } from './ui/textarea';

const formSchema = z.object({
  description: z.string(),
  resumeId: z.string(),
});

export default function ResumeMatcherForm({
  resumes: resumes,
  jobs: jobs,
  setResult: setResult,
  setLoading: setLoading,
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: '',
      resumeId: '',
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      // Find selected resume
      setLoading(true);
      const selectedResume = resumes.find(
        (resume) => resume._id === data.resumeId,
      );
      const resumeText = selectedResume?.resumeText;

      const response = await matchResume({
        description: data.description,
        resumeText,
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
      setLoading(false);
    }
  }

  return (
    <div className='w-[35%] h-full  flex flex-col p-4 border-r'>
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

                    const selectedJob = jobs.find((job) => job.title === value);

                    if (selectedJob) {
                      form.setValue('description', selectedJob.description);
                    }
                  }}
                >
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
                  <SelectTrigger className='w-[180px]'>
                    <SelectValue placeholder='Select resume' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {resumes.map((resume: Resume) => (
                        <SelectItem key={resume._id} value={resume._id}>
                          {resume.title}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
