'use client';

import createJob from '@/actions/jobs';
import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from '@/components/ui/field';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '../ui/input';

import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from '../ui/input-group';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  title: z
    .string()
    .min(5, 'Job title must be at least 2 characters.')
    .max(32, 'Job title must be at most 20 characters.')
    .trim(),
  company: z.string().min(2).max(30).trim(),
  url: z.string().min(2).max(30).trim(),
  section: z.string().min(2).max(30),
  salary: z.number().min(0).max(1000000),
  location: z.string().min(2).max(30).trim(),
  description: z
    .string()
    .min(20, 'Job description must be at least 20 characters.')
    .max(2000, 'Job description must be at most 100 characters.')
    .trim(),
});

export default function AddJob() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      company: '',
      url: '',
      section: 'saved',
      salary: 10000,
      location: '',
      description: '',
    },
  });

  const router = useRouter();
  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const res = await createJob(data);
      if (!res) {
        toast.error('failed to create job');
        return;
      }
      toast.success('Job created successfully');

      form.reset();
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error('something went wrong');
    }
    toast('You submitted the following values:', {
      description: (
        <pre className='mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground'>
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: 'bottom-right',
      classNames: {
        content: 'flex flex-col gap-2',
      },
      style: {
        '--border-radius': 'calc(var(--radius)  + 4px)',
      } as React.CSSProperties,
    });
  }
  return (
    <div className='  '>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Add Job</Button>
        </DialogTrigger>
        <DialogContent className='p-0'>
          <DialogTitle className='sr-only' />
          <Card className='w-full max-h-[90vh]  flex flex-col sm:max-w-md'>
            <CardHeader className='shrink-0'>
              <CardTitle>Add Job</CardTitle>
            </CardHeader>
            <CardContent className='flex-1 overflow-y-auto'>
              <form id='form-rhf-demo' onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                  <Controller
                    name='title'
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor='form-rhf-demo-title'>
                          Job Title
                        </FieldLabel>
                        <Input
                          {...field}
                          aria-invalid={fieldState.invalid}
                          placeholder='Job Title'
                          autoComplete='off'
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    name='company'
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor='form-rhf-demo-title'>
                          Company Name
                        </FieldLabel>
                        <Input
                          {...field}
                          aria-invalid={fieldState.invalid}
                          placeholder='Company Name'
                          autoComplete='off'
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    name='url'
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor='form-rhf-demo-title'>
                          Job Url
                        </FieldLabel>
                        <Input
                          {...field}
                          aria-invalid={fieldState.invalid}
                          placeholder='Job Url'
                          autoComplete='off'
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    name='section'
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor='form-rhf-demo-title'>
                          Section
                        </FieldLabel>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className='w-45'>
                            <SelectValue placeholder='Saved' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value='saved'>Saved</SelectItem>
                              <SelectItem value='applied'>Applied</SelectItem>
                              <SelectItem value='interview'>
                                Interview
                              </SelectItem>
                              <SelectItem value='offered'>Offered</SelectItem>
                              <SelectItem value='rejected'>Rejected</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </Field>
                    )}
                  />
                  <Controller
                    name='salary'
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor='form-rhf-demo-title'>
                          Salary
                        </FieldLabel>
                        <Input
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                          aria-invalid={fieldState.invalid}
                          type='number'
                          value={field.value || ''}
                          placeholder='10000'
                          autoComplete='off'
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    name='location'
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor='form-rhf-demo-title'>
                          Location
                        </FieldLabel>
                        <Input
                          {...field}
                          aria-invalid={fieldState.invalid}
                          placeholder='Location'
                          autoComplete='off'
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    name='description'
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor='form-rhf-demo-description'>
                          Job Description
                        </FieldLabel>
                        <InputGroup>
                          <InputGroupTextarea
                            {...field}
                            placeholder='Paste or Type the Job Description.'
                            rows={6}
                            className='min-h-24 resize-none'
                            aria-invalid={fieldState.invalid}
                          />
                          <InputGroupAddon align='block-end'>
                            <InputGroupText className='tabular-nums'>
                              {field.value.length}/2000 characters
                            </InputGroupText>
                          </InputGroupAddon>
                        </InputGroup>

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </FieldGroup>
              </form>
            </CardContent>
            <CardFooter className='shrink-0'>
              <Field orientation='horizontal'>
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => form.reset()}
                >
                  Cancel
                </Button>
                <Button type='submit' form='form-rhf-demo'>
                  Submit
                </Button>
              </Field>
            </CardFooter>
          </Card>
        </DialogContent>
      </Dialog>
    </div>
  );
}
