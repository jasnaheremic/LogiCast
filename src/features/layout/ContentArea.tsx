import { Box } from '@mui/material';
import { ReactNode } from 'react';

interface contentAreaProps {
  children: ReactNode;
}

const ContentArea = ({ children }: contentAreaProps) => {
  return (
    <Box
      sx={{
        flexDirection: 'column',
        flexGrow: 1,
        backgroundColor: 'white',
        display: 'flex',
        borderRadius: '10px',
        mx: '24px',
        my: '12px',
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
