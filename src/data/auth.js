import axios from "axios";
import jwt_decode from "jwt-decode";
import JWT from 'jsonwebtoken'
// import { history } from '../helpers/history';

/* INITIAL STATE *////////////////////////////
export const initialState = {
  user: {
    id: 0,
    email: "",
    firstname: "",
    lastname: "",
  },
  login: {
    error: false,
    loading: false,
  },
  register: {
    error: false,
    loading: false,
  },
  loggedIn: false,
};

/* ACTION TYPES *//////////////////////////////

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGOUT = "LOGOUT";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_ERROR = "REGISTER_ERROR"


/* ACTION CREATORS *//////////////////////////////////////

export const loginUser = (username, password) => (dispatch) => {
  axios.post(`http://localhost:8000/api/login_check`, {
      username: username,
      password: password,
    })
    .then((response) => dispatch(loginSuccess(response.data.token)))
    .catch((error) => console.log(error));
};


export const loginSuccess = (data) => ({
  type: LOGIN_SUCCESS,
  payload: data,
});

export const loginError = (msg) => ({
  type: LOGIN_ERROR,
  payload: msg,
});


export const logoutUser = () => ({
  type: LOGOUT,
});

export const registerUser = (email, password, firstName, lastName, age, meetupType, startDate, endDate, role) => (dispatch) => {
  // axios.post(`http://localhost:8000/api/register`, {
    axios.post(`http://127.0.0.1:8000/swagger-api/users`, {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      age: age,
      meetupType: meetupType,
      startDate: startDate,
      endDate: endDate,
      role: role,
    },{
      headers : {
        'Content-Type': 'application/json; charset=UTF-8'
        }
    })
    .then((response) => dispatch(registerSuccess(response.data)))
    .catch((error) => console.log(error));
};

export const registerSuccess = (data) => ({
  type: REGISTER_SUCCESS,
  payload: data,
});

export const registerError = (msg) => ({
  type: REGISTER_ERROR,
  payload: msg
});



/* REDUCER *//////////////////////////////////

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_SUCCESS:
      const user = jwt_decode(payload);
      localStorage.setItem('token', payload)
      const decoded = JWT.decode(payload, { complete: true })
      console.log(decoded)
      return {
        ...state,
        user: {
          ...state.user,
          email: decoded.payload.username,
        },
        loggedIn: true,
      };
    
    case LOGOUT:
      localStorage.removeItem('token');
    return {
      ...state,
      loggedIn: false,
    };

    case REGISTER_SUCCESS:
    return {
      ...state,
      register: {
        ...state.register,
      },
    };

    default:
      return state;
  }
};