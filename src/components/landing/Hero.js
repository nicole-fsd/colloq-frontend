import React from 'react';
import { Typography, Container } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import IconButton from '@material-ui/core/IconButton';



const useStyles = makeStyles(theme => ({
  root: {
    padding: "8rem",
    // border: "solid 1px black",
    [theme.breakpoints.up('md')]: {
      padding: "15rem",
    }, 
    minHeight: "100vh",
    // backgroundImage: `url(${Background})`,
    color: "#424242",
  },
  text: {
    color: "secondary",
    fontSize: '2.8rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '3rem',
    },
  [theme.breakpoints.up('md')]: {
    fontSize: '3.8rem',
  }, 
  },
  link: {
    textDecoration: 'none',
    color: '#424242',
    fontSize: "32px",
    marginLeft: "15px"
  },
  arrow: {
    fontSize: 'large'
  }
}));

  export default function Hero() {
    const classes = useStyles();
   
   
    return (
      <Container disableGutters maxWidth="xl">
        <div className={classes.root}>
          <Typography variant="h2" gutterBottom className={classes.text}>
            Where will a new language take you?
          </Typography>
          <Link className={classes.link} to="/login">Find out 
            <IconButton color="primary" aria-label="upload picture" component="span">
              <ArrowForwardIosIcon fontSize="large" />
            </IconButton>
          </Link>
        </div>
      </Container>
    );
  }