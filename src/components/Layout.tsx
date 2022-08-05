import Header from './Header';
import Footer from './Footer';
import { Box } from '@mui/material';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <Box sx={{ flexGrow: 1 }} component="div">
        {children}
      </Box>
      <Footer />
    </>
  );
}
