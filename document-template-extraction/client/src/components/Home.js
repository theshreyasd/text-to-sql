import * as React from 'react';
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
import Card from './Card'
import Search from './Search'


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
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  };

  return (
    <ThemeProvider theme={darkTheme}>
        <Appbar route={"login"}/>
      <Container component="main" maxWidth="xl">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 25,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div component="h1" variant="h1" className='HeaderFont' style={{fontSize : "30px"}}>
          Bridge the Gap: Transform Text into SQL with Precision and Ease!
          </div>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 8 }}>
            <Grid container spacing={30}>
              <Grid item xs={12} sm={12}>
                {/* <Button
                   component="label"
                   role={undefined}
                   variant="contained"
                   tabIndex={-1}
                   startIcon={<AttachFileIcon />}
                   style={{backgroundColor : "#000000", width: "300px", height:"45px"}}
                >
                  Upload files
                  <VisuallyHiddenInput type="file" />
                </Button> */}
                <Search/>
              </Grid>
            </Grid>
          </Box>
            <Grid container spacing={5} style={{marginTop : "1px"}}>
              <Grid item xs={12} sm={12} className='card-row'>
                <Card name = {"Offer Letter"} maintext = {"We are delighted to extend this offer of employment to you for the position of [Job Title] at [Company Name]. We believe that your skills and experience will be valuable assets to our team, and we look forward to the contributions you will make."}/>
                <Card name = {"Rejection Letter"} maintext = {"We are delighted to extend this offer of employment to you for the position of [Job Title] at [Company Name]. We believe that your skills and experience will be valuable assets to our team, and we look forward to the contributions you will make."}/>
                <Card name = {"Salary Slip"} maintext = {"We are delighted to extend this offer of employment to you for the position of [Job Title] at [Company Name]. We believe that your skills and experience will be valuable assets to our team, and we look forward to the contributions you will make."}/>
                {/* <Card name = {"Offer Letter"} maintext = {"We are delighted to extend this offer of employment to you for the position of [Job Title] at [Company Name]. We believe that your skills and experience will be valuable assets to our team, and we look forward to the contributions you will make."}/> */}
              </Grid>
            </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}