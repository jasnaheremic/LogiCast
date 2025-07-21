import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import ContentArea from './ContentArea';
import Navbar from './Navbar';

import type { ReactNode } from 'react';

interface LayoutProps {
  children?: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#F3F3E0',
        overflow: 'hidden'
      }}
    >
      <Sidebar />
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          minWidth: 0,
          transition: 'width 0.3s ease'
        }}
      >
        <Navbar />
        <ContentArea>{children}</ContentArea>
      </Box>
    </Box>
  );
};

export default Layout;
