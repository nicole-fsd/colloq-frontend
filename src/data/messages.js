import axios from "axios";

/* INITIAL STATE *////////////////////////////

const initialState = {
    error: null,
    loading: false,
    messages: [],
    singleMessage: {
        id: 0,
        subject: "",
        text: "",
        msgAuthor: "",
        msgRecipient: "",
        createdAt: ""
    },
    
  };
  
  /* ACTION TYPES */////////////////////////////
  
 
  const ADD_MESSAGES_ERROR = "ADD_MESSAGES_ERROR"
  const ADD_MESSAGES = "ADD_MESSAGES"
  const POST_MESSAGE_SUCCESS = "POST_MESSAGE_SUCCESS"
//   const GET_MESSAGE = "GET_MESSAGE"
  
  
 /* ACTION CREATORS *///////////////////////////

//  export const getMessage = (id) => (dispatch) => {
//    axios.get(`${process.env.REACT_APP_ENDPOINT}/messages?user=${id}`, {
//     headers: {
//       authorization: `Bearer ${localStorage.getItem('token')}`
//     }
//    })
//    .then((response) => {
//     //  console.log(result)
//     dispatch(addMessage(response.data['hydra:member']))
//     console.log('fetch successful' + response.data['hydra:member'])
//   })
//   .catch((error) => dispatch(addPhotoError('error fetching photo')));

//  }  

export const postUserMessage = (subject, text, userId, authUserId) => (dispatch) => {
    const config = {
      headers: {
      'Content-Type': "application/json;charset=UTF-8",
      'authorization': `Bearer ${localStorage.getItem('token')}`
      },
    };
    const data = {
      subject: subject,
      text: text,
      messageRecipient: `/wdev_nicole/eindwerk/api/users/${userId}`,
      messageAuthor: `/wdev_nicole/eindwerk/api/users/${authUserId}`,
      createdAt: parseInt(Date.now() / 1000)
    }
    axios.post(`${process.env.REACT_APP_ENDPOINT}/messages`, data, config)
    .then((response) => {
      dispatch(postMessageSuccess(response.data))
      console.log('postmessagesuccess')
    })
    .catch((error) => console.log(error));
};

//  export const getMessages = (id) => (dispatch) => {
//     axios.get(`${process.env.REACT_APP_ENDPOINT}/messages?user=${id}`, {
//      headers: {
//        authorization: `Bearer ${localStorage.getItem('token')}`
//      }
//     })
//     .then((response) => {
//      //  console.log(result)
//      dispatch(addMessages(response.data['hydra:member']))
//      console.log('get messages fetch successful' + response.data['hydra:member'])
//    })
//    .catch((error) => dispatch(addPhotoError('error fetching photo')));
 
//   }  

export const postMessageSuccess = (data) => ({
    type: POST_MESSAGE_SUCCESS,
    payload: data,
  })

 export const addMessages = (data) => ({
   type: ADD_MESSAGES,
   payload: data,
 })

 export const addMessagesError = (message) => ({
   type: ADD_MESSAGES_ERROR,
   payload: message,
 })

/* REDUCER *////////////////////////////////////
  
  export default (state = initialState, { type, payload }) => {
    switch (type) {
      case ADD_MESSAGES:
        // console.log(payload)
        return {
          error: null,
          messages: [...payload],
          loading: false
        }
      case ADD_MESSAGES_ERROR:
        return {
          ...state,
          error: payload
        }
      case POST_MESSAGE_SUCCESS:
        return {
        ...state,
        singleMessage: {
            error: false,
            loading: false
        },
        };
     
      default:
        return state;
    }
  };