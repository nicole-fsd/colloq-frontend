import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import Landing from './components/Landing'
import Layout from './components/layout/Layout'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/dashboard/Dashboard'
import Cookie from "js-cookie";




function App() {
  // const themeData = useSelector((state) => state.theme);
  // const user = useSelector((state) => state.user.loggedIn);
  // const theme = createMuiTheme(themeData);
  // const loggedIn = user;

  // check if user is logged in
const loggedIn = Cookie.get("JWT") === undefined ? false : true;

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
          {/* <Route
            exact
            path="/login"
            render={() => {
              return <Login />;
            }}
          /> */}
          <Route
            exact
            path="/register"
            render={() => {
              return <Register />;
            }}
          />
          <Route
            exact
            path="/dashboard"
            render={() => {
              return <Dashboard />;
            }}
          />
          <Route
          exact
          path="/login"
          render={() => {
          return loggedIn ? <Redirect to="/dashboard" /> : <Login />;
        }}
      />
        </Switch>
      </Layout>
    </> 
  );
}

export default App;
