import NextLink from 'next/link';
import { AppBar, Toolbar, Typography } from '@mui/material';
import Nav from './Nav';

export default function Header() {
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
}
