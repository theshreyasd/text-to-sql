import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE, 
  REGISTER_REQUEST, 
  REGISTER_SUCCESS, 
  REGISTER_FAILURE} from '../../types'

const initialState = {
    isAuthenticated: false,
    user: {},
    loading: false,
    error: null,
  };
  
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case LOGIN_REQUEST:
      return { 
        ...state, 
        loading: true };
    
    case LOGIN_SUCCESS:
      return { 
        ...state, 
        isAuthenticated: true, 
        user: action.payload, 
        loading: false };
    
    case LOGIN_FAILURE:
      return { 
        ...state, 
        error: {
          message: action.payload.message, // Store message only
          status: action.payload.status, // Store status code only
        }, 
        loading: false };

    case REGISTER_REQUEST:
      return { 
        ...state, 
        loading: true };
    
    case REGISTER_SUCCESS:
      return { 
        ...state, 
        isAuthenticated: true, 
        user: action.payload, 
        loading: false };
    
    case REGISTER_FAILURE:
      return { 
        ...state, 
        error: {
          message: action.payload.message, // Store message only
          status: action.payload.status, // Store status code only
        },
        loading: false };
    
    default:
      return state;
  }
};

export default authReducer;
