import * as z from 'zod';

export const usernameValidation = z.string().min(4).max(20);
export const signUpSchema = z.object({
  username: usernameValidation,
  name: z.string(),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be atleast 8 characters' }),
});
