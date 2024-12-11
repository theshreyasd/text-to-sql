import * as React from 'react';
import { useEffect } from 'react'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Appbar from'./appbar/Appbar';
import { styled} from '@mui/material/styles';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import '../App.css'
import '../Rainbow.css'
import Card from './Card'
import Search from './Search'
import Output from './outputForm'
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import {getUser} from '../reduxApi/actions/authActions'

// TODO remove, this demo shouldn't need to reset the theme.


const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#000000',
      }
    },
  });
  
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
    

export default function Home() {

  const {sqlContent, generatedState} = useSelector(
    (state) => state.sql
  );
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  };

  const { isAuthenticated, user, loading, error } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUser()); 
  }, []); 



  return (
    <ThemeProvider theme={darkTheme}>
        <Appbar route={isAuthenticated && isAuthenticated !== false? "logout" : "login"}/>
      <Container component="main" maxWidth="xl">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div component="h1" variant="h1" className='jaro-font' style={{fontSize : "30px"}}>
          Bridge the Gap: Transform Text into SQL or vice versa with Precision and Ease!
          </div>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 8 }}>
            <Grid container spacing={30}>
              <Grid item xs={12} sm={12}>
                <Search/>
              </Grid>
            </Grid>
          </Box>
            <Grid container spacing={5} style={{marginTop : "1px"}}>
              <Grid item xs={12} sm={12} className='card-row'>
                  {generatedState && generatedState !== false? <Output /> : null}
              </Grid>
            </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}