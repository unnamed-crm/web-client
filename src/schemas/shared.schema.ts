import * as yup from 'yup';

export const emailSchema = yup
  .string()
  .required('This field is required')
  .email('Email is not valid');
type EmailSchema = typeof emailSchema;
export type EmailData = yup.InferType<EmailSchema>;

export const passwordSchema = yup
  .string()
  .transform((value) => value || undefined)
  .required('This field is required')
  .min(5, 'Password is too short');
type PasswordSchema = typeof passwordSchema;
export type PasswordData = yup.InferType<PasswordSchema>;

export const codeSchema = yup.string().required('This field is required');
type CodeSchema = typeof codeSchema;
export type CodeData = yup.InferType<CodeSchema>;
