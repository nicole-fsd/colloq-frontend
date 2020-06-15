import React, {useState, useEffect} from "react";
// import { Redirect, Route } from "react-router-dom";
import axios from 'axios'
import { makeStyles } from "@material-ui/core/styles";
import { Container , Paper, Grid, Typography, Button, TextField, IconButton} from '@material-ui/core';
import Footer from '../landing/Footer'
import Avatar from '@material-ui/core/Avatar';
import { getPhoto } from "../../data/photos";
import { updateUser } from "../../data/auth";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import EditIcon from '@material-ui/icons/Edit';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';


const useStyles = makeStyles(theme => ({
    root: {
        justifySelf: "center",
        textAlign: "center"
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
        minHeight: "600px",
        width: "400px",
        
    },
    paperAbout: {
        backgroundColor: "#eeeeee",
        minHeight: "10rem",
        width: "450px",
        marginLeft: "30px",
        overflow: "auto",
        display: 'flex',
        flexDirection: 'column'

    },
    typeAbout: {
        padding: "20px",
        color: "black",
        flex: 1
    },
    photo: {
        backgroundColor: "#eeeeee",
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
      meetupLink: {
        fontSize:'2rem',
        textDecoration: 'none'
      },
      messageLink: {
        fontSize:'2rem',
        textDecoration: 'none'
      },
      editIconBtn: {
        textAlign: 'right',
      },
      textarea: {
        width: '100%',
        height: '100%'
      },
      infoContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      },
      publicMessageText: {
        padding: '1rem',
        width: '90%'
      },
      bioContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '.8rem'
      },
      saveBioBtn: {
        marginBottom: ".8rem"
      },
      uploadBtn: {
        marginTop: '.8rem'
      }
  }));

export default function Dashboard() {
    const classes = useStyles()
    const [name, setName] = useState('');
    const [editOn, setEditOn] = useState(true);
    const [editMessageOn, setEditMessageOn] = useState(true);
    const dispatch = useDispatch();
    const userFirstName = useSelector((state) => state.auth.user.firstName);
    const userAge = useSelector((state) => state.auth.user.age);
    const userLastName = useSelector((state) => state.auth.user.lastName);
    const userEmail = useSelector((state) => state.auth.user.email);
    const userCity = useSelector((state) => state.auth.user.city);
    const userMeetupCity = useSelector((state) => state.auth.user.meetupCity);
    // const userNativeLang = useSelector((state) => state.auth.user.nativeLang);
    // const userTargetLang = useSelector((state) => state.auth.user.targetLang);
    const userMeetupType = useSelector((state) => state.auth.user.meetupType);
    const userId = useSelector((state) => state.auth.user.id);
    // const userPhoto = useSelector((state) => state.auth.user.images[0].filename);
    
    const userPublicMessage = useSelector((state) => state.auth.user.publicMessage);
    // const photos = useSelector((state) => state.photos.photos);
    const [singleUserPhoto, setSingleUserPhoto] = useState("");
    const [newImage, setNewImage] = useState("");
    const [email, setEmail] = useState(userEmail);
    // const [password, setPassword] = useState();
    const [firstname, setFirstName] = useState(userFirstName);
    const [lastname, setLastName] = useState(userLastName);
    const [city, setCity] = useState(userCity);
    const [publicMessage, setPublicMessage] = useState(userPublicMessage);
    // const [nativeLang, setNativeLang] = useState();
    // const [targetLang, setTargetLang] = useState("");
    const [meetupCity, setMeetupCity] = useState(userMeetupCity);
    const [meetupType, setMeetupType] = useState(userMeetupType);
    const [age, setAge] = useState(userAge);
    

    const handleChange = (event) => {
    setName(event.target.value);
    };

    const handleUpdateDetails = (e) => {
      e.preventDefault()
      // console.log(userId, email, firstname, lastname, age, meetupType)
      dispatch(updateUser(userId, email, firstname, lastname, age, meetupType))
      };

    const handleUpdateMessage = (e) => {
      e.preventDefault()
      // console.log(userId, email, firstname, lastname, age, meetupType)
      // dispatch(updateUser(userId, email, firstname, lastname, age, meetupType))
      };


  const getUser = async (userId) => {
    const user = await axios.get(`${process.env.REACT_APP_ENDPOINT}/users/${userId}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
     });
     
      setSingleUserPhoto(user.data.images[0].filename);
      // console.log(user.data.images[0].filename);
     
  }

  // useEffect(() => {
  //   getUser(userId);
  //  }, []);
  
  
   useEffect(() => {
    (async function anyNameFunction() {
      await getUser(userId);
    })();
   }, []);

   const handleImageUpload = ({ target }) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(target.files[0]);
    fileReader.onload = (e) => {
        setNewImage(e.target.result)
        // console.log(e.target.result)
    };
  }
    
//     // console.log('newImage: ' + newImage)

//     const config = {
//       headers: {
//       'Authorization': `Bearer ${localStorage.getItem('token')}`
//       },
//     };
//     const data = {
//       filename: 'test',
//       title: 'test',
//       caption: 'test',
//       image: 'test',
//       mediaImage: newImage
//     }
//     axios.post(`${process.env.REACT_APP_ENDPOINT}/media_objects`, data, config)
//     .then((response) => console.log('post photo success' + response.data))
//     .catch((error) => console.log('error:' + error));
// };

// function postPhoto() {
//   console.log('postphoto called')
//   const config = {
//     headers: {
//     'Authorization': `Bearer ${localStorage.getItem('token')}`
//     },
//   };
//   const data = {
//     filename: 'test',
//     title: 'test',
//     caption: 'test',
//     image: 'test',
//     mediaImage: newImage
//   }
//   axios.post(`${process.env.REACT_APP_ENDPOINT}/media_objects`, data, config)
//   .then((response) => console.log('post photo success' + response.data))
//   .catch((error) => console.log('error:' + error));
// }
  

  // useEffect(() => {
  //   dispatch(getPhoto(userId));
  // }, [])
  // console.log("photo:" + photos[0].title)

  return (
    <div className={classes.root}>
        <Container className={classes.container}>
      <Grid className={classes.grid1} justify="space-evenly" container spacing={4}>
        <Grid item>
          <Paper className={classes.photo} elevation={3}>
          <Avatar alt="user profile photo" src={`https://wdev.be/wdev_nicole/eindwerk/image.php?${singleUserPhoto}.jpg&height=200&image=/wdev_nicole/eindwerk/images/${singleUserPhoto}.jpg`} className={classes.large} />
              </Paper>
              <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                onChange={handleImageUpload}
                type="file"
                />
                <label htmlFor="contained-button-file">
                  <Button className={classes.uploadBtn} variant="contained" color="secondary" component="span">
                    Upload
                  </Button>
                </label>
              
        </Grid>
        <Grid item>
          
          <Paper className={classes.paperAbout} elevation={3}>
            <form onSubmit={handleUpdateMessage}>
          <Container className={classes.bioContainer}>
              <Typography variant='h6'>Personal Bio</Typography>
                <div className={classes.editIconBtn}>
                  <IconButton className={classes.editIconBtnTag} onClick={() => setEditMessageOn(!editMessageOn)}><EditIcon className={classes.editIcon}/></IconButton>
                </div>
              </Container>
              
          {/* <Typography variant='h6'>Personal Bio</Typography>
            <div className={classes.editIconBtn}>
            
              <IconButton onClick={() => setEditMessageOn(!editMessageOn)}><EditIcon /></IconButton>
            </div> */}
              {/* <TextareaAutosize 
                className={classes.textarea}
                aria-label="public-message" 
                rowsMin={5} 
                placeholder="Bio" 
                disabled={editMessageOn}
                value={userPublicMessage} 
                onChange={handleChange}
                fullWidth
              /> */}
            <TextField 
                className={classes.publicMessageText}
                id="public-message"  
                disabled={editMessageOn}
                value={publicMessage} 
                multiline
                rows={5}
                InputProps={{
                  disableUnderline: true,
                 }}
                onChange={(e) => {
                  setPublicMessage(e.target.value);
                }}
              />
           
                <div>
                  {!editMessageOn && 
                    <Button className={classes.saveBioBtn} variant="outlined" color="secondary" component="button" type='submit'>
                      Save
                    </Button>
                  }
                </div>
            </form>
            </Paper>
        </Grid>
      </Grid>
      <Grid className={classes.grid2} justify="center" alignItems="center" container direction="row" spacing={0}>
          <Grid className={classes.gridBottomLeft}>
            <Grid item xs>
            <Paper className={classes.paperInfo} elevation={3}>
            <form className={classes.form} noValidate autoComplete="off" onSubmit={handleUpdateDetails}>
              <Container className={classes.infoContainer}>
              <Typography variant='h6'>Personal Details</Typography>
                <div className={classes.editIconBtn}>
                  <IconButton className={classes.editIconBtnTag} onClick={() => setEditOn(!editOn)}><EditIcon className={classes.editIcon}/></IconButton>
                </div>
                
              </Container>
              
              
                {/* <div>
                    <TextField 
                    id="standard-name" 
                    label="Name" 
                    disabled={editOn}
                    value={userFirstName} 
                    onChange={handleChange} 
                    />
                </div>
                <div>
                    <TextField
                    id="filled-name"
                    label="Age"
                    disabled={editOn}
                    value={userAge}
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <TextField
                    id="outlined-name"
                    label="Meetup Type"
                    disabled={editOn}
                    value={userMeetupType}
                    onChange={handleChange}
                    />
                </div> */}
                        <TextField disabled={editOn} variant="standard" margin="normal" type="email" fullWidth id="email" label="Email Address" name="email" autoComplete="email" value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                        />
                        <TextField disabled={editOn} variant="standard" margin="normal" fullWidth id="firstname" label="First name" name="firstname" autoComplete="firstname" value={firstname}
                          onChange={(e) => {
                            setFirstName(e.target.value);
                          }}
                        />
                        <TextField disabled={editOn} variant="standard" margin="normal" fullWidth id="lastname" label="Last name" name="lastname" autoComplete="lastname" value={lastname}
                          onChange={(e) => {
                            setLastName(e.target.value);
                          }}
                        />
                        <TextField disabled={editOn} variant="standard" margin="normal" id="age" label="Age" name="age" autoComplete="age" value={age}
                          onChange={(e) => {
                            setAge(e.target.value);
                          }}
                        />
                        <TextField disabled={editOn} variant="standard" margin="normal" fullWidth name="city" label="City" type="text" id="city" value={city}
                          onChange={(e) => {
                            setCity(e.target.value);
                          }}
                        />
                        {/* <TextField disabled={editOn} variant="standard" margin="normal" fullWidth name="nativeLang" label="Native Language" type="text" id="nativeLang" value={nativeLang}
                          onChange={(e) => {
                            setNativeLang(e.target.value);
                          }}
                        />
                        <TextField disabled={editOn} variant="standard" margin="normal"  fullWidth name="targetLang" label="Meetup Language" type="text" id="targetLang" value={targetLang}
                          onChange={(e) => {
                            setTargetLang(e.target.value);
                          }}
                        /> */}
                        <TextField disabled={editOn} variant="standard" margin="normal" fullWidth name="meetup_city" label="City of meetup" type="text" id="meetup_city" value={meetupCity}
                          onChange={(e) => {
                            setMeetupCity(e.target.value);
                          }}
                        />
                        <TextField disabled={editOn} variant="standard" margin="normal" fullWidth name="meetup_type" label="Preferred type of meetup" type="text" id="meetup_type" value={meetupType}
                          onChange={(e) => {
                            setMeetupType(e.target.value);
                          }}
                          />
                          <div>
                            {!editOn && 
                              <Button variant="outlined" color="secondary" component="button" type='submit'>
                                Save
                              </Button>
                            }
                          </div>
                
                </form>
            </Paper>
            </Grid>
          </Grid>
            <Grid className={classes.gridBottomRight}>
            <Grid item xs>
              <Paper className={classes.paper} elevation={3}>
                <Link className={classes.meetupLink} to='/meetups'>My Meetups </Link>
              </Paper>
            </Grid>
            <Grid item xs={6}>
            <Paper className={classes.paper} elevation={3}>
              <Link className={classes.messageLink} to='/messages'>My Messages </Link>
            </Paper>
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