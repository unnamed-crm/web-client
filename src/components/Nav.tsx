import type { FC } from 'react';
import NextLink from 'next/link';
import { Button, Stack } from '@mui/material';
import { useTypedSelector, useTypedDispatch } from '@/app/store';
import { authActions } from '@/app/auth/auth.slice';

export const Nav: FC = () => {
  const dispatch = useTypedDispatch();
  const logout = () => dispatch(authActions.logout());
  const isLoggedIn = useTypedSelector((state) => !!state.auth.token);

  return (
    <Stack direction="row" spacing={2}>
      {isLoggedIn && (
        <Button color="inherit" variant="outlined" onClick={logout}>
          Logout
        </Button>
      )}
      {!isLoggedIn && (
        <>
          <NextLink href="/auth/login">
            <Button color="inherit" variant="text">
              Login
            </Button>
          </NextLink>
          <NextLink href="/auth/register">
            <Button color="inherit" variant="outlined">
              Register
            </Button>
          </NextLink>
        </>
      )}
    </Stack>
  );
};
