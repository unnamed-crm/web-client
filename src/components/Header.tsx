import type { FC } from 'react';
import NextLink from 'next/link';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Nav } from './Nav';

export const Header: FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <NextLink href="/">
          <Typography
            sx={{ marginRight: 'auto', ':hover': { cursor: 'pointer' } }}
            variant="h6"
            component="a"
          >
            UCRM
          </Typography>
        </NextLink>
        <Nav />
      </Toolbar>
    </AppBar>
  );
};
