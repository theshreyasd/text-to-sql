import axios from 'axios';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE, 
  REGISTER_REQUEST, 
  REGISTER_SUCCESS, 
  REGISTER_FAILURE} from '../../types'


const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000', // Match your server URL
  headers: {
    'Content-Type': 'application/json',
  },
});
  

export const login = (credentials) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  console.log(credentials)
  try {
    const response = await axiosInstance.post('/login', credentials);
    dispatch({
        type: LOGIN_SUCCESS, 
        payload: response.data 
    });
  } catch (error) {
    dispatch({ 
        type: LOGIN_FAILURE, 
        payload: {
          message: error.message, // Store the error message
          status: error.response ? error.response.status : null, // Store status code if available
        }, 
    });
  }
};

export const register = (credentials) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST});
  try {
    const response = await axiosInstance.post('/Register/', credentials);
    dispatch({
        type: REGISTER_SUCCESS, 
        payload: response.data 
    });
  } catch (error) {
    dispatch({ 
        type: REGISTER_FAILURE, 
        payload: {
          message: error.message, // Store the error message
          status: error.response ? error.response.status : null, // Store status code if available
        },
    });
  }
};
