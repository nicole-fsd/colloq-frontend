import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom'


  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    logo: {
      flexGrow: 1,
      marginLeft: "10%",
      color: "white",
      
    },
    link: {
      textDecoration: "none",
      color: "white"
    },
    title: {
      flexGrow: 1,
    },
    appbar: {
      backgroundColor: "#ff7043"
    },
  }));

export default function Nav() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
        <AppBar className={classes.appbar} position="static">
            <Toolbar className={classes.toolbar}>
            <Typography variant="h2" className={classes.logo}>
            <Link className={classes.link} to="/">Colloq </Link>
            </Typography>
            </Toolbar>
        </AppBar>
        </div>
  );
}





