import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Container, Stack, Button } from '@mui/material';
import { Code as CodeComponent } from '@/components/Code';
import {
  recoveryPasswordCodeSchema,
  RecoveryPasswordCodeData,
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
  } = useForm<RecoveryPasswordCodeData>({
    mode: 'onBlur',
    resolver: yupResolver(recoveryPasswordCodeSchema),
    defaultValues: {
      code: fullRecoveryPasswordData.code,
    },
  });
  const [getRecoveryCode] = useGetRecoveryCodeMutation();

  const resendCode = () =>
    getRecoveryCode({ email: fullRecoveryPasswordData.email }).unwrap().catch(console.error);

  const onSubmit = async (data: RecoveryPasswordCodeData) => {
    console.log(data);
    updateData(data);
    router.push('./new');
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
          <Button type="submit" variant="contained">
            Next
          </Button>
        </Stack>
      </Container>
    </>
  );
};

export default RecoveryPassword;
