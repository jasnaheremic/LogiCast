import { Box } from '@mui/material';
import type { ReactNode } from 'react';

interface contentAreaProps {
  children: ReactNode;
}

const ContentArea = ({ children }: contentAreaProps) => {
  return (
    <Box
      sx={{
        flexDirection: 'column',
        flexGrow: 1,
        backgroundColor: '#F3F3E0',
        display: 'flex',
        p: '16px',
        overflowY: 'auto',
        height: '85vh'
      }}
    >
      {children}
    </Box>
  );
};

export default ContentArea;
