import axios from "axios";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
/* INITIAL STATE */
export const initialState = {
  user: {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
  },
  login: {
    error: {
      bool: false,
      msg: "",
    },
    loading: false,
  },
  register: {
    error: {
      bool: false,
      msg: "",
    },
    loading: false,
  },
  loggedIn: false,
};

/* ACTION TYPES */
export const USER_START_LOGIN = "USER_START_LOGIN";
export const USER_SUCCESS_LOGIN = "USER_SUCCESS_LOGIN";
export const USER_ERROR_LOGIN = "USER_ERROR_LOGIN";

export const USER_START_REGISTER = "USER_START_REGISTER";
export const USER_SUCCESS_REGISTER = "USER_SUCCESS_REGISTER";
export const USER_ERROR_REGISTER = "USER_SUCCESS_REGISTER";

export const USER_LOGOUT = "USER_LOGOUT";

/* ACTION CREATORS */
export const loginUser = (username, password) => (dispatch) => {
  dispatch(startLogin());
  axios
    .post(`http://localhost:8000/api2/login_check`, {
      username: username,
      password: password,
    })
    .then((response) => dispatch(successLogin(response.data.token)))
    .catch((error) => console.log(error));
};

export const startLogin = () => ({
  type: USER_START_LOGIN,
});

export const successLogin = (data) => ({
  type: USER_SUCCESS_LOGIN,
  payload: data,
});

export const errorLogin = (message) => ({
  type: USER_ERROR_LOGIN,
  payload: message,
});

export const registerUser = (fn, ln, email, password) => (dispatch) => {
  dispatch(startRegister());
  axios
    .post(`${process.env.REACT_APP_API}/register`, {
      _username: email,
      _password: password,
      firstName: fn,
      lastName: ln,
    })
    .then((response) => dispatch(succesRegister(response.data)))
    .catch((error) => dispatch(errorRegister("FIX THIS ERROR")));
};

export const startRegister = () => ({
  type: USER_START_REGISTER,
});

export const succesRegister = (data) => ({
  type: USER_SUCCESS_REGISTER,
  payload: data,
});

export const errorRegister = (message) => ({
  type: USER_ERROR_REGISTER,
  payload: message,
});

/* REDUCER */
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_START_LOGIN:
      return {
        ...state,
        login: {
          ...state.login,
          loading: true,
        },
      };
    case USER_SUCCESS_LOGIN:
      const user = jwt_decode(payload);
      Cookies.set("jwt", payload);
      return {
        ...state,
        user: {
          firstName: user.first_name,
          lastName: user.last_name,
          id: user.id,
          email: user.email,
        },
        login: {
          ...state.login,
          loading: false,
        },
        loggedIn: true,
      };
    case USER_ERROR_LOGIN:
      const msg =
        payload === "Invalid credentials."
          ? "Username and password don't match"
          : "Something went wrong, try again later";
      return {
        ...state,
        login: {
          error: {
            bool: true,
            msg: msg,
          },
          loading: false,
        },
      };

    case USER_START_REGISTER:
      return {
        ...state,
        register: {
          ...state.register,
          loading: true,
        },
      };

    case USER_SUCCESS_REGISTER:
      return {
        ...state,
        register: {
          ...state.register,
          loading: false,
        },
      };

    case USER_ERROR_REGISTER:
      return {
        ...state,
        register: {
          error: {
            bool: true,
            msg: payload,
          },
          loading: false,
        },
      };

    default:
      return state;
  }
};
