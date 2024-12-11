import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { generateSQL,clearSqlState } from '../reduxApi/actions/sqlActions';
import { useState} from 'react';

export default function CustomizedInputBase() {

  const {sqlContent, generatedState} = useSelector(
    (state) => state.sql
  );

  const [state, setState] = useState({textContent : ''})
  const {textContent} = state
  const HandleChange = e =>{
    setState({
          ...state,
      [e.target.name] : e.target.value
    })
    
  } 
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(clearSqlState())
    dispatch(generateSQL(state))
    setState({textContent : ''})
  };

  return (
    <Paper
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 800 }}
    >
      <IconButton sx={{ p: '10px' }} aria-label="menu">
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Input Your Text"
        inputProps={{ 'aria-label': 'Input Your Text' }}
        name="textContent"
        id="textContent"
        value={textContent}
        onChange={HandleChange}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton type="button" sx={{ p: '20px' }} onClick={handleSubmit} aria-label="search">
        <ArrowForwardIcon />
      </IconButton>
    </Paper>
  );
}
