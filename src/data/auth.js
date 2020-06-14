import axios from "axios";
// import jwt_decode from "jwt-decode";
import JWT from 'jsonwebtoken'



/* INITIAL STATE *////////////////////////////
export const initialState = {
  user: {
    id: 0,
    email: "",
    firstname: "",
    lastname: "",
    age: "",
    isTourist: "",
    isTutor: "",
    meetupType: "",
    publicMessage: "",
  },
  register: {
    error: false,
    loading: false,
  },
  login: {
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
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS"


/* ACTION CREATORS *//////////////////////////////////////

export const loginUser = (username, password) => (dispatch) => {
  // axios.post(`https://wdev.be/wdev_nicole/eindwerk/api/login_check`, {
    axios.post(`${process.env.REACT_APP_ENDPOINT}/login_check`, {
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

export const registerUser = (email, password, firstName, lastName, age, meetupType, startDate, endDate, nativeLang, targetLang, role) => (dispatch) => {
    const config = {
      headers: {
      'Content-Type': "application/json;charset=UTF-8"
      },
    };
    const data = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      age: age,
      meetupType: meetupType,
      startDate: startDate,
      endDate: endDate,
      nativeLang: nativeLang,
      targetLang: targetLang,
      role: role
    }
    axios.post(`${process.env.REACT_APP_ENDPOINT}/register`, data, config)
    .then((response) => {
      dispatch(registerSuccess(response.data))
      console.log(response.headers)
    })
    .catch((error) => console.log(error));
};

export const updateUser = (id, email, firstname, lastname, age, meetupType) => (dispatch) => {
  const config = {
    headers: {
    'Content-Type': "application/json;charset=UTF-8",
    'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
  };
  const data = {
    email: email,
    firstName: firstname,
    lastName: lastname,
    age: age,
    meetupType: meetupType,
    // startDate: startDate,
    // endDate: endDate,
    // nativeLang: nativeLang,
    // targetLang: targetLang,
    
  }
  axios.put(`${process.env.REACT_APP_ENDPOINT}/users/${id}`, data, config)
  .then((response) => {
    // dispatch(updateUserSuccess(response.data))
    console.log('update user success')
  })
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

export const updateUserSuccess = (data) => ({
  type: UPDATE_USER_SUCCESS,
  payload: data
});



/* REDUCER *//////////////////////////////////

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_SUCCESS:
      // const user = jwt_decode(payload);
      localStorage.setItem('token', payload)
      const decoded = JWT.decode(payload, { complete: true })
      // console.log(decoded)
      return {
        ...state,
        user: {
          ...state.auth,
          id: decoded.payload.id,
          email: decoded.payload.username,
          firstName: decoded.payload.firstName,
          lastName: decoded.payload.lastName,
          age: decoded.payload.age,
          meetupType: decoded.payload.meetupType,
          publicMessage: decoded.payload.publicMessage,
          isTourist: decoded.payload.isTourist,
          isTutor: decoded.payload.isTutor
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
        error: false,
        loading: false
      },
      loggedIn: true,
    };

    default:
      return state;
  }
};