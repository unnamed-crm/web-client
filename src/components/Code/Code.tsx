import { FC, PropsWithChildren, useEffect } from 'react';
import { Box, TextField, Typography, TextFieldProps } from '@mui/material';
import { useTimer } from '@/hooks/useTimer';
import { LoadingButton } from '../UI/LoadingButton';

interface CodeProps {
  onTimerRestart?: () => void;
}

export const Code: FC<PropsWithChildren<CodeProps & TextFieldProps>> = ({
  children,
  onTimerRestart = () => undefined,
  ...rest
}) => {
  const { mins, secs, start, restart, isOver } = useTimer({ expiredTime: 300 });

  const restartTimer = () => {
    onTimerRestart();
    restart();
  };

  useEffect(() => {
    start();
  }, [start]);

  return (
    <>
      <TextField {...(rest as TextFieldProps)} />
      {!isOver && (
        <Box>
          <Typography component="span">
            You may resend in {mins.toString().padStart(2, '0')}:{secs.toString().padStart(2, '0')}
          </Typography>
        </Box>
      )}
      {isOver && (
        <LoadingButton variant="text" onClick={restartTimer}>
          Resend
        </LoadingButton>
      )}
    </>
  );
};
