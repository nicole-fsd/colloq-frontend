import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import Landing from './components/Landing'
import Layout from './components/layout/Layout'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/dashboard/Dashboard'
import Search from './components/Search'
import UserProfile from './components/UserProfile'


function App() {
  const Authenticated = useSelector((state) => state.auth.loggedIn);

  return (
    <>
       <Layout>
          <Route
            exact
            path="/"
            render={() => {
              return Authenticated ? <Redirect to="/dashboard" /> : <Landing />;
            }}
          />
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
              return !Authenticated ? (
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
          return Authenticated ? <Redirect to="/dashboard" /> : <Login />;
        }}
      />
        <Route
            exact
            path="/search"
            render={() => {
              return <Search />;
            }}
          />
          <Route
            path="/profile/:id">
              <UserProfile />
          </Route>
            
      </Layout>
    </> 
  );
}

export default App;
