import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistCombineReducers } from "redux-persist";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import authReducer from "./auth";
import photoReducer from "./photos";
import searchReducer from "./search"

const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: [''],
  whitelist: ['auth', 'photos', 'search']
};

const rootReducer = {
  auth: authReducer,
  photos: photoReducer, 
  search: searchReducer,
  
};

const pReducer = persistCombineReducers(persistConfig, rootReducer);


export const store = createStore(pReducer, composeWithDevTools(applyMiddleware(thunk)));
export const persistor = persistStore(store);