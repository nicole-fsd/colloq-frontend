import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistCombineReducers } from "redux-persist";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import authReducer from "./auth";
import photoReducer from "./photos";
import searchReducer from "./search"
import messageReducer from "./messages"
import meetupReducer from "./meetups"
import commentReducer from "./comments"
import contactReducer from "./contact"

const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: [''],
  whitelist: ['auth', 'photos', 'search', 'messages', 'meetups', 'comments', 'contact']
};

const appReducer = persistCombineReducers(persistConfig, {
  auth: authReducer,
  photos: photoReducer, 
  search: searchReducer,
  messages: messageReducer,
  meetups: meetupReducer,
  comments: commentReducer,
  contact: contactReducer
  
});


const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
      // for all keys defined in your persistConfig(s)
      storage.removeItem('persist:root')

      state = undefined;
  }
  return appReducer(state, action);
};


export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
export const persistor = persistStore(store);