import axios from "axios";

/* INITIAL STATE *////////////////////////////

const initialState = {
    error: null,
    users: [],
    singleUser: {
    id: 0,
    email: "",
    firstname: "",
    lastname: "",
    age: "",
    city: "",
    isTourist: "",
    istutor: "",
    meetupType: "",
    publicMessage: "",
    },
    loading: false,
  };
  
  /* ACTION TYPES */////////////////////////////
  
  const GET_USERS = "GET_USERS"
  const GET_USERS_ERROR = "GET_USERS_ERROR"
  const GET_SINGLE_USER = "GET_SINGLE_USER"
 
  
 /* ACTION CREATORS *///////////////////////////

 export const getUsers = (city) => (dispatch) => {
   console.log('city: ' + city)
   axios.get(`${process.env.REACT_APP_ENDPOINT}/users?city.name=${city}`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`
    }
   })
   .then((result) => {
    //  console.log(result)
    // dispatch(addUsers(result.data))
    // console.log(result.data['hydra:member'])
    dispatch(addUsers(result.data['hydra:member']))
  })
  .catch((error) => dispatch(addUsersError('error fetching users')));

 }  

 export const getUser = (id) => (dispatch) => {
  axios.get(`${process.env.REACT_APP_ENDPOINT}/users/${id}`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`
    }
   })
   .then((response) => {
    //  console.log(result)
    dispatch(addUser(response.data))
    // console.log('singleUser:')
    // console.log(response.data['email']);
    // console.log(response.status);
    // console.log(response.statusText);
    // console.log(response.headers);
    // console.log(response.config);
    // dispatch(addUser(result.data['hydra:member']))
    
  })
  .catch((error) => dispatch(addUsersError('error fetching users')));
 }

 export const addUsers = (data) => ({
   type: GET_USERS,
   payload: data,
 })

 export const addUser = (data) => ({
  type: GET_SINGLE_USER,
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
      case GET_SINGLE_USER:
        console.log('payload:' + payload.city.name)
        return {
          ...state,
          singleUser: {
            
            email: payload.email,
            firstname: payload.firstname,
            lastname: payload.lastname,
            age: payload.age,
            city: payload.city.name,
            isTourist: payload.isTourist,
            istutor: payload.isTutor,
            meetupType: payload.meetupType,
            publicMessage: payload.publicMessage,
            
          },
        }
     
      default:
        return state;
    }
  };