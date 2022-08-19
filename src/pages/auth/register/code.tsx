import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Container, Stack } from '@mui/material';
import { Code as CodeComponent } from '@/components/Code';
import { LoadingButton } from '@/components/UI/LoadingButton';
import { registerCodeSchema, RegisterCodeData } from '@/schemas/auth/register.schema';
import { useRegisterContext } from '@/contexts/auth/Register.context';
import { useRegisterMutation, useGetVerifyCodeMutation } from '@/app/auth/auth.api';

const Code: NextPage = () => {
  const router = useRouter();
  const { data: fullRegisterData, updateData, resetData } = useRegisterContext();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterCodeData>({
    mode: 'onBlur',
    resolver: yupResolver(registerCodeSchema),
    defaultValues: {
      code: fullRegisterData.code,
    },
  });
  const [register, { isLoading }] = useRegisterMutation();
  const [getVerifyCode] = useGetVerifyCodeMutation();

  const resendCode = () =>
    getVerifyCode({ email: fullRegisterData.email }).unwrap().catch(console.error);

  const onSubmit = async (data: RegisterCodeData) => {
    updateData(data);
    const normalizedCode = parseInt(data.code, 10);
    const payload = {
      email: fullRegisterData.email,
      password: fullRegisterData.password,
      code: normalizedCode,
    };
    register(payload)
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
            name="code"
            control={control}
            render={({ field: { onChange, value } }) => (
              <CodeComponent
                required
                variant="outlined"
                label="Verification Code"
                error={!!errors.code}
                helperText={errors?.code?.message}
                value={value}
                onChange={({ target: { value } }) => onChange(value.replace(/[^0-9]/g, '') || '')}
                onTimerRestart={resendCode}
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

export default Code;
