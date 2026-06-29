'use client';

import { Dispatch, SetStateAction } from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

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
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { JobItem } from '@/actions/jobs';
import { ResumeItem } from '@/actions/resume';
import React from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Briefcase, FileText, ArrowRight } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';


const formSchema = z.object({
  jobId: z.string().min(1, 'Job is required'),
  resumeId: z.string().min(1, 'Resume is required'),
  tone: z.enum(['professional', 'enthusiastic', 'confident']),
  length: z.enum(['short', 'medium', 'long']),
  additionalInstructions: z.string(),
});

export type FormValues = z.infer<typeof formSchema>;


interface CoverLetterFormProps {
  jobs: JobItem[];
  resumes: ResumeItem[];
  handleGenerate: (data: FormValues) => Promise<void>;
  isLoading: boolean;
}
export default function CoverLetterForm({
  jobs,
  resumes,
  handleGenerate,
  isLoading
}: CoverLetterFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobId: '',
      resumeId: '',
      tone: 'professional',
      length: 'medium',
      additionalInstructions: '',
    },
  });

  const [submitting, setSubmitting] = React.useState(false);

  async function onSubmit(data: z.infer<typeof formSchema>) {
    if (!data.resumeId || !data.jobId) {
      toast.error('Select Resume & Job');
      return;
    }

    try {
      setSubmitting(true);
      await handleGenerate(data);
    } catch (error) {
      console.error(error);
      toast.error('something went wrong');
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <Card className='shadow-lg h-fit'>
      <CardHeader>
        <div className='flex items-center gap-3'>
          <span className='inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10'>
            <FileText className='size-4 text-primary' />
          </span>
          <div>
            <CardTitle className='text-lg'>Cover Letter Configuration</CardTitle>
            <CardDescription>
              Select a job and resume to generate
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <form id='cover-letter-form' onSubmit={form.handleSubmit(onSubmit, (errors) => console.log(errors))}>
          <FieldGroup>
            <Controller name='jobId'
              control={form.control}
              render={({ field, fieldState }) => (<Field>
                <FieldLabel>
                  <Briefcase className='size-3.5 text-muted-foreground' />
                  Select job
                </FieldLabel>
                <Select value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value);
                  }}>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Select job' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {jobs.map((job: JobItem) => (
                        <SelectItem key={job._id} value={job._id}>
                          {job.title}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>)} />
            <Controller
              name='resumeId'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='cover-letter-resume'>
                    <FileText className='size-3.5 text-muted-foreground' />
                    Select resume
                  </FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className='w-full'>
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

            <Controller name='tone' control={form.control} render={({ field, fieldState }) => (
              <Field className='mt-2'>
                <FieldLabel>Choose Tone</FieldLabel>
                <ToggleGroup
                  variant='outline'
                  type='single'
                  defaultValue='professional'
                  value={field.value}
                  onValueChange={(value) => {
                    if (value) field.onChange(value);
                  }}
                >
                  <ToggleGroupItem
                    className='cursor-pointer'
                    value='professional'
                    aria-label='Toggle professional'
                  >
                    Professional
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    className='cursor-pointer'
                    value='enthusiastic'
                    aria-label='Toggle enthusiastic'
                  >
                    Enthusiastic
                  </ToggleGroupItem>

                  <ToggleGroupItem
                    className='cursor-pointer'
                    value='confident'
                    aria-label='Toggle confident'
                  >
                    Confident
                  </ToggleGroupItem>
                </ToggleGroup>
              </Field>



            )} />

            <Controller name='length' control={form.control} render={({ field, fieldState }) => (
              <Field className='mt-2'>
                <FieldLabel>Choose Length</FieldLabel>
                <ToggleGroup variant='outline' type='single' defaultValue='short'
                  value={field.value}
                  onValueChange={(value) => {
                    if (value) field.onChange(value);
                  }}>
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

            )} />

            <Controller
              name='additionalInstructions'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='cover-letter-instructions'>
                    Additional Instructions
                  </FieldLabel>

                  <Textarea
                    {...field}
                    placeholder='Type additional instructions.'
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
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter>
        <Button
          className='w-full cursor-pointer'
          type='submit'
          form='cover-letter-form'
          disabled={isLoading || submitting}
        >
          {isLoading || submitting ? (
            <>
              <Spinner className='mr-2' />
              Generating…
            </>
          ) : (
            <>
              Generate Cover Letter
              <ArrowRight className='ml-1.5 size-4' />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
