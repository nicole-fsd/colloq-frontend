import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { getUser } from '../data/search';
import { makeStyles } from "@material-ui/core/styles";
import { Container , Paper, Grid, Typography, Button, TextField} from '@material-ui/core';
import Footer from './landing/Footer'
import Avatar from '@material-ui/core/Avatar';
import morgan from './dashboard/images/Morgan-cat.jpg'


//STYLE
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
    },
    infoDiv: {
      padding: '2rem'
    },
    name: {
      fontSize: '2rem',

    },
    subDiv: {
      marginTop: '2rem'
    },
    subInfo: {
      fontSize: '1.25rem',
      lineHeight: '2.5rem'
    },
    msgBtn: {
      margin: '1rem'
    },
    backLink: {
      textDecoration: 'none',
      fontSize: '1rem',
      marginTop: '20px'
    }
}));

//COMPONENT
const UserProfile = () => {
const dispatch = useDispatch();
let location = useLocation()
const classes = useStyles()
const [name, setName] = useState('');
// const userFirstName = useSelector((state) => state.auth.user.firstName);
// const userAge = useSelector((state) => state.auth.user.age);
// const userMeetupType = useSelector((state) => state.auth.user.meetupType);
// const userPublicMessage = useSelector((state) => state.auth.user.publicMessage);
const str = location.pathname

//HANDLERS
  //   const handleChange = (event) => {
  //   setName(event.target.value);
  // };

  const handleSendMessageClick = () => {
    // dispatch(getPhoto());
  }


//get user id
var n = str.lastIndexOf('/');
var id = str.substring(n + 1);
// console.log('userprofile result:' + id)


useEffect(() => {
    dispatch(getUser(id));
  }, [dispatch, id])

  const user = useSelector((state) => state.search.singleUser);
  

  return (
    <>
      <div className={classes.root}>
      
        <Container className={classes.container}>
        <Link className={classes.backLink} to='/search'>Back to search</Link>
      <Grid className={classes.grid1} justify="space-evenly" container spacing={4}>
        
        <Grid item>
        
          <Paper className={classes.photo} elevation={3}>
              <Avatar alt="user profile photo" src={morgan} className={classes.large} />
              </Paper>
              <Button  className={classes.msgBtn} variant="contained" color="secondary" component="span" onClick={handleSendMessageClick}>
                Send message
                </Button>  
        </Grid>
        <Grid item>
  <Paper className={classes.paperAbout} elevation={3}><Typography className={classes.typeAbout}>{user.publicMessage}</Typography></Paper>
        </Grid>
      </Grid>
      <Grid className={classes.grid2} justify="center" alignItems="center" container direction="row" spacing={0}>
          <Grid className={classes.gridBottomLeft}>
            <Grid item xs>
            <Paper className={classes.paperInfo} elevation={3}>
              <div className={classes.infoDiv}>
              <Typography className={classes.name}>{user.firstname} {user.lastname}</Typography>
              <div className={classes.subDiv}>
                <Typography className={classes.subInfo}>Age: {user.age}</Typography>
                <Typography className={classes.subInfo}>Language: </Typography>
                <Typography className={classes.subInfo}>City: {user.city}</Typography>
                <Typography className={classes.subInfo}>Meetup type: {user.meetupType}</Typography>
              </div>
              
              </div>
              
            
            </Paper>
            </Grid>
          </Grid>
            <Grid className={classes.gridBottomRight}>
            <Grid item xs>
            <Paper className={classes.paper} elevation={3}>COMMENT</Paper>
            </Grid>
            <Grid item xs={6}>
            <Paper className={classes.paper} elevation={3}>COMMENT</Paper>
            </Grid>
            <Grid item xs>
            <Paper className={classes.paper} elevation={3}>COMMENT</Paper>
            </Grid>
          </Grid>
        
      </Grid>
      </Container>
      <Footer />
    </div>
      
      
    </>
  )
}

export default UserProfile;
