import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Person2Icon from '@mui/icons-material/Person2';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import InsightsIcon from '@mui/icons-material/Insights';
import GroupsIcon from '@mui/icons-material/Groups';
import MapIcon from '@mui/icons-material/Map';
import InfoIcon from '@mui/icons-material/Info';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { toast } from 'react-toastify';
import styles from './Sidebar.module.css';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export const Tool = styled(Toolbar)`
    display: flex;
    justify-content: space-between;
`

const Footer = styled('div')({
  background: 'lightgrey',
  borderTop: '1px solid lightgrey',
  textAlign: 'center',
  padding: '10px',
  width: '100vw',
  '@media (max-width: 400px)': {
    width: '90vw'
  },
});


export default function Sidebar() {
  const [open, setOpen] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const userInfo = localStorage.getItem("token");
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  React.useEffect(() => {
    console.log("hit-sidebar");
    const handleResize = () => {
      // Check the window width to determine if it's a mobile device
      setIsMobile(window.innerWidth <= 768); // You can adjust the threshold as needed
    };

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Box sx={{ display: 'flex' }} style={{'overflow-x': 'hidden'}}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Tool sx={{color: 'black'}}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{width: '100%', display: 'flex', justifyContent: 'space-between'}}> 
              {
                !isMobile && <Box component='img' sx={{
                  height: '5vh',
                  width: '3vw'
                }} src='/Bharat_rohan.svg'></Box>
              }
              <Typography variant="h6" noWrap component="div">
                CropAssure ®
              </Typography>
              <Box>
                {
                  !isMobile && <Box component='img' sx={{
                    height: '5vh',
                    width: '12vw',
                    paddingRight: '2vw'
                  }} src='/svm_logo.png'></Box>
                }
                  { userInfo && <LogoutIcon
                  style={{'cursor': 'pointer'}}
                  onClick={() => {
                    localStorage.clear();
                    navigate('/')
                    toast.success('Logged Out Successfully')
                  }}
                />}   
              </Box> 
            </Box>  
          </Tool>
        </AppBar>
        <Drawer PaperProps={{
            sx: {
              backgroundColor: "#193C34",
              color: "white",
            }
          }} 
          variant="permanent" open={open}
          >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            <ListItem key="Dashboard" className={location.pathname==='/dashboard' ? styles.listColor : ''} disablePadding sx={{ display: 'block' }}>
                <Link to="/dashboard"  style={{ textDecoration: 'none', color: 'inherit' }}>
                <ListItemButton
                    sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    }}
                >
                    <ListItemIcon
                    sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                    }}
                    >
                    <InsightsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
                </Link>
            </ListItem>
            <ListItem key="Farmers" className={location.pathname==='/farmers' || location.pathname.includes('profile') ? styles.listColor : ''} disablePadding sx={{ display: 'block' }}>
                <Link to="/farmers" style={{ textDecoration: 'none', color: 'inherit' }}>
                <ListItemButton
                    sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    }}
                >
                    <ListItemIcon
                    sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                    }}
                    >
                    <GroupsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Farmer" sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
                </Link>
            </ListItem>
            {/* <ListItem key="Map" disablePadding sx={{ display: 'block' }}>
                    <Link to="/map" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ListItemButton
                        sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                        }}
                    >
                        <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                        }}
                        >
                        <MapIcon />
                        </ListItemIcon>
                        <ListItemText primary="Map" sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                    </Link>
            </ListItem> */}
            {/* <ListItem key="View" disablePadding sx={{ display: 'block' }}>
                <Link to="/view" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ListItemButton
                        sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                        }}
                    >
                        <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                        }}
                        >
                        <Person2Icon />
                        </ListItemIcon>
                        <ListItemText primary="View" sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                    </Link>
            </ListItem> */}
            <ListItem key="About" className={location.pathname==='/about' ? styles.listColor : ''} disablePadding sx={{ display: 'block' }}>
                    <Link to="/about" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ListItemButton
                        sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                        }}
                    >
                        <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                        }}
                        >
                        <InfoIcon />
                        </ListItemIcon>
                        <ListItemText primary="About" sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                    </Link>
            </ListItem>

          </List>
          <Divider />
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, overflowX : 'hidden' }}>
          <Box sx={{p: 3}} style={{minHeight: '95vh'}}>
            <DrawerHeader />
            <Outlet />
          </Box>
          <Footer>
            <Typography style={{'wordWrap': 'break-word'}}>Copyright © 2023 BharatRohan® - Revitalizing agriculture</Typography>
          </Footer>
        </Box>
      </Box>
      
    </>
  );
}