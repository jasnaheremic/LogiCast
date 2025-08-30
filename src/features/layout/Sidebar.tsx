import { Avatar, Box, Button, Divider, Grid, Tooltip, Typography } from '@mui/material';

import { useTranslation } from 'react-i18next';
import SidebarItems from './SidebarItems';

const Sidebar = () => {
  const { t } = useTranslation();

  const handleLogout = () => {
    // Redirect to your .NET backend's logout endpoint
    window.location.href = 'http://localhost:5000/api/AuthControllers/logout'; // Use your backend's port
  };

  return (
    <Box
      sx={{
        backgroundColor: '#183B4E',
        display: 'flex',
        flexDirection: 'column',
        p: '16px',
        boxShadow: 3,
        flexWrap: 'wrap',
        overflow: 'hidden'
      }}
    >
      <Grid>
        <Box
          sx={{
            pl: '10px',
            display: 'flex',
            flexDirection: 'column',
            '@media (max-width: 1000px) and (min-width: 900px)': {
              pl: '8px'
            }
          }}
        >
          <Typography color="white" fontWeight="200">
            {t('title.logiCast')}
          </Typography>
        </Box>
      </Grid>
      <Box
        sx={{
          flex: 1,
          width: '100%'
        }}
      >
        <SidebarItems />
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mt: '16px',
          mb: '16px',
          width: '100%'
        }}
      >
        <Avatar sx={{ mr: '8px' }}>JD</Avatar>
        <Box sx={{ overflow: 'hidden' }}>
          <Typography color="white" variant="body2">
            Admin
          </Typography>
        </Box>
      </Box>
      <Divider variant="middle" />
      <Button
        onClick={handleLogout}
        sx={{
          textTransform: 'none',
          justifyContent: 'flex-start',
          p: '16px'
        }}
      >
        <Typography
          variant="body1"
          sx={{
            color: 'white',
            pl: '4px'
          }}
        >
          {t('buttons.signOut')}
        </Typography>
      </Button>
    </Box>
  );
};

export default Sidebar;
