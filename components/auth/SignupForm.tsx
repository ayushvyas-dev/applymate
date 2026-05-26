'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import createUser from '@/actions/auth';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

const formSchema = z.object({
  email: z.string().email('invalid email address'),
  password: z.string().min(2).max(30).trim(),
});

export default function SignUpForm() {
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
      const res = await createUser(data);
      if (!res) {
        toast.error('failed to create user');
        return;
      }
      toast.success('user created successfully');

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
    // <Card className='w-full max-w-sm'>
    //   <CardHeader>
    //     <CardTitle>Create your account</CardTitle>
    //     <CardDescription>
    //       Enter your name, email & password below to create your account
    //     </CardDescription>
    //     <CardAction>
    //       <Button variant='link'>
    //         <Link href='/login'>Log In</Link>
    //       </Button>
    //     </CardAction>
    //   </CardHeader>
    //   <CardContent>
    //     <form>
    //       <div className='flex flex-col gap-6'>
    //         <div className='grid gap-2'>
    //           <Label htmlFor='email'>Username</Label>
    //           <Input id='name' type='name' placeholder='' required />
    //         </div>
    //         <div className='grid gap-2'>
    //           <Label htmlFor='email'>Email</Label>
    //           <Input
    //             id='email'
    //             type='email'
    //             placeholder='abc@example.com'
    //             required
    //           />
    //         </div>
    //         <div className='grid gap-2'>
    //           <div className='flex items-center'>
    //             <Label htmlFor='password'>Password</Label>
    //           </div>
    //           <Input id='password' type='password' required />
    //         </div>
    //       </div>
    //     </form>
    //   </CardContent>
    //   <CardFooter className='flex-col gap-2'>
    //     <Button type='submit' className='w-full'>
    //       Signup
    //     </Button>
    //     <Button variant='outline' className='w-full'>
    //       Signup with Google
    //     </Button>
    //   </CardFooter>
    // </Card>

    <div className=' w-full  '>
      <Card className=' w-full max-w-sm mx-auto  max-h-[90vh]  flex flex-col '>
        <CardHeader className='shrink-0'>
          <CardTitle>Signup</CardTitle>
        </CardHeader>
        <CardContent className='flex-1 overflow-y-auto'>
          <form id='form-rhf-demo' onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name='email'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor='form-rhf-demo-title'>Email</FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      placeholder=''
                      autoComplete='off'
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
                    <FieldLabel htmlFor='form-rhf-demo-title'>
                      Password
                    </FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      placeholder=''
                      autoComplete='off'
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
    </div>
  );
}
