import axios from "axios";

/* INITIAL STATE *////////////////////////////

const initialState = {
    error: null,
    loading: false,
    meetups: []
  };
  
  /* ACTION TYPES */////////////////////////////
  
 
  const ADD_MEETUP_ERROR = "ADD_MEETUP_ERROR"
  const GET_MEETUPS = "GET_MEETUPS"
  const ADD_MEETUP_SUCCESS = "ADD_MEETUP_SUCCESS"
//   const GET_MESSAGE = "GET_MESSAGE"
  
  
 /* ACTION CREATORS *///////////////////////////

//  export const getMeetups = () => (dispatch) => {
//    axios.get(`${process.env.REACT_APP_ENDPOINT}/meetups`, {
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



export const addMeetup = (name, city, date, startTime, endTime, type, language, description, userId, participantId) => (dispatch) => {
    const config = {
      headers: {
      'Content-Type': "application/json;charset=UTF-8",
      'authorization': `Bearer ${localStorage.getItem('token')}`
      },
    };
    const data = {
      name: name,
      city:  `/wdev_nicole/eindwerk/api/cities/${city}`,
      date: date,
      startTime: startTime,
      endTime: endTime,
      type: type,
      language:  `/wdev_nicole/eindwerk/api/languages/${language}`,
      description: description,
      creator: `/wdev_nicole/eindwerk/api/users/${userId}`,
      participant: `/wdev_nicole/eindwerk/api/users/${participantId}`
    }
    axios.post(`${process.env.REACT_APP_ENDPOINT}/meetups`, data, config)
    .then((response) => {
    //   dispatch(addMeetupSuccess(response.data))
      console.log('addmeetupsuccess')
    })
    .catch((error) => console.log('addmeetuperror:' + error));
};

//  export const getMessages = (id) => (dispatch) => {
//     axios.get(`${process.env.REACT_APP_ENDPOINT}/messages?messageRecipient=${id}`, {
//      headers: {
//        authorization: `Bearer ${localStorage.getItem('token')}`
//      }
//     })
//     .then((response) => {
//     //   console.log(response)
//      dispatch(addMessages(response.data['hydra:member']))
//      console.log('get messages fetch successful' + response.data['hydra:member'])
//    })
//    .catch((error) => console.log(error));
 
//   }  

export const addMeetupSuccess = (data) => ({
    type: ADD_MEETUP_SUCCESS,
    payload: data,
  })

 export const getMeetups = (data) => ({
   type: GET_MEETUPS,
   payload: data,
 })

 export const addMeetupError = (message) => ({
   type: ADD_MEETUP_ERROR,
   payload: message,
 })

/* REDUCER *////////////////////////////////////
  
  export default (state = initialState, { type, payload }) => {
    switch (type) {
      case GET_MEETUPS:
        // console.log(payload)
        return {
          error: null,
          meetups: [...payload],
          loading: false
        }
      case ADD_MEETUP_ERROR:
        return {
          ...state,
          error: payload
        }
      case ADD_MEETUP_SUCCESS:
        return {
        error: null,
        loading: false
        };
     
      default:
        return state;
    }
  };