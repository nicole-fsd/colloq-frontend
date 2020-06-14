import axios from "axios";

/* INITIAL STATE *////////////////////////////

const initialState = {
    error: null,
    loading: false,
    comments: [],
  };
  
  /* ACTION TYPES */////////////////////////////
  
 
  const POST_COMMENT_ERROR = "ADD_COMMENT_ERROR"
  const POST_COMMENT_SUCCESS = "POST_COMMENT_SUCCESS"
  const GET_COMMENTS = "GET_COMMENTS"
  
  
 /* ACTION CREATORS */////////////////////////// 

export const postComment = (text, userId, authUserId) => (dispatch) => {
    const config = {
      headers: {
      'Content-Type': "application/json;charset=UTF-8",
      'authorization': `Bearer ${localStorage.getItem('token')}`
      },
    };
    const data = {
      text: text,
      commentRecipient: `/wdev_nicole/eindwerk/api/users/${userId}`,
      commentAuthor: `/wdev_nicole/eindwerk/api/users/${authUserId}`,
      createdAt: parseInt(Date.now() / 1000)
    }
    axios.post(`${process.env.REACT_APP_ENDPOINT}/comments`, data, config)
    .then((response) => {
    //   dispatch(postCommentSuccess(response.data))
      console.log('postcommentsuccess')
    })
    .catch((error) => console.log(error));
};

 export const getComments = (id) => (dispatch) => {
    axios.get(`${process.env.REACT_APP_ENDPOINT}/comments?commentRecipient=%22%2Fwdev_nicole%2Feindwerk%2Fapi%2Fusers%2F${id}%22`, {
     headers: {
       authorization: `Bearer ${localStorage.getItem('token')}`
     }
    })
    .then((response) => {
    //   console.log(response)
     dispatch(getCommentsSuccess(response.data['hydra:member']))
     console.log('get comments fetch successful' + response.data['hydra:member'])
   })
   .catch((error) => console.log(error));
 
  }  

export const postCommentSuccess = (data) => ({
    type: POST_COMMENT_SUCCESS,
    payload: data,
  })

  export const getCommentsSuccess = (data) => ({
    type: GET_COMMENTS,
    payload: data,
  })

 export const postCommentError = (message) => ({
   type: POST_COMMENT_ERROR,
   payload: message,
 })

/* REDUCER *////////////////////////////////////
  
  export default (state = initialState, { type, payload }) => {
    switch (type) {
      case GET_COMMENTS:
        return {
          error: null,
          comments: [...payload],
          loading: false
        }
      case POST_COMMENT_ERROR:
        return {
          ...state,
          error: payload
        }
      case POST_COMMENT_SUCCESS:
        return {
            ...state,
            error: null,
            loading: false
        };
     
      default:
        return state;
    }
  };