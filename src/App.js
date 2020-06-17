import React from "react";
import { Helmet } from 'react-helmet';
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import Landing from './components/Landing'
import Layout from './components/layout/Layout'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/dashboard/Dashboard'
import Search from './components/Search'
import UserProfile from './components/UserProfile'
import MeetupsOverview from './components/MeetupsOverview'
import MessagesOverview from './components/MessagesOverview'
// import Privacy from './components/landing/Privacy'


function App() {
  const Authenticated = useSelector((state) => state.auth.loggedIn);

  return (
    <>
       <Layout>
       <Helmet>
          <title>Colloq App</title>
          <meta name="Meet, learn, and explore" content="Plan your next trip" /> 
        </Helmet>
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
              return Authenticated ? <Redirect to="/dashboard" /> : <Register />;
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
              return !Authenticated ? <Redirect to="/" /> : <Search />;
            }}
          />
          <Route
            path="/profile/:id"
            render={() => {
              return !Authenticated ? <Redirect to="/" /> : <UserProfile />;
            }}
            />
              
          <Route
            exact
            path="/meetups"
            render={() => {
              return !Authenticated ? <Redirect to="/" /> : <MeetupsOverview />;
            }}
          />
          <Route
            exact
            path="/messages"
            render={() => {
              return <MessagesOverview />;
            }}
          />
          {/* <Route
            exact
            path="/privacy"
            render={() => {
              return <Privacy />;
            }}
          /> */}
            
      </Layout>
    </> 
  );
}

export default App;
