import axios from 'axios';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE, 
  REGISTER_REQUEST, 
  REGISTER_SUCCESS, 
  REGISTER_FAILURE, 
  LOGOUT_FAILURE, 
  LOGOUT_SUCCESS, 
  LOGOUT_REQUEST, 
  GET_USER_FAILURE, 
  GET_USER_SUCCESS, 
  GET_USER_REQUEST} from '../../types'


const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000', // Match your server URL
  headers: {
    'Content-Type': 'application/json',
  },
});
  

export const login = (credentials) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const response = await axiosInstance.post('/Login/', credentials);
    dispatch({
        type: LOGIN_SUCCESS, 
        payload: response.data 
    });
  } catch (error) {
    dispatch({ 
        type: LOGIN_FAILURE, 
        payload: {
          message: error.response.data.error, // Store the error message
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
          message: error.response.data.error // Store the error message
        },
    });
  }
};


export const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT_REQUEST });
  try {
    const response = await axiosInstance.post('/Logout/');
    dispatch({
        type: LOGOUT_SUCCESS, 
        payload: response.data 
    });
  } catch (error) {
    dispatch({ 
        type: LOGOUT_FAILURE, 
        payload: {
          message: error.response.data.error, // Store the error message
        }, 
    });
  }
};

export const getUser = () => async (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });
  try {
    const response = await axiosInstance.post('/Get_user/');
    dispatch({
        type: GET_USER_SUCCESS, 
        payload: response.data 
    });
  } catch (error) {
    dispatch({ 
        type: GET_USER_FAILURE, 
        payload: {
          message: error.response.data.error, // Store the error message
        }, 
    });
  }
};