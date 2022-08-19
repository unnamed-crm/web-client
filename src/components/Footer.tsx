import type { FC } from 'react';
import { Box, Link, Typography } from '@mui/material';

export const Footer: FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        marginTop: 'auto',
        padding: 1,
        display: 'flex',
        justifyContent: 'center',
      }}
      component="footer"
    >
      <Link href="https://github.com/unnamed-crm/web-client" target="_blank" color="inherit">
        <Typography color="inherit">Repo</Typography>
      </Link>
    </Box>
  );
};
