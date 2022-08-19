import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Container, Stack, TextField } from '@mui/material';
import { LoadingButton } from '@/components/UI/LoadingButton';
import {
  recoveryPasswordNewSchema,
  type RecoveryPasswordNewData,
} from '@/schemas/auth/recoveryPassword.schema';
import { useRecoveryPasswordContext } from '@/contexts/auth/RecoveryPassword.context';
import { useRecoveryPasswordMutation } from '@/app/auth/auth.api';

const RecoveryPassword: NextPage = () => {
  const router = useRouter();
  const { data: fullRecoveryPasswordData, updateData, resetData } = useRecoveryPasswordContext();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RecoveryPasswordNewData>({
    mode: 'onBlur',
    resolver: yupResolver(recoveryPasswordNewSchema),
    defaultValues: {
      newPassword: fullRecoveryPasswordData.newPassword,
    },
  });
  const [recoveryPassword, { isLoading }] = useRecoveryPasswordMutation();

  const onSubmit = async (data: RecoveryPasswordNewData) => {
    console.log(data);
    updateData(data);
    const normalizedCode = parseInt(fullRecoveryPasswordData.code, 10);
    const payload = {
      email: fullRecoveryPasswordData.email,
      code: normalizedCode,
      password: fullRecoveryPasswordData.newPassword,
    };
    recoveryPassword(payload)
      .unwrap()
      .then(() => {
        resetData();
        router.push('/');
      })
      .catch(console.error);
  };

  return (
    <>
      <Container sx={{ height: '100%' }} component="main" maxWidth="xs">
        <Stack
          sx={{ marginTop: 2 }}
          spacing={2}
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            name="newPassword"
            control={control}
            render={({ field }) => (
              <TextField
                required
                variant="outlined"
                label="New password"
                error={!!errors.newPassword}
                helperText={errors?.newPassword?.message}
                {...field}
              />
            )}
          />
          <LoadingButton type="submit" variant="contained" loading={isLoading}>
            Complete
          </LoadingButton>
        </Stack>
      </Container>
    </>
  );
};

export default RecoveryPassword;
