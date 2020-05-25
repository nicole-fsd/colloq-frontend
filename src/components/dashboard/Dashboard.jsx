import React from "react";
import { Redirect, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Container , Paper, Grid, Typography} from '@material-ui/core';
import Footer from '../layout/Footer'

const useStyles = makeStyles(theme => ({
    root: {
        justifySelf: "center",
        textAlign: "center"
      },
      paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
    // root: {
    //   padding: "250px",
    //   // border: "solid 1px black",
    //   minHeight: "850px",
    //   // backgroundImage: `url(${Background})`,
    //   color: "#424242"
    // },
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
    paper: {
        backgroundColor: "#c6a3ff",
        height: "150px",
        width: "400px",
        margin: "30px"
    },
    paperInfo: {
        backgroundColor: "#c6a3ff",
        height: "600px",
        width: "400px"
    },
    paperAbout: {
        backgroundColor: "#c6a3ff",
        height: "175px",
        width: "450px",
        marginLeft: "30px"
    },
    typeAbout: {
        padding: "20px",
        color: "white"
    },
    photo: {
        backgroundColor: "#c6a3ff",
        height: "200px",
        width: "200px",
        borderRadius: "50%"
    }
  }));

export default function Dashboard() {
    const classes = useStyles()

  return (
    // <Container className={classes.container}>
    //     <Grid container direction="column">
        
    //         <Grid className={classes.photo} item>
    //             <Typography>PHOTO HERE</Typography>
    //         </Grid> 
    //         <Grid item>
    //         <Paper className={classes.paper} elevation={3} />
    //         </Grid>
    //         <Grid item>
    //         <Paper className={classes.paper} elevation={3} />
    //         </Grid>
    //         <Grid item>
    //         <Paper className={classes.paper} elevation={3} />
    //         </Grid>
        
        
    //     </Grid>
        
    // </Container>
    <div className={classes.root}>
        <Container className={classes.container}>
      <Grid className={classes.grid1} justify="space-evenly" container spacing={4}>
        <Grid item s>
          <Paper className={classes.photo} elevation={3}></Paper>
        </Grid>
        <Grid item s>
          <Paper className={classes.paperAbout} elevation={3}><Typography className={classes.typeAbout}>Hello how are you doing I am a great person who likes to travel wide and far and it would be grand to make acwuantance.</Typography></Paper>
        </Grid>
      </Grid>
      <Grid className={classes.grid2} justify="center" alignItems="center" container direction="row" spacing={0}>
          <Grid className={classes.gridBottomLeft}>
            <Grid item xs>
            <Paper className={classes.paperInfo} elevation={3}>INFO</Paper>
            </Grid>
          </Grid>
            <Grid className={classes.gridBottomRight}>
            <Grid item xs>
            <Paper className={classes.paper} elevation={3}>COMMENTS</Paper>
            </Grid>
            <Grid item xs={6}>
            <Paper className={classes.paper} elevation={3}>MESSAGES</Paper>
            </Grid>
            <Grid item xs>
            <Paper className={classes.paper} elevation={3}>xs</Paper>
            </Grid>
          </Grid>
        
      </Grid>
      </Container>
    </div>
  );
};