import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { logout } from '../../reduxApi/actions/authActions';
import { useDispatch, useSelector } from 'react-redux';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
const drawerWidth = 240;

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

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : `alpha(theme.palette.background.default, 0.4)`,
  boxShadow: (theme.vars || theme).shadows[1],
  padding: '8px 12px',
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme({
    
});

export default function Appbar(props) {
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(logout())
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar 
          position="fixed"
          enableColorOnDark
          sx={{
            boxShadow: 0,
            bgcolor: 'transparent',
            backgroundImage: 'none',
          }}
        >
          
          <StyledToolbar variant="dense" disableGutters>
            <Typography
              component="h1"
              variant="h5"
              color="inherit"
              noWrap
              sx={{ flexGrow: 2}}
              style={{fontFamily: "Playfair Display, serif", fontWeight: "831"}}
            >
              TEXT {<CompareArrowsIcon/>} SQL
            </Typography>
             
            {props.route == "home" ? 
              (<Button href= "/" color="inherit">{props.route}</Button> ):
              props.route == "logout"?
              (<Button onClick={handleSubmit} color="inherit">{props.route}</Button> ):
              <Button href= "/signin" color="inherit">{props.route}</Button>
            }
            
          </StyledToolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}