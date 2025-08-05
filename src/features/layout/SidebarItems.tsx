import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Grid, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

import { SIDEBAR_ITEMS } from '../../utils/constants/sidebarItems';

const SidebarItems = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleListItemClick = (path: string) => {
    navigate(path);

    return true;
  };

  const selectedIndex = SIDEBAR_ITEMS.findIndex(item => item.path === `/${location.pathname.split('/')?.[1]}`);

  return (
    <Grid sx={{ flex: 1, mt: '16px' }}>
      {SIDEBAR_ITEMS.map((item, index) => (
        <ListItemButton
          key={index}
          selected={selectedIndex === index}
          onClick={() => handleListItemClick(item.path)}
          sx={{
            gap: '16px',
            justifyContent: 'flex-start',
            textTransform: 'none',
            mb: '8px',
            borderRadius: '5px',
            color: selectedIndex === index ? 'white' : 'grey',
            backgroundColor: selectedIndex === index ? 'black' : 'transparent',
            '&:hover': {
              backgroundColor: 'grey',
              borderRadius: '5px'
            },
            '&.Mui-selected': {
              color: 'white',
              backgroundColor: 'black',
              '&:hover': {
                backgroundColor: 'grey'
              }
            }
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 'auto',
              color: selectedIndex === index ? 'white' : 'black'
            }}
          >
            {<item.icon />}
          </ListItemIcon>
          <Typography
            sx={{
              letterSpacing: '0.15px',
              color: selectedIndex === index ? 'white' : 'black'
            }}
          >
            {item.text}
          </Typography>
        </ListItemButton>
      ))}
    </Grid>
  );
};

export default SidebarItems;
