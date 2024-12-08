import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import demoimg from '../images/pexels-pixabay-355747.jpg'
import { createTheme, ThemeProvider } from '@mui/material/styles';


const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#1976d2',
      },
    },
  });

export default function MediaCard(props) {
  return (
    <ThemeProvider theme={darkTheme}>
    <Card sx={{ maxWidth: 345 }} className='card'>
      <CardMedia
        sx={{ height: 240}}
        image= {demoimg}
        alt="Random Unsplash" 
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {props.maintext}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small"  variant="text" style={{color: "#ffffff"}}>Share</Button>
      </CardActions>
    </Card>
    </ThemeProvider>
  );
}
