import axios from "axios";

/* INITIAL STATE *////////////////////////////

const initialState = {
    error: null,
    photos: [],
    loading: false,
  };
  
  /* ACTION TYPES */////////////////////////////
  
  // const GET_PHOTOS = "GET_PHOTOS"
  const GET_PHOTO_ERROR = "GET_PHOTO_ERROR"
  const ADD_PHOTO = "ADD_PHOTO"
  
 /* ACTION CREATORS *///////////////////////////

 export const getPhoto = () => (dispatch) => {
   axios.get('http://localhost:8000/swagger-api/images/1')
   .then((result) => {
    //  console.log(result)
    dispatch(addPhoto(result))
    console.log('fetch successful')
  })
  .catch((error) => dispatch(addPhotoError('error fetching photo')));

 }  

 export const addPhoto = (data) => ({
   type: ADD_PHOTO,
   payload: data,
 })

 export const addPhotoError = (message) => ({
   type: GET_PHOTO_ERROR,
   payload: message,
 })

/* REDUCER *////////////////////////////////////
  
  export default (state = initialState, { type, payload }) => {
    switch (type) {
      case ADD_PHOTO:
        // console.log(payload)
        return {
          error: null,
          photos: [...payload],
          loading: false
        }
      case GET_PHOTO_ERROR:
        return {
          ...state,
          error: payload
        }
     
      default:
        return state;
    }
  };