import { Box } from '@mui/material';
import NavbarBreadcrumbs from './NavbarBreadcrumbs';

const Navbar = () => {
  return (
    <Box
      sx={{
        height: '50px',
        backgroundColor: '#183B4E',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: '5px',
        pl: '20px'
      }}
    >
      <NavbarBreadcrumbs />
    </Box>
  );
};

export default Navbar;
