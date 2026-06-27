'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';

import Link from 'next/link';
import { ArrowRight, Sparkles, Mail, Lock } from 'lucide-react';

const formSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(2, 'Password is required').max(30).trim(),
});

export default function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const router = useRouter();

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (res?.error) {
        toast.error('Invalid email or password');
        return;
      }

      toast.success('Logged in successfully');
      router.push('/dashboard');
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    }
  }

  const isSubmitting = form.formState.isSubmitting;

  return (
    <div className='flex min-h-screen items-center justify-center px-4'>
      {/* Background blobs matching hero */}
      <div
        aria-hidden
        className='pointer-events-none fixed inset-0 -z-10 overflow-hidden'
      >
        <div className='absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/8 blur-3xl' />
        <div className='absolute -bottom-20 -right-20 h-[300px] w-[300px] rounded-full bg-chart-2/8 blur-3xl' />
      </div>

      <div className='sm:min-w-[23.3rem] sm:max-w-[23.3rem]  max-w-md'>
        {/* Logo */}
        <div className='mb-8 text-center'>
          <Link href='/' className='inline-flex items-center gap-2'>
            <span className='inline-flex size-10 items-center justify-center rounded-xl bg-primary shadow-md'>
              <Sparkles className='size-5 text-primary-foreground' />
            </span>
            <span className='text-xl font-bold tracking-tight'>
              Apply<span className='text-primary'>Mate</span>
            </span>
          </Link>
        </div>

        <Card className='w-full shadow-lg'>
          <CardHeader className='text-center'>
            <CardTitle className='text-xl'>Welcome back</CardTitle>
            <CardDescription>
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>

          <CardContent>
            {/* Google Sign In */}
            <Button
              type='button'
              variant='outline'
              className='w-full'
              onClick={() =>
                signIn('google', { callbackUrl: '/dashboard' })
              }
            >
              <svg className='size-4' viewBox='0 0 24 24'>
                <path
                  d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z'
                  fill='#4285F4'
                />
                <path
                  d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                  fill='#34A853'
                />
                <path
                  d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                  fill='#FBBC05'
                />
                <path
                  d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                  fill='#EA4335'
                />
              </svg>
              Continue with Google
            </Button>

            {/* Divider */}
            <div className='relative my-6'>
              <Separator />
              <span className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-3 text-xs text-muted-foreground'>
                or continue with email
              </span>
            </div>

            {/* Email/Password form */}
            <form
              id='login-form'
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FieldGroup>
                <Controller
                  name='email'
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor='login-email'>
                        <Mail className='size-3.5 text-muted-foreground' />
                        Email
                      </FieldLabel>
                      <Input
                        {...field}
                        id='login-email'
                        type='email'
                        aria-invalid={fieldState.invalid}
                        placeholder='you@example.com'
                        autoComplete='email'
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name='password'
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <div className='flex items-center justify-between'>
                        <FieldLabel htmlFor='login-password'>
                          <Lock className='size-3.5 text-muted-foreground' />
                          Password
                        </FieldLabel>
                        <Link
                          href='#'
                          className='text-xs text-primary hover:underline underline-offset-4'
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <Input
                        {...field}
                        id='login-password'
                        type='password'
                        aria-invalid={fieldState.invalid}
                        placeholder='••••••••'
                        autoComplete='current-password'
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
            </form>
          </CardContent>

          <CardFooter className='flex-col gap-3'>
            <Button
              type='submit'
              form='login-form'
              className='w-full'
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Signing in…' : 'Sign In'}
              {!isSubmitting && <ArrowRight className='ml-1.5 size-4' />}
            </Button>
            <p className='text-center text-sm text-muted-foreground'>
              Don&apos;t have an account?{' '}
              <Link
                href='/signup'
                className='font-medium text-primary hover:underline underline-offset-4'
              >
                Create one
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
