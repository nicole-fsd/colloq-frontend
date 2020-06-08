import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { getUser } from '../data/search';
import { makeStyles } from "@material-ui/core/styles";
import { Container , Paper, Grid, Typography, Button, TextField, IconButton, FormHelperText} from '@material-ui/core';
import Footer from './landing/Footer'
import Avatar from '@material-ui/core/Avatar';
import morgan from './dashboard/images/Morgan-cat.jpg'
import getPhoto from '../data/photos'
import { postUserMessage } from '../data/messages';
import Modal from '@material-ui/core/Modal';
import CloseIcon from '@material-ui/icons/Close';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

//STYLE
const useStyles = makeStyles(theme => ({
  root: {
      justifySelf: "center",
      textAlign: "center"
    },
    paperModal: {
      position: 'absolute',
      width: 500,
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #c6a3ff',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      backgroundColor: "#eeeeee",
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
      backgroundColor: "#eeeeee",
      height: "600px",
      width: "400px"
  },
  paperAbout: {
      backgroundColor: "#eeeeee",
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
    },
    close: {
      display: 'inline'
    },
    sendDiv: {
      display: 'flex',
      flexDirection: "row",
      justifyContent: "space-between"

    },
    textarea: {
      width: '100%'
    }
}));

//COMPONENT
const UserProfile = () => {
const dispatch = useDispatch();
let location = useLocation()
const classes = useStyles()
const [name, setName] = useState('');
const [subject, setSubject] = useState('');
const [text, setText] = useState('');
const photos = useSelector((state) => state.photos.photos);
// const userFirstName = useSelector((state) => state.auth.user.firstName);
// const userAge = useSelector((state) => state.auth.user.age);
// const userMeetupType = useSelector((state) => state.auth.user.meetupType);
// const userPublicMessage = useSelector((state) => state.auth.user.publicMessage);
const str = location.pathname
const user = useSelector((state) => state.search.singleUser);
const userId = useSelector((state) => state.search.singleUser.id);
const authUserId = useSelector((state) => state.auth.user.id);
const [modalStyle] = React.useState(getModalStyle);
const [open, setOpen] = React.useState(false);

//HANDLERS
  //   const handleChange = (event) => {
  //   setName(event.target.value);
  // };

  // MODAL //////////////////
  // const handleOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSendMessageClick = () => {
    setOpen(true);
  }

  const handleMessageFormSubmit = (e) => {
    e.preventDefault()
    console.log('form submit')
    dispatch(postUserMessage(subject, text, userId, authUserId))
  }

  const body = (
    <div style={modalStyle} className={classes.paperModal}>
      <div className={classes.sendDiv}>
      <h2 id="simple-modal-title">Send Message</h2>
      <IconButton aria-label="delete" className={classes.close} size="small" onClick={handleClose}>
          <CloseIcon fontSize="inherit" />
        </IconButton>
      </div>
      
      <form method="POST" onSubmit={handleMessageFormSubmit}>
      <TextField variant="standard" margin="normal" required fullWidth id="subject" label="Subject" name="subject" value={subject}
        onChange={(e) => {
          setSubject(e.target.value);
        }}
      />
      {/* <TextField variant="standard" margin="normal" required fullWidth id="text" label="Message" name="text" value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      /> */}
      <TextareaAutosize className={classes.textarea} aria-label="message textarea" required fullWidth rowsMin={8} placeholder="Write a message..." id="text" label="Message" name="text" value={text}
        onChange={(e) => {
          setText(e.target.value);
        }} />
      <Button type="submit" className={classes.submitmsgBtn} variant="contained" color="secondary">
        Send
      </Button>
      </form>
    </div>
  );

  


//get user id
var n = str.lastIndexOf('/');
var id = str.substring(n + 1);
// console.log('userprofile result:' + id)


useEffect(() => {
    dispatch(getUser(id));
    // dispatch(getPhoto(id));
  }, [dispatch, id])

  
 
  

  return (
    <>
      <div className={classes.root}>
      
        <Container className={classes.container}>
        <Link className={classes.backLink} to='/search'>Back to search</Link>
      <Grid className={classes.grid1} justify="space-evenly" container spacing={4}>
        
        <Grid item>
        
          <Paper className={classes.photo} elevation={3}>
          {/* <Avatar alt="user profile photo" src={`https://wdev.be/wdev_nicole/eindwerk/image.php?${photos[0].title}.jpg&height=150&image=/wdev_nicole/eindwerk/images/${photos[0].title}.jpg`} className={classes.large} /> */}
              {/* <img src={`http://localhost:8000/image.php?${photos.image}&height=150&image=/wdev_nicole/eindwerk/system/img/albums/${photos.image}`} />) */}
              </Paper>
                <Button  className={classes.msgBtn} variant="contained" color="secondary" component="span" onClick={handleSendMessageClick}>
                  Send message
                </Button>  
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                >
                  {body}
                </Modal>

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
                <Typography className={classes.subInfo}>Language:</Typography>
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
