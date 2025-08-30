import { Box, Button, Typography } from '@mui/material';
import login from '../assets/login-picture.jpg';

export default function LoginPage() {
  const handleGoogleLogin = () => {
    const backendLoginUrl = 'http://localhost:5000/api/AuthControllers/login';
    window.location.href = backendLoginUrl;
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        backgroundImage: `url(${login})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <Box
        sx={{
          textAlign: 'center',
          backgroundColor: 'rgba(255,255,255,0.8)',
          p: 4,
          borderRadius: 2,
          boxShadow: 3
        }}
      >
        <Typography variant="h3" gutterBottom>
          Welcome to LogiCast
        </Typography>
        <Typography variant="body1" gutterBottom>
          Please sign in to continue to your dashboard.
        </Typography>

        <Button
          onClick={handleGoogleLogin}
          sx={{
            mt: 2,
            px: 3,
            py: 1,
            fontSize: '16px',
            backgroundColor: '#4285F4',
            color: '#fff',
            borderRadius: 1,
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#357ae8'
            }
          }}
        >
          Sign in with Google
        </Button>
      </Box>
    </Box>
  );
}
