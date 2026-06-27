'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

import createUser from '@/actions/auth';
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
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from '@/components/ui/input-otp';

import Link from 'next/link';
import {
  ArrowRight,
  Sparkles,
  Mail,
  Lock,
  KeyRound,
  CheckCircle2,
} from 'lucide-react';

const formSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain an uppercase letter')
    .regex(/[a-z]/, 'Must contain a lowercase letter')
    .regex(/[0-9]/, 'Must contain a number')
    .max(30)
    .trim(),
  otp: z
    .string()
    .length(6, { message: 'OTP must be exactly 6 digits' })
    .regex(/^\d+$/, { message: 'OTP must contain only numbers' }),
});

export default function SignUpForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      otp: '',
    },
  });

  const router = useRouter();

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const res = await createUser(data);
      if (!res) {
        toast.error('Failed to create account');
        return;
      }
      toast.success('Account created successfully!');
      router.push('/dashboard');
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    }
  }

  const isSubmitting = form.formState.isSubmitting;
  const password = form.watch('password');

  /* password strength indicators */
  const checks = [
    { label: '8+ characters', met: password.length >= 8 },
    { label: 'Uppercase', met: /[A-Z]/.test(password) },
    { label: 'Lowercase', met: /[a-z]/.test(password) },
    { label: 'Number', met: /[0-9]/.test(password) },
  ];

  return (
    <div className='flex min-h-screen items-center justify-center px-4 py-12'>
      {/* Background blobs matching hero */}
      <div
        aria-hidden
        className='pointer-events-none fixed inset-0 -z-10 overflow-hidden'
      >
        <div className='absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/8 blur-3xl' />
        <div className='absolute -bottom-20 -left-20 h-[300px] w-[300px] rounded-full bg-chart-3/8 blur-3xl' />
      </div>

      <div className='w-full max-w-md'>
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

        <Card className='shadow-lg'>
          <CardHeader className='text-center'>
            <CardTitle className='text-xl'>Create your account</CardTitle>
            <CardDescription>
              Start tracking your job applications with AI
            </CardDescription>
          </CardHeader>

          <CardContent>
            {/* Google Sign Up */}
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
                or sign up with email
              </span>
            </div>

            {/* Form */}
            <form
              id='signup-form'
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FieldGroup>
                {/* Email */}
                <Controller
                  name='email'
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor='signup-email'>
                        <Mail className='size-3.5 text-muted-foreground' />
                        Email
                      </FieldLabel>
                      <Input
                        {...field}
                        id='signup-email'
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

                {/* Password */}
                <Controller
                  name='password'
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor='signup-password'>
                        <Lock className='size-3.5 text-muted-foreground' />
                        Password
                      </FieldLabel>
                      <Input
                        {...field}
                        id='signup-password'
                        type='password'
                        aria-invalid={fieldState.invalid}
                        placeholder='••••••••'
                        autoComplete='new-password'
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}

                      {/* Strength indicators */}
                      {password.length > 0 && (
                        <div className='mt-1.5 flex flex-wrap gap-x-3 gap-y-1'>
                          {checks.map((c) => (
                            <span
                              key={c.label}
                              className={`inline-flex items-center gap-1 text-[11px] transition-colors ${
                                c.met
                                  ? 'text-emerald-500'
                                  : 'text-muted-foreground'
                              }`}
                            >
                              <CheckCircle2
                                className={`size-3 ${
                                  c.met ? 'opacity-100' : 'opacity-40'
                                }`}
                              />
                              {c.label}
                            </span>
                          ))}
                        </div>
                      )}
                    </Field>
                  )}
                />

                {/* OTP */}
                <Controller
                  name='otp'
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor='signup-otp'>
                        <KeyRound className='size-3.5 text-muted-foreground' />
                        Verification Code
                      </FieldLabel>
                      <InputOTP
                        maxLength={6}
                        value={field.value}
                        onChange={field.onChange}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                      <p className='text-[11px] text-muted-foreground'>
                        Check your email for the 6-digit code
                      </p>
                    </Field>
                  )}
                />
              </FieldGroup>
            </form>
          </CardContent>

          <CardFooter className='flex-col gap-3'>
            <Button
              type='submit'
              form='signup-form'
              className='w-full'
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating account…' : 'Create Account'}
              {!isSubmitting && <ArrowRight className='ml-1.5 size-4' />}
            </Button>
            <p className='text-center text-sm text-muted-foreground'>
              Already have an account?{' '}
              <Link
                href='/login'
                className='font-medium text-primary hover:underline underline-offset-4'
              >
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>

        {/* Trust footer */}
        <p className='mt-6 text-center text-xs text-muted-foreground'>
          By creating an account you agree to our{' '}
          <Link href='#' className='underline underline-offset-4 hover:text-foreground'>
            Terms
          </Link>{' '}
          and{' '}
          <Link href='#' className='underline underline-offset-4 hover:text-foreground'>
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
