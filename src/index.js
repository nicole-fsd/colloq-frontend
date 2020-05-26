import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/es/integration/react";
import { store, persistor } from "./data/index";
import { CircularProgress } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from './theme'
import { ThemeProvider } from "@material-ui/core";
// import {history} from './helpers/history'

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate
        loading={<CircularProgress color="secondary" size="1.8em" />}
        persistor={persistor}
      >
        
        <React.StrictMode>
        <ThemeProvider theme={theme}>
        <CssBaseline />
          <App />
          </ThemeProvider>
        </React.StrictMode>
      </PersistGate>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
