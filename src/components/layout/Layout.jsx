import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
// import { makeStyles } from '@material-ui/core/styles';
// import theme from '../../theme'
import Nav from './Nav'




// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   logo: {
//     flexGrow: 1,
//     marginLeft: "10%",
//     color: "white"

//   },
//   title: {
//     flexGrow: 1,
//   },
//   appbar: {
//     backgroundColor: "#ff7043"
//   },
// }));

export default function Layout(props) {
  return (
    <Router>
        <Nav/>
        {props.children}
    </Router>
  );
};
