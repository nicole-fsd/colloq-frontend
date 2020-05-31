import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import userReducer from "./auth";

const persistConfig = {
  key: 'user',
  storage,
}

const persistedUser = persistReducer(persistConfig, userReducer);

export const store = createStore(
  combineReducers({
    user: persistedUser,
  }), composeWithDevTools(applyMiddleware(thunk)));

  
export const persistor = persistStore(store);
