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

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Briefcase, FileText, ArrowRight } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';

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

  const [submitting, setSubmitting] = React.useState(false);

  async function onSubmit(data: z.infer<typeof formSchema>) {
    if (!data.resumeId || !data.description) {
      toast.error('Select Resume & Job');
      return;
    }
    try {
      // Find selected resume
      setIsLoading(true);
      setSubmitting(true);
      const selectedResume = resumes.find(
        (resume) => resume._id === data.resumeId,
      );
      if (!selectedResume) {
        toast.error('Please select a valid resume');
        return;
      }

      const response = await matchResume({
        description: data.description,
        structuredResume: selectedResume.structuredResume,
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
      setSubmitting(false);
    }
  }

  return (
    <Card className='shadow-lg h-fit'>
      <CardHeader>
        <div className='flex items-center gap-3'>
          <span className='inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10'>
            <Briefcase className='size-4 text-primary' />
          </span>
          <div>
            <CardTitle className='text-lg'>Match Configuration</CardTitle>
            <CardDescription>
              Select a job and resume to analyse
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <form id='form-rhf-demo' onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            {/* ── Job selector ── */}
            <Controller
              name='title'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='form-rhf-demo-title'>
                    <Briefcase className='size-3.5 text-muted-foreground' />
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
                    <SelectTrigger className='w-full'>
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

            {/* ── "or" divider — matches login form pattern ── */}
            <div className='relative my-2'>
              <Separator />
              <span className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-3 text-xs text-muted-foreground'>
                or
              </span>
            </div>

            {/* ── Job description textarea ── */}
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

            {/* ── Resume selector ── */}
            <Controller
              name='resumeId'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='form-rhf-demo-title'>
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
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter>
        <Button
          className='w-full cursor-pointer'
          type='submit'
          form='form-rhf-demo'
          disabled={submitting}
        >
          {submitting ? (
            <>
              <Spinner className='mr-2' />
              Analysing…
            </>
          ) : (
            <>
              Match Resume
              <ArrowRight className='ml-1.5 size-4' />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
