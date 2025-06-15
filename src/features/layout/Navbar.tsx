import { Box } from '@mui/material';
import NavbarBreadcrumbs from './NavbarBreadcrumbs';

const Navbar = () => {
  return (
    <Box
      sx={{
        height: '50px',
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: '10px',
        mx: '24px',
        my: '12px',
        p: '5px',
        pl: '20px'
      }}
    >
      <NavbarBreadcrumbs />
    </Box>
  );
};

export default Navbar;
