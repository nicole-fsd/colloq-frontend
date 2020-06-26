import axios from "axios";

/* INITIAL STATE *////////////////////////////

const initialState = {
    error: null,
    loading: false,
    successMessage: "",
    mail: {
        name: "",
        email: "",
        message: ""
    }
  };
  
  /* ACTION TYPES */////////////////////////////
  
 
  const POST_MAIL_ERROR = "POST_MAIL_ERROR"
  const POST_MAIL_SUCCESS = "POST_MAIL_SUCCESS"
  
  
  
 /* ACTION CREATORS */////////////////////////// 

export const postMail = (name, email, message) => (dispatch) => {
    const config = {
      headers: {
      'authorization': `Bearer ${localStorage.getItem('token')}`
      },
    };
    const data = {
      name: name,
      email: email,
      message: message
    }
    axios.post(`https://wdev.be/wdev_nicole/eindwerk/api/contact`, data, config)
    .then((response) => {
    //   dispatch(postCommentSuccess(response.data))
      console.log('post mail success' + response.data)
      dispatch(postMailSuccess("Your mail has been sent!"))
    })
    .catch((error) => console.log(error));
};

 

export const postMailSuccess = (msg) => ({
    type: POST_MAIL_SUCCESS,
    payload: msg,
  })

 export const postMailError = (msg) => ({
   type: POST_MAIL_ERROR,
   payload: msg,
 })

/* REDUCER *////////////////////////////////////
  
  export default (state = initialState, { type, payload }) => {
    switch (type) {
      case POST_MAIL_ERROR:
        return {
          ...state,
          error: payload,
          loading: false
        }
      case POST_MAIL_SUCCESS:
        return {
            ...state,
            error: null,
            loading: false,
            successMessage: payload
        };
     
      default:
        return state;
    }
  };