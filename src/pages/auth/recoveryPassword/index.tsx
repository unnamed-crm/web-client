import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Container, Stack, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@/components/UI/LoadingButton';
import {
  recoveryPasswordEmailSchema,
  RecoveryPasswordEmailData,
} from '@/schemas/auth/recoveryPassword.schema';
import { useRecoveryPasswordContext } from '@/contexts/auth/RecoveryPassword.context';
import { useGetRecoveryCodeMutation } from '@/app/auth/auth.api';

const RecoveryPassword: NextPage = () => {
  const router = useRouter();
  const { data: fullRecoveryPasswordData, updateData } = useRecoveryPasswordContext();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RecoveryPasswordEmailData>({
    mode: 'onBlur',
    resolver: yupResolver(recoveryPasswordEmailSchema),
    defaultValues: {
      email: fullRecoveryPasswordData.email,
    },
  });
  const [getRecoveryCode, { isLoading }] = useGetRecoveryCodeMutation();

  const onSubmit = async (data: RecoveryPasswordEmailData) => {
    console.log(data);
    updateData(data);
    getRecoveryCode(data)
      .unwrap()
      .then(() => {
        router.push(router.pathname + '/code');
      })
      .catch(console.error);
  };

  return (
    <>
      <Container sx={{ height: '100%' }} component="main" maxWidth="xs">
        <Typography
          sx={{ margin: 2, textAlign: 'center', fontWeight: 'bold' }}
          component="h1"
          variant="h4"
        >
          Recovery Password
        </Typography>
        <Stack spacing={2} component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                required
                variant="outlined"
                label="Email"
                error={!!errors.email}
                helperText={errors?.email?.message}
                {...field}
              />
            )}
          />
          <LoadingButton type="submit" variant="contained" loading={isLoading}>
            Next
          </LoadingButton>
        </Stack>
      </Container>
    </>
  );
};

export default RecoveryPassword;
