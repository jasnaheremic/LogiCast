
import { Box } from '@mui/material';


const Navbar = () => {

  return (
    <Box
      sx={{
        height: '50px',
        backgroundColor: "white",
        boxShadow: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: "10px",
        mx: "24px",
        my: "12px",
        p: "16px"
      }}
    >
        BreadCrumb ovdje ide
    </Box>
  );
};

export default Navbar;