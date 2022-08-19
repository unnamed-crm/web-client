import type { FC, PropsWithChildren } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Box } from '@mui/material';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: FC<PropsWithChildren<LayoutProps>> = ({ children }) => {
  return (
    <>
      <Header />
      <Box sx={{ flexGrow: 1 }} component="div">
        {children}
      </Box>
      <Footer />
    </>
  );
};
