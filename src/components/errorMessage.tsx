import { Box, Typography, useTheme } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import { grey } from '@mui/material/colors';

interface ErrorProps {
  label: string;
}

const ErrorMessage = ({ label }: ErrorProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: theme.spacing(2),
        mb: theme.spacing(4),
        borderRadius: '5px',
        maxWidth: '550px',
        backgroundColor: grey[100],
        borderLeft: `4px solid ${theme.palette.error.main}`
      }}
    >
      <ErrorIcon sx={{ color: theme.palette.error.main }} />
      <Box sx={{ ml: theme.spacing(2) }}>
        <Typography variant="body1">{label}</Typography>
      </Box>
    </Box>
  );
};

export default ErrorMessage;