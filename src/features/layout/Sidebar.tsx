import { Avatar, Box, Button, Divider, Grid, Tooltip, Typography } from "@mui/material"
import SidebarItems from "./SidebarItems";

const Sidebar = () => {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        display: 'flex',
        flexDirection: 'column',
        m: '10px',
        p: "16px",
        boxShadow: 3,
        borderRadius: '10px',
        flexWrap: 'wrap',
        overflow: 'hidden',
      }}
    >
      <Grid

      >
        <Box
          sx={{
            pl: "10px",
            display: 'flex',
            flexDirection: 'column',
            '@media (max-width: 1000px) and (min-width: 900px)': {
              pl: "8px"
            }
          }}
        >
          <Typography>
          {/*variant="subtitle2"*/}
            LogiCast</Typography>
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
          mt: "16px",
          mb:  "16px",
          width: '100%'
        }}
      >
        <Avatar sx={{ mr:  "8px" }}>
         JD
        </Avatar>
        <Box sx={{ overflow: 'hidden' }}>
          <Typography variant="body2">
           {/* {userInfo?.employee.FirstName}*/}
           Jane Doe
            </Typography>
          <Tooltip title="e mail" placement="left-start">
            <Typography
              noWrap
              variant="caption"
              color="textSecondary"
              sx={{
                display: 'block'
              }}
            >
             email
            </Typography>
          </Tooltip>
        </Box>
      </Box>
      <Divider variant="middle" />
      <Button
        sx={{
          textTransform: 'none',
          justifyContent: 'flex-start',
          p: "16px"
        }}
      >
        <Typography
          variant="body1"
          sx={{
            color: "black",
            pl: "4px"
          }}
        >
          Sign Out
        </Typography>
      </Button>
    </Box>
  );
};

export default Sidebar;