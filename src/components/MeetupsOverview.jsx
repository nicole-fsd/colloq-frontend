import React, {useState} from "react";
// import { Redirect, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Container , Paper, Grid, Typography, Button, TextField} from '@material-ui/core';
import Footer from './landing/Footer'
import Avatar from '@material-ui/core/Avatar';
import morgan from './dashboard/images/Morgan-cat.jpg'
import { useDispatch, useSelector } from "react-redux";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import '../style/react-big-calendar.css'
import { Link } from 'react-router-dom'




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
      backLink: {
        textDecoration: 'none',
        fontSize: '1rem',
        marginTop: '20px'
      },
      backDiv: {
          margin: '100px',
      }
    
  }));

export default function Dashboard() {
    const classes = useStyles()
    const dispatch = useDispatch();
    const localizer = momentLocalizer(moment);

    const events = [
        {
            start: moment().toDate(),
            end: moment()
            .add(1, "days")
            .toDate(),
            title: "Meetup in Paris"
          }
        ]
   
    
  

  return (
    <div className={classes.root}>
        <Container className={classes.container}>

            <Grid className={classes.grid1} justify="space-evenly" container spacing={4}>
                <Grid item>
                </Grid>
            </Grid>

            <Grid className={classes.grid2} justify="center" alignItems="center" container direction="column" spacing={0}>
                <div className={classes.backDiv}>
                    <Link className={classes.backLink} to='/dashboard'>Back to my profile</Link>
                </div>
                
                    <Grid item xs>
                    <Calendar
                        localizer={localizer}
                        defaultDate={new Date()}
                        defaultView="month"
                        events={events}
                        style={{ height: "50vh", width: "50vw" }}
                        />
                    </Grid>
                </Grid>
            

      </Container>
      <Footer />
    </div>
  );
};