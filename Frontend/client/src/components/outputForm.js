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
import Divider from '@mui/material/Divider';
import { format } from "sql-formatter";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark, dracula} from "react-syntax-highlighter/dist/esm/styles/prism"; // Theme for highlighting
import CircularProgress from '@mui/material/CircularProgress';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffffff',
    }
  },
});


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

  const [formattedSql, setFormattedSql] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      if (sqlContent.sqlContent) {
        try {
          const formatted = format(sqlContent.sqlContent, { language: "sql" });
          setFormattedSql(formatted);
        } catch (error) {
          console.error("Error formatting SQL:", error);
          setFormattedSql("Error formatting SQL. Please check your query.");
        }
      } else {
        setFormattedSql("");
      }
    }, 500); // Debounce delay in milliseconds

    return () => clearTimeout(timer); // Cleanup the timer on input change or unmount
  }, [sqlContent.sqlContent]);


  return (
    <ThemeProvider theme={darkTheme}>
    <Card variant="outlined"sx={{ minWidth: 800, textAlign:'center'}}>
      <CardContent>
      <Typography variant="body2" 
        sx={{
          color: 'primary',
          fontSize: '15px',
          marginBottom:'20px', 
          fontFamily: "monospace",
        }}>
        {generatedState ? sqlContent.textContent : ''}
      </Typography>
      <Divider/>
      {formattedSql ? (
          <SyntaxHighlighter
            language="sql"
            style={atomDark} // Theme for syntax highlighting
            customStyle={{
              fontSize: "14px",
              lineHeight: "1.5",
              borderRadius: "5px",
              padding: "10px",
              whiteSpace: "pre-wrap",
              marginTop:'15px'
            }}
          >
            {formattedSql}
          </SyntaxHighlighter>
        ) : (
          <CircularProgress sx={{marginTop:'15px'}}/>
        )}
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: 'center', alignItems: 'center' }}>
        {isAuthenticated ? <Button size="small" onClick={addquery}>Save in personal records</Button> : ''}
        <Divider orientation="vertical" variant="middle" flexItem/>
        <Button size="small" onClick={handleCopy}>Copy</Button>
        <Divider orientation="vertical" variant="middle" flexItem/>
        <Button size="small" onClick={handleClose}>Close</Button>
      </CardActions>
      {addQuerySuccess && addQuerySuccess !== null ? <Alert severity="success">{addQuerySuccess}</Alert> : ''}
    </Card>
    </ThemeProvider>
  );
}