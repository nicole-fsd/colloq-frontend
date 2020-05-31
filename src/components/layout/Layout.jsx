import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Nav from './Nav'


export default function Layout(props) {
  return (
    <Router>
        <Nav/>
        {props.children}
    </Router>
  );
};
