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
    },
    large: {
        width: theme.spacing(25),
        height: theme.spacing(25),
      },
    input: {
        display: 'none',
      },
    form: {
          paddingTop: "50px",
        '& .MuiTextField-root': {
              margin: theme.spacing(1),
              width: '34ch',
            },
      }
  }));

export default function Dashboard() {
    const classes = useStyles()
    const [name, setName] = useState('');
    const dispatch = useDispatch();
    const userFirstName = useSelector((state) => state.auth.user.firstName);
    const userAge = useSelector((state) => state.auth.user.age);
    const userMeetupType = useSelector((state) => state.auth.user.meetupType);
    const userPublicMessage = useSelector((state) => state.auth.user.publicMessage);

    const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleGetPhotoClick = () => {
    dispatch(getPhoto());
  }

  return (
    <div className={classes.root}>
        <Container className={classes.container}>
      <Grid className={classes.grid1} justify="space-evenly" container spacing={4}>
        <Grid item>
          <Paper className={classes.photo} elevation={3}>
              <Avatar alt="user profile photo" src={morgan} className={classes.large} />
              </Paper>
              <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
                />
                <label htmlFor="contained-button-file">
                <Button variant="contained" color="secondary" component="span">
                Upload
                </Button>
                
                </label>
                <Button variant="contained" color="secondary" component="span" onClick={handleGetPhotoClick}>
                Get photo
                </Button>
                <div></div>
              
        </Grid>
        <Grid item>
  <Paper className={classes.paperAbout} elevation={3}><Typography className={classes.typeAbout}>{userPublicMessage}</Typography></Paper>
        </Grid>
      </Grid>
      <Grid className={classes.grid2} justify="center" alignItems="center" container direction="row" spacing={0}>
          <Grid className={classes.gridBottomLeft}>
            <Grid item xs>
            <Paper className={classes.paperInfo} elevation={3}>
            <form className={classes.form} noValidate autoComplete="off">
                <div>
                    <TextField 
                    id="standard-name" 
                    label="Name" 
                    value={userFirstName} 
                    onChange={handleChange} 
                    />
                </div>
                <div>
                    <TextField
                    id="filled-name"
                    label="Age"
                    value={userAge}
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <TextField
                    id="outlined-name"
                    label="Meetup Type"
                    value={userMeetupType}
                    onChange={handleChange}
                    />
                </div>
                </form>
            </Paper>
            </Grid>
          </Grid>
            <Grid className={classes.gridBottomRight}>
            <Grid item xs>
            <Paper className={classes.paper} elevation={3}>MEETUPS</Paper>
            </Grid>
            <Grid item xs={6}>
            <Paper className={classes.paper} elevation={3}>MESSAGES</Paper>
            </Grid>
            <Grid item xs>
            <Paper className={classes.paper} elevation={3}>FAVORITES</Paper>
            </Grid>
          </Grid>
        
      </Grid>
      </Container>
      <Footer />
    </div>
  );
};