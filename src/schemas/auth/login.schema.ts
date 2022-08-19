import * as yup from 'yup';
import { emailSchema, passwordSchema } from '../shared.schema';

export const loginSchema = yup.object({
  email: emailSchema,
  password: passwordSchema,
});
type LoginSchema = typeof loginSchema;
export type LoginData = yup.InferType<LoginSchema>;
