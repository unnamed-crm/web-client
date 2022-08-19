import { NextPage } from 'next';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Container, Stack, TextField, Typography, Link } from '@mui/material';
import { LoadingButton } from '@/components/UI/LoadingButton';
import { useLoginMutation } from '@/app/auth/auth.api';
import { loginSchema, LoginData } from '@/schemas/auth/login.schema';

const Login: NextPage = () => {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginData>({
    mode: 'onBlur',
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = async (data: LoginData) => {
    login(data)
      .unwrap()
      .then(() => {
        router.push('/');
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
          Login
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
          <NextLink href="/auth/recoveryPassword">
            <Link href="">forgot password?</Link>
          </NextLink>
          <LoadingButton type="submit" variant="contained" loading={isLoading}>
            Login
          </LoadingButton>
        </Stack>
      </Container>
    </>
  );
};

export default Login;
