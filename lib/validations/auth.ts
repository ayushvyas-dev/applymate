import * as z from 'zod';

export const SignupSchema = z.object({
  name: z.string().min(2).max(20),
  email: z.string().min(8).max(20),
  password: z.string(),
});

export const LoginSchema = z.object({
  email: z.string().min(8).max(20),
  password: z.string(),
});
