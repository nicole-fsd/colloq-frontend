import React, {useState} from "react";
// import { Redirect, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Container , Paper, Grid, Typography, Button, TextField} from '@material-ui/core';
import Footer from '../landing/Footer'
import Avatar from '@material-ui/core/Avatar';
import morgan from './images/Morgan-cat.jpg'
import { getPhoto } from "../../data/photos";
import { useDispatch, useSelector } from "react-redux";
// import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles(theme => ({
    root: {
        justifySelf: "center",
        textAlign: "center"
      },
      paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        backgroundColor: "#c6a3ff",
        height: "150px",
        width: "400px",
        margin: "30px"
      },
    container: {
        backgroundColor: "#E1E2E1",
        width: "100vw",
        minHeight: "100vh",
    },
    grid1: {
        // border: "1px solid black",
        paddingTop: "80px",
        alignItems: "center",
        marginLeft: "20px"
    
    },
    grid2: {
        // border: "1px solid blue",
        minHeight: "800px"
    },
    gridBottomLeft: {
        // border: "1px solid red"
    },
    gridBottomRight: {
        // border: "1px solid green"
        marginLeft: "90px"
    },
    paperInfo: {
        backgroundColor: "#c6a3ff",
        height: "600px",
        width: "400px"
    },
    photo: {
        backgroundColor: "#c6a3ff",
        height: "200px",
        width: "200px",
        borderRadius: "50%"
    },
    large: {
        width: theme.spacing(25),
        height: theme.spacing(25),
      },
    
  }));

export default function Dashboard() {
    const classes = useStyles()
    const dispatch = useDispatch();
    
  

  return (
    <div className={classes.root}>
        <Container className={classes.container}>

            <Grid className={classes.grid1} justify="space-evenly" container spacing={4}>
                <Grid item>
                    <Paper className={classes.photo} elevation={3}>
                        <Avatar alt="user profile photo" src={morgan} className={classes.large} />
                    </Paper> 
                </Grid>
            </Grid>

            <Grid className={classes.grid2} justify="center" alignItems="center" container direction="row" spacing={0}>
                <Grid className={classes.gridBottomLeft}>
                    <Grid item xs>
                    <Paper className={classes.paperInfo} elevation={3}>
                    </Paper>
                    </Grid>
                </Grid>
                <Grid className={classes.gridBottomRight}>
                    <Grid item xs>
                    <Paper className={classes.paper} elevation={3}>MEETUPS</Paper>
                    </Grid>
                </Grid>
            </Grid>

      </Container>
      <Footer />
    </div>
  );
};