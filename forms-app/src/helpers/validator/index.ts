import { z } from 'zod';
import { passwordStrengthScore } from '@/helpers/passwordStrength';

const nameRegex = /^[A-ZА-ЯЁ][\p{L}'\- ]+$/u;

export const baseSchema = z.object({
  name: z
    .string()
    .min(2, 'Required')
    .regex(nameRegex, { message: 'Should start with capital letter' }),
  age: z.preprocess(
    (val) => (val === '' ? undefined : Number(val)),
    z.number().min(18)
  ),
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(8, 'Min 8 chars'),
  confirmPassword: z.string().min(8, 'Confirm password'),
  gender: z.enum(['male', 'female', 'other']),
  acceptTos: z.boolean().refine((value) => value === true, {
    message: 'Accept terms to continue',
  }),
  country: z.string().min(2),
})
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords must match',
  });

export const submitSchema = baseSchema.refine(
  (data) => passwordStrengthScore(data.password) >= 4,
  {
    path: ['password'],
    message: 'Password is not strong enough',
  }
);

export type FormValues = z.infer<typeof baseSchema>;
