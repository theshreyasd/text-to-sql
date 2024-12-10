import {
    SQL_FAILURE, 
    SQL_SUCCESS, 
    SQL_REQUEST, 
    CLEAR_SQL_STATE, 
    ADD_QUERY_FAILURE, 
    ADD_QUERY__SUCCESS, 
    ADD_QUERY_REQUEST} from '../../types'
  
  const initialState = {
      sqlContent : null,
      generatedState : false,
      addQueryError: null, 
      error: null, 
      addQuerySuccess : null

    };
    
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      
      case SQL_REQUEST:
        return { 
          ...state, 
          };
      
      case SQL_SUCCESS:
        return { 
          ...state, 
          generatedState: true, 
          sqlContent: action.payload, 
          };
      
      case SQL_FAILURE:
        return { 
            generatedState: false,
          ...state, 
          error: {
            message: action.payload.message // Store message only
          }, 
          };

      case CLEAR_SQL_STATE:
        return {
          generatedState: false,
          sqlContent : null,
          addQuerySuccess : null
        }

      case ADD_QUERY_FAILURE:
        return{
          ...state, 
          addQueryError: {
            message: action.payload.message // Store message only
          }
        } 
      case ADD_QUERY__SUCCESS:
        return{
          ...state, 
          addQuerySuccess : action.payload
        }
      
      default:
        return state;
    }
  };
  
  export default authReducer;
  