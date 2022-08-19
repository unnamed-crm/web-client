import * as yup from 'yup';
import { emailSchema, codeSchema, passwordSchema } from '../shared.schema';

export const recoveryPasswordEmailSchema = yup.object({
  email: emailSchema,
});
type RecoveryPasswordEmailSchema = typeof recoveryPasswordEmailSchema;
export type RecoveryPasswordEmailData = yup.InferType<RecoveryPasswordEmailSchema>;

export const recoveryPasswordCodeSchema = yup.object({
  code: codeSchema,
});
type RecoveryPasswordCodeSchema = typeof recoveryPasswordCodeSchema;
export type RecoveryPasswordCodeData = yup.InferType<RecoveryPasswordCodeSchema>;

export const recoveryPasswordNewSchema = yup.object({
  newPassword: passwordSchema,
});
type RecoveryPasswordNewSchema = typeof recoveryPasswordNewSchema;
export type RecoveryPasswordNewData = yup.InferType<RecoveryPasswordNewSchema>;

export type FullRecoveryPasswordData = RecoveryPasswordEmailData &
  RecoveryPasswordCodeData &
  RecoveryPasswordNewData;
