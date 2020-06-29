import React, {useState, useEffect} from "react";
import axios from 'axios'
import { makeStyles } from "@material-ui/core/styles";
import { Container , Paper, Grid, Typography, Button, TextField, IconButton} from '@material-ui/core';
import Footer from '../landing/Footer'
import Avatar from '@material-ui/core/Avatar';
import { updateUser, updateUserPhoto, updatePublicMessage, updateDates } from "../../data/auth";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import EditIcon from '@material-ui/icons/Edit';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import EmailIcon from '@material-ui/icons/Email';
import EventIcon from '@material-ui/icons/Event';


//STYLE ////////////////////////////////
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
        margin: "30px",
        alignItems: 'center'
      },
    container: {
        backgroundColor: "#E1E2E1",
        width: "100vw",
        minHeight: "100vh",
        [theme.breakpoints.down('xs')]: {
          width: '100%',
        },  
      },
    grid1: {
        paddingTop: "80px",
        alignItems: "center",
        marginLeft: "20px",
        [theme.breakpoints.down('xs')]: {
          marginLeft: "-15px",
          marginBottom: ".5rem"
        },
        [theme.breakpoints.down('md')]: {
          marginBottom: "1rem"
        },
      },
    grid2: {
        minHeight: "800px",
    },
    gridBottomRight: {
        marginLeft: "90px",
        [theme.breakpoints.down('xs')]: {
          marginLeft: "80px",
          marginRight: "0px",
        },
        [theme.breakpoints.down('md')]: {
          marginRight: "80px",
        },
    },
    paperInfo: {
        backgroundColor: "#eeeeee",
        minHeight: "650px",
        width: "400px",
    },
    paperAbout: {
        backgroundColor: "#eeeeee",
        minHeight: "10rem",
        width: "450px",
        marginLeft: "30px",
        overflow: "auto",
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down('xs')]: {
          width: "400px",
          marginLeft: "100px",
        },
        [theme.breakpoints.down('md')]: {
          width: "400px",
          marginRight: "100px"
        },
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
        borderRadius: "50%",
        [theme.breakpoints.down('md')]: {
          marginRight: "100px"
        },
        [theme.breakpoints.down('xs')]: {
          marginLeft: "100px"
        },
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
        paddingBottom: "26px",
      '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '34ch',
          },
    },
    meetupLink: {
        fontSize:'2rem',
        textDecoration: 'none',
        color: '#65499c',
        fontFamily: 'Segoe UI'
    },
    messageLink: {
        fontSize:'2rem',
        textDecoration: 'none',
        color: '#65499c',
        fontFamily: 'Segoe UI',
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
        alignItems: 'center',
        color: '#757575',
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
        marginTop: '.8rem',
        color: '#757575',
      },
    saveBioBtn: {
        marginBottom: ".8rem"
      },
    uploadBtn: {
        marginTop: '.8rem',
        [theme.breakpoints.down('md')]: {
          marginRight: "100px"
        },
        [theme.breakpoints.down('xs')]: {
          marginLeft: "100px"
        },
      },
    paperDates: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: "#757575",
        backgroundColor: "#eeeeee",
        height: "290px",
        width: "400px",
        margin: "30px"
      },
    saveDatesBtn: {
        marginTop: '10px'
      },
    linkIconDiv: {
      marginTop: "15px"
    }
  }));

//USER DASHBOARD /////////////////////////////
export default function Dashboard() {
    const classes = useStyles()
    // const [name, setName] = useState('');
    const [editOn, setEditOn] = useState(true);
    const [editMessageOn, setEditMessageOn] = useState(true);
    const [editDatesOn, setEditDatesOn] = useState(true);
    const dispatch = useDispatch();
    const userFirstName = useSelector((state) => state.auth.user.firstName);
    const userAge = useSelector((state) => state.auth.user.age);
    const userLastName = useSelector((state) => state.auth.user.lastName);
    const userEmail = useSelector((state) => state.auth.user.email);
    const userCity = useSelector((state) => state.auth.user.city);
    const userMeetupCity = useSelector((state) => state.auth.user.meetupCity);
    const userNativeLanguage = useSelector((state) => state.auth.user.nativeLanguage);
    const userTargetLanguage = useSelector((state) => state.auth.user.targetLanguage);
    const userMeetupType = useSelector((state) => state.auth.user.meetupType);
    const userStartDate = useSelector((state) => state.auth.user.startDate);
    const userEndDate = useSelector((state) => state.auth.user.endDate);
    const userId = useSelector((state) => state.auth.user.id);
    const userImage = useSelector((state) => state.auth.user.image);
    // const userPhoto = useSelector((state) => state.auth.user.images[0].filename);
    const userPublicMessage = useSelector((state) => state.auth.user.publicMessage);
    const authUserPhoto = useSelector((state) => state.auth.user.imageFile);
    // const photos = useSelector((state) => state.photos.photos);
    const [singleUserPhoto, setSingleUserPhoto] = useState("");
    const [email, setEmail] = useState(userEmail);
    const [firstName, setFirstName] = useState(userFirstName);
    const [lastName, setLastName] = useState(userLastName);
    const [city, setCity] = useState(userCity);
    const [publicMessage, setPublicMessage] = useState(userPublicMessage);
    const [nativeLanguage, setNativeLanguage] = useState(userNativeLanguage);
    const [targetLanguage, setTargetLanguage] = useState(userTargetLanguage);
    const [meetupCity, setMeetupCity] = useState(userMeetupCity);
    const [meetupType, setMeetupType] = useState(userMeetupType);
    const [age, setAge] = useState(userAge);
    const [startDate, setStartDate] = useState(userStartDate);
    const [endDate, setEndDate] = useState(userEndDate);
    const [fileUploadError, setFileUploadError] = useState(false);
    

    //HANDLERS ///////////////////////////////

    const handleStartDateChange = (date) => {
      setStartDate(date);
    };

    const handleEndDateChange = (date) => {
      setEndDate(date);
      };

    const handleUpdateDetails = async (e) => {
      e.preventDefault()
        const requestOne = axios.get(`${process.env.REACT_APP_ENDPOINT}/cities?name=${city}`, {
            headers: {
              authorization: `Bearer ${localStorage.getItem('token')}`
            }})
        const requestTwo = axios.get(`${process.env.REACT_APP_ENDPOINT}/cities?name=${meetupCity}`, {
            headers: {
              authorization: `Bearer ${localStorage.getItem('token')}`
            }})
        const requestThree = axios.get(`${process.env.REACT_APP_ENDPOINT}/languages?name=${nativeLanguage}`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
          }})
        const requestFour = axios.get(`${process.env.REACT_APP_ENDPOINT}/languages?name=${targetLanguage}`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
          }})
        const [cityIriData, meetupCityIriData, nativeLanguageIriData, targetLanguageIriData] = await axios.all([requestOne, requestTwo, requestThree, requestFour]);

        const cityIri = (cityIriData.data['hydra:member'][0]['@id'])
        const meetupCityIri = (meetupCityIriData.data['hydra:member'][0]['@id'])
        const nativeLanguageIri = (nativeLanguageIriData.data['hydra:member'][0]['@id'])
        const targetLanguageIri = (targetLanguageIriData.data['hydra:member'][0]['@id'])
      
        // .then((res) => console.log(res.data['hydra:member'][0]['@id']))
      // console.log(userId, email, firstname, lastname, age, meetupType)
      dispatch(updateUser(userId, firstName, lastName, age, cityIri, meetupCityIri, meetupType, nativeLanguageIri, targetLanguageIri))
      setEditOn(!editOn)
      };

    const handleUpdateMessage = (e) => {
      e.preventDefault()
      console.log(userId, publicMessage)
      dispatch(updatePublicMessage(userId, publicMessage))
      setEditMessageOn(!editMessageOn)
      };

    const handleUpdateDates = (e) => {
      e.preventDefault()
      console.log(startDate, endDate)
      dispatch(updateDates(userId, startDate, endDate))
      setEditDatesOn(!editDatesOn)
      };


    const getUser = async (userId) => {
      const user = await axios.get(`${process.env.REACT_APP_ENDPOINT}/users/${userId}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
     
      if (user.data.images.length > 0) {
        setSingleUserPhoto(user.data.images[0].filename);
      }
      // console.log(user.data.images[0].filename);  
      }
  
  
    useEffect(() => {
      (async function anyNameFunction() {
        await getUser(userId);
      })();
    }, []);


   const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    const filename = files[0].name
    // dispatch(setPhoto(filename))
    const formData = new FormData()

    files.forEach((file, i) => {
      console.log(file.size)
      if (file.size < 400000) {
        formData.append("file", file)
      } else {
        setFileUploadError(true)
      }
    })

    const config = {
      headers: {
      'Content-Type': "multipart/form-data",
      'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    };
    axios.post(`${process.env.REACT_APP_ENDPOINT}/media_objects`, formData, config)
    .then((response) => dispatch(updateUserPhoto(userId, response.data['@id'], userEmail, "password1234")))
    .catch((error) => console.log('error:' + error));
  }

 

  return (
    <div className={classes.root}>
      <Container className={classes.container}>
        <Grid className={classes.grid1} justify="space-evenly" container spacing={4}>

          {/* PROFILE PHOTO ---------------*/}
          <Grid item>
            <Paper className={classes.photo} elevation={3}>
              {/* <Avatar alt="user profile photo" src={`https://wdev.be/wdev_nicole/eindwerk/image.php?${userImage}&height=200&image=/wdev_nicole/eindwerk/images/${userImage}`} className={classes.large} /> */}
              <Avatar alt="user profile photo" src={`https://wdev.be/wdev_nicole/eindwerk/images/${userImage}`} className={classes.large} />
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

          {/* BIO SECTION -------------*/}
          <Grid item>
            <Paper className={classes.paperAbout} elevation={3}>
              <form onSubmit={handleUpdateMessage}>
                <Container className={classes.bioContainer}>
                  <Typography variant='h6'>Personal Bio</Typography>
                  <div className={classes.editIconBtn}>
                    <IconButton className={classes.editIconBtnTag} onClick={() => setEditMessageOn(!editMessageOn)}><EditIcon className={classes.editIcon}/></IconButton>
                  </div>
                </Container>
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

        {/* PERSONAL DETAILS SECTION -------------------*/}
        <Grid className={classes.grid2} justify="center" alignItems="center" container direction="row" spacing={0}>
          <Grid className={classes.gridBottomLeft}>
            <Grid item xs={12}>
              <Paper className={classes.paperInfo} elevation={3}>
                <form className={classes.form} noValidate autoComplete="off" onSubmit={handleUpdateDetails}>
                  <Container className={classes.infoContainer}>
                    <Typography variant='h6'>Personal Details</Typography>
                    <div className={classes.editIconBtn}>
                      <IconButton className={classes.editIconBtnTag} onClick={() => setEditOn(!editOn)}><EditIcon className={classes.editIcon}/></IconButton>
                    </div>
                  </Container>
                  {/* <TextField disabled={editOn} variant="standard" margin="normal" type="email" fullWidth id="email" label="Email Address" name="email" autoComplete="email" value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  /> */}
                  <TextField disabled={editOn} variant="standard" margin="normal" fullWidth id="firstName" label="First name" name="firstName" autoComplete="firstName" value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                  />
                  <TextField disabled={editOn} variant="standard" margin="normal" fullWidth id="lastName" label="Last name" name="lastName" autoComplete="lastName" value={lastName}
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
                  <TextField disabled={editOn} variant="standard" margin="normal" fullWidth name="meetupCity" label="City of meetup" type="text" id="meetupCity" value={meetupCity}
                    onChange={(e) => {
                      setMeetupCity(e.target.value);
                    }}
                  />
                  <TextField disabled={editOn} variant="standard" margin="normal" fullWidth name="meetupType" label="Preferred type of meetup" type="text" id="meetupType" value={meetupType}
                    onChange={(e) => {
                      setMeetupType(e.target.value);
                    }}
                    />
                    <TextField disabled={editOn} variant="standard" margin="normal" fullWidth name="nativeLanguage" label="Native Language" type="text" id="nativeLanguage" value={nativeLanguage}
                    onChange={(e) => {
                      setNativeLanguage(e.target.value);
                    }}
                    />
                    <TextField disabled={editOn} variant="standard" margin="normal" fullWidth name="targetLanguage" label="Target Language" type="text" id="targetLanguage" value={targetLanguage}
                    onChange={(e) => {
                      setTargetLanguage(e.target.value);
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

        {/* LINK SECTIONS ---------------------*/}
        <Grid className={classes.gridBottomRight}>
          <Grid item xs={12}>
              <Paper className={classes.paper} elevation={3}>
                <Link className={classes.meetupLink} to='/meetups'>My Meetups </Link><br />
                  <div className={classes.linkIconDiv}>
                    <EventIcon color="secondary" fontSize="large"></EventIcon>
                  </div>
              </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper} elevation={3}>
              <Link className={classes.messageLink} to='/messages'>My Messages </Link><br />
                <div className={classes.linkIconDiv}>
                  <EmailIcon color="secondary" fontSize="large"></EmailIcon>
                </div>
            </Paper>
          </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paperDates} elevation={3}>
              <Container className={classes.bioContainer}>
                  <Typography variant='h6'>Availability</Typography>
                  <div className={classes.editIconBtn}>
                    <IconButton className={classes.editIconBtnTag} onClick={() => setEditDatesOn(!editDatesOn)}><EditIcon className={classes.editIcon}/></IconButton>
                  </div>
                </Container>
                <form onSubmit={handleUpdateDates}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                          disabled={editDatesOn}
                          disableToolbar
                          disablePast
                          variant="inline"
                          format="MM/dd/yyyy"
                          margin="normal"
                          id="startDate"
                          label="Available start date"
                          value={startDate}
                          onChange={handleStartDateChange}
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                    />
                    <KeyboardDatePicker
                          disabled={editDatesOn}
                          disablePast
                          disableToolbar
                          variant="inline"
                          format="MM/dd/yyyy"
                          margin="normal"
                          id="startDate"
                          label="Available end date"
                          value={endDate}
                          onChange={handleEndDateChange}
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                      />
                      <div>
                        {!editDatesOn && 
                          <Button className={classes.saveDatesBtn} variant="outlined" color="secondary" component="button" type='submit'>
                            Save
                          </Button>
                        }
                      </div>
                </MuiPickersUtilsProvider>
                </form>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
};