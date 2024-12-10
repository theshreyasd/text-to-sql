import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect } from "react";
import { useState} from 'react';
import { clearSqlState, addQuery} from '../reduxApi/actions/sqlActions';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';



const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffffff',
    }
  },
});
const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function BasicCard() {
  const { isAuthenticated } = useSelector(
    (state) => state.auth
  );


  const {sqlContent, generatedState, addQuerySuccess} = useSelector(
    (state) => state.sql
  );
  const dispatch = useDispatch();
  const addquery = (e) => {
    dispatch(addQuery(sqlContent))
  };
  const handleClose = (e) => {
    dispatch(clearSqlState())
  };
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(sqlContent.sqlContent); // Copy text to clipboard
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset copied status after 2 seconds
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
    <Card sx={{ minWidth: 800 }}>
      <CardContent sx = {{textAlign: 'center'}}>
        <div component="h1" variant="h1" className='bebas-neue-regular' style={{fontSize : "30px"}}>
        {generatedState ? sqlContent.sqlContent : ''}
          </div>
      </CardContent>
      <CardActions sx={{ marginLeft: 70, marginBottom:3 }}>
        {isAuthenticated ? <Button variant="outlined" size="small" onClick={addquery}>Save in personal records</Button> : ''}
        <Button variant="outlined" size="small" onClick={handleCopy}>Copy</Button>
        <Button variant="outlined" size="small" onClick={handleClose}>Close</Button>
      </CardActions>
      {addQuerySuccess && addQuerySuccess !== null ? <Alert severity="success">{addQuerySuccess}</Alert> : ''}
    </Card>
    </ThemeProvider>
  );
}
