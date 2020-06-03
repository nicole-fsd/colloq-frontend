import axios from "axios";

/* INITIAL STATE *////////////////////////////

const initialState = {
    error: null,
    users: [],
    loading: false,
  };
  
  /* ACTION TYPES */////////////////////////////
  
  const GET_USERS = "GET_USERS"
  const GET_USERS_ERROR = "GET_USERS_ERROR"
 
  
 /* ACTION CREATORS *///////////////////////////

 export const getUsers = () => (dispatch) => {
   axios.get('http://localhost:8000/swagger-api/users?isTutor=true')
   .then((result) => {
    //  console.log(result)
    // dispatch(addUsers(result.data))
    dispatch(addUsers(result.data['hydra:member']))
  })
  .catch((error) => dispatch(addUsersError('error fetching users')));

 }  

 export const addUsers = (data) => ({
   type: GET_USERS,
   payload: data,
 })

 export const addUsersError = (message) => ({
   type: GET_USERS_ERROR,
   payload: message,
 })

/* REDUCER *////////////////////////////////////
  
  export default (state = initialState, { type, payload }) => {
    switch (type) {
      case GET_USERS:
        // console.log(payload)
        return {
          error: null,
          users: [...payload],
          loading: false
        }
      case GET_USERS_ERROR:
        return {
          ...state,
          error: payload
        }
     
      default:
        return state;
    }
  };