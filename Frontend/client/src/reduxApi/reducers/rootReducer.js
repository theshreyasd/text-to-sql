import { combineReducers } from 'redux';
import authReducer from './authReducer';
import sqlReducer from './sqlReducer'
const rootReducer = combineReducers({
  auth: authReducer,
  sql: sqlReducer
});

export default rootReducer;
