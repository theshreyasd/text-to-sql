import axios from 'axios';
import {
SQL_FAILURE, 
SQL_REQUEST, 
SQL_SUCCESS, 
CLEAR_SQL_STATE, 
ADD_QUERY_FAILURE, 
ADD_QUERY__SUCCESS, 
ADD_QUERY_REQUEST
} from '../../types'


const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000', // Match your server URL
  headers: {
    'Content-Type': 'application/json',
  },
});
  

export const generateSQL = (content) => async (dispatch) => {
  dispatch({ type: SQL_REQUEST });
  try {
    const response = await axiosInstance.post('/Generate_sql/', content);
    dispatch({
        type: SQL_SUCCESS, 
        payload: response.data.message
    });
  } catch (error) {
    dispatch({ 
        type: SQL_FAILURE, 
        payload: {
          message: error.response.data.error, // Store the error message
        }, 
    });
  }
};

export const clearSqlState = () => async (dispatch) => {
  dispatch({ 
    type: CLEAR_SQL_STATE, 
});
};


export const addQuery = (content) => async (dispatch) => {
  dispatch({ type: ADD_QUERY_REQUEST });
  try {
    const response = await axiosInstance.post('/Add_uery/', content);
    dispatch({
        type: ADD_QUERY__SUCCESS, 
        payload: response.data.message
    });
  } catch (error) {
    dispatch({ 
        type: ADD_QUERY_FAILURE, 
        payload: {
          message: error.response.data.error, // Store the error message
        }, 
    });
  }
};

  