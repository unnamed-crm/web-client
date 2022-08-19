import { FC, PropsWithChildren } from 'react';
import { Stack, Button, CircularProgress, SxProps, Box, ButtonProps } from '@mui/material';

interface LoadingButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  loading?: boolean;
  sx?: SxProps;
}

export const LoadingButton: FC<PropsWithChildren<LoadingButtonProps & ButtonProps>> = ({
  children,
  type = 'button',
  loading = false,
  sx = {},
  ...rest
}) => {
  return (
    <Button
      sx={{
        color: loading ? 'grey.500' : '',
        backgroundColor: loading ? 'grey500' : '',
        appearance: loading ? 'none' : 'auto',
        cursor: loading ? 'not-allowed' : 'pointer',
        ...sx,
      }}
      disabled={loading}
      type={type}
      {...rest}
    >
      <Stack direction="row" alignItems="center" spacing={1}>
        {loading && <CircularProgress color="inherit" size={16} />}
        {loading && <Box>Pending</Box>}
        {!loading && <Box>{children}</Box>}
      </Stack>
    </Button>
  );
};
