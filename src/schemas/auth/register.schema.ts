import * as yup from 'yup';
import { emailSchema, passwordSchema, codeSchema } from '../shared.schema';

export const registerSchema = yup.object({
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: yup
    .string()
    .required('This field is required')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});
type RegisterSchema = typeof registerSchema;
export type RegisterData = yup.InferType<RegisterSchema>;

export const registerCodeSchema = yup.object({
  code: codeSchema,
});
type RegisterCodeSchema = typeof registerCodeSchema;
export type RegisterCodeData = yup.InferType<RegisterCodeSchema>;

export type FullRegisterData = RegisterData & RegisterCodeData;
