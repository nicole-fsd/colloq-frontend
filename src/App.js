import React from "react";
// import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Landing from './components/Landing'
import Layout from './components/layout/Layout'
import Login from './components/Login'
import Register from './components/Register'


function App() {
  // const themeData = useSelector((state) => state.theme);
  // const user = useSelector((state) => state.user.loggedIn);
  // const theme = createMuiTheme(themeData);
  // const loggedIn = user;

  return (
    <>
       <Layout>
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return <Landing />;
            }}
          />
          <Route
            exact
            path="/login"
            render={() => {
              return <Login />;
            }}
          />
          <Route
            exact
            path="/register"
            render={() => {
              return <Register />;
            }}
          />
        </Switch>
      </Layout>
    </> 
  );
}

export default App;
