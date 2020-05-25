import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import Landing from './components/Landing'
import Layout from './components/layout/Layout'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/dashboard/Dashboard'
import Search from './components/Search'
import Cookie from "js-cookie";




function App() {
  // const themeData = useSelector((state) => state.theme);
  const user = useSelector((state) => state.user.loggedIn);
  // const theme = createMuiTheme(themeData);
  const loggedIn = user;


  return (
    <>
       <Layout>
          <Route
            exact
            path="/"
            render={() => {
              return loggedIn ? <Redirect to="/dashboard" /> : <Landing />;
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
            path="/dashboard"
            render={() => {
              return !loggedIn ? (
              <Redirect to="/" /> 
              ): ( 
              <Dashboard />
              );
            }}
          />
          <Route
          exact
          path="/login"
          render={() => {
          return loggedIn ? <Redirect to="/dashboard" /> : <Login />;
        }}
      />
        <Route
            exact
            path="/search"
            render={() => {
              return <Search />;
            }}
          />
      </Layout>
    </> 
  );
}

export default App;
