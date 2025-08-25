import { z } from 'zod';
import { passwordStrengthScore } from '@/helpers/passwordStrength';

const nameRegex = /^[A-ZА-ЯЁ][\p{L}'\- ]+$/u;

export const submitSchema = z
  .object({
    name: z
      .string()
      .min(2, 'Required')
      .regex(nameRegex, { message: 'Should start with capital letter' }),
    age: z.coerce.number().min(18, 'Must be at least 18'),
    email: z.string().email({ message: 'Invalid email' }),
    password: z.string().min(8, 'Min 8 chars'),
    confirmPassword: z.string().min(8, 'Confirm password'),
    gender: z.enum(['male', 'female', 'other']),
    acceptTos: z.boolean().refine((value) => value === true, {
      message: 'Accept terms to continue',
    }),
    country: z.string().min(2),
    file: z
      .instanceof(File)
      .refine(
        (file) => ['image/png', 'image/jpeg'].includes(file.type),
        { message: 'Only png/jpeg allowed' }
      )
      .refine((file) => file.size <= 2 * 1024 * 1024, {
        message: 'Max 2MB',
      })
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords must match',
  })
  .refine((data) => passwordStrengthScore(data.password) >= 4, {
    path: ['password'],
    message: 'Password is not strong enough',
  });

export type FormValues = z.infer<typeof submitSchema>;
