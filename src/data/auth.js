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
  axios.post(`http://localhost:8000/api2/login_check`, {
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

export const registerUser = (email, password, firstName, lastName, age, city, meetupCity, meetupType, startDate, endDate, role) => (dispatch) => {
  axios.post(`http://localhost:8000/api2/register`, {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      age: age,
      city: city,
      meetupCity: meetupCity,
      meetupType: meetupType,
      startDate: startDate,
      endDate: endDate,
      role: role,
    })
    .then((response) => dispatch(registerSuccess(response.data)))
    .catch((error) => console.log(error));
};

export const registerSuccess = () => ({
  type: REGISTER_SUCCESS,
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

    default:
      return state;
  }
};