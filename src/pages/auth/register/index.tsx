import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Container, Stack, Button, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@/components/UI/LoadingButton';
import { registerSchema, type RegisterData } from '@/schemas/auth/register.schema';
import { useRegisterContext } from '@/contexts/auth/Register.context';
import { useGetVerifyCodeMutation } from '@/app/auth/auth.api';

const Register: NextPage = () => {
  const router = useRouter();
  const { data: fullRegisterData, updateData } = useRegisterContext();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterData>({
    mode: 'onBlur',
    resolver: yupResolver(registerSchema),
    defaultValues: {
      email: fullRegisterData.email,
      password: fullRegisterData.password,
      confirmPassword: fullRegisterData.password,
    },
  });
  const [getVerifyCode, { isLoading }] = useGetVerifyCodeMutation();

  const onSubmit = async (data: RegisterData) => {
    updateData(data);
    getVerifyCode({ email: data.email })
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
          Register
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
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                required
                variant="outlined"
                label="Password"
                error={!!errors.password}
                helperText={errors?.password?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <TextField
                required
                variant="outlined"
                label="Confirm Password"
                error={!!errors.confirmPassword}
                helperText={errors?.confirmPassword?.message}
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

export default Register;
