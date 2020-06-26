import axios from "axios";

/* INITIAL STATE *////////////////////////////

const initialState = {
    error: null,
    loading: false,
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
    // axios.post(`http://localhost:8000/api/contact`, data, config)
    .then((response) => {
    //   dispatch(postCommentSuccess(response.data))
      console.log('post mail success' + response.data)
    })
    .catch((error) => console.log(error));
};

 

export const postMailSuccess = (data) => ({
    type: POST_MAIL_SUCCESS,
    payload: data,
  })

 export const postMailError = (message) => ({
   type: POST_MAIL_ERROR,
   payload: message,
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
            loading: false
        };
     
      default:
        return state;
    }
  };