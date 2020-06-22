import React, {useState, useEffect} from "react";
// import { Redirect, Route } from "react-router-dom";
import axios from 'axios'
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, Button, TextField, Typography} from '@material-ui/core';
import Footer from './landing/Footer'
import { useDispatch, useSelector } from "react-redux";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import '../style/react-big-calendar.css'
import { Link } from 'react-router-dom'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { addMeetup, getMeetups } from "../data/meetups";





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
        marginTop: '.2rem'
      },
      backDiv: {
          margin: '.5rem',
      },
      form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: 'fit-content',
      },
      formControl: {
        marginTop: theme.spacing(2),
        minWidth: 120,
      },
      formControlLabel: {
        marginTop: theme.spacing(1),
      },
      createBtn: {
        margin: '.2rem .5rem 1.2rem .5rem'
      },
      updateBtn: {
        margin: '.2rem .5rem'
      },
      btnDiv: {
        margin: '.8rem 0'
      },
      detailDialog: {
        minWidth: '400px'
      },
      contentDialog: {
        minWidth: '350px'
      },
      key: {
        fontWeight: 'bold'
      },
      titleDialog: {
        margin: '.5rem'
      }
    
  }));

export default function MeetupsOverview() {
    const classes = useStyles()
    const dispatch = useDispatch();
    const localizer = momentLocalizer(moment);
    const [open, setOpen] = useState(false);
    const [openDetail, setOpenDetail] = useState(false);
    const [inputCity, setInputCity] = useState("");
    const [inputLanguage, setInputLanguage] = useState("");
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [participantEmail, setParticipantEmail] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [nameDetail, setNameDetail] = useState("");
    const [dateDetail, setDateDetail] = useState("");
    const [participantDetail, setParticipantDetail] = useState("");
    const [startTimeDetail, setStartTimeDetail] = useState("");
    const [endTimeDetail, setEndTimeDetail] = useState("");
    const [typeDetail, setTypeDetail] = useState("");
    const [descriptionDetail, setDescriptionDetail] = useState("");
    const [openedEventId, setOpenedEventId] = useState("");
    // const [languageId, setLanguageId] = useState("");
    // const [cityId, setCityId] = useState("");
    const userId = useSelector((state) => state.auth.user.id);
    const meetups = useSelector((state) => state.meetups.meetups);


    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

      const handleCreateNewMeetup = async (e) => {
        // setOpen(false);
        e.preventDefault();
        const requestOne = axios.get(`${process.env.REACT_APP_ENDPOINT}/cities?name=${inputCity}`, {
            headers: {
              authorization: `Bearer ${localStorage.getItem('token')}`
            }
           });
        const requestTwo = axios.get(`${process.env.REACT_APP_ENDPOINT}/languages?name=${inputLanguage}`, {
            headers: {
              authorization: `Bearer ${localStorage.getItem('token')}`
            }
           });
        const requestThree = axios.get(`${process.env.REACT_APP_ENDPOINT}/users?email=${participantEmail}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
        });

        const [city, language, participant] = await axios.all([requestOne, requestTwo, requestThree]);

        const cityIdData = (city.data['hydra:member'][0].id)
        const languageIdData = (language.data['hydra:member'][0].id)
        const participantData = (participant.data['hydra:member'])
        const participantResult = participantData.find(user => user.email === participantEmail)
        
        // setLanguageId(languageIdData)
        // setCityId(cityIdData)
        const participantId = participantResult.id

        dispatch(addMeetup(name, cityIdData, date, startTime, endTime, type, languageIdData, description, userId, participantId))
        setOpen(false);
      };

      // const handleGetMeetups = () => {
      //   dispatch(getMeetups(userId));
      // }

      useEffect(() => {
        dispatch(getMeetups(userId));
      }, [dispatch, userId])

      const handleEventSelect = (e) => {
        setOpenDetail(true);
        console.log(e)
        setNameDetail(e.name)
        const eDate = new Date(e.date)
        const dateString = eDate.toDateString()
        setDateDetail(dateString)
        setDescriptionDetail(e.description)
        const eStartTime = new Date(e.startTime)
        const startString = eStartTime.toTimeString().substr(0,5)
        setStartTimeDetail(startString)
        const eEndTime = new Date(e.endTime)
        const endString = eEndTime.toTimeString().substr(0,5)
        setEndTimeDetail(endString)
        setTypeDetail(e.type)
        setOpenedEventId(e.id)

      }
   
      const handleEventDelete = (e) => {
        console.log(openedEventId)
        axios.delete(`${process.env.REACT_APP_ENDPOINT}/meetups/${openedEventId}`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setOpenDetail(false);
        dispatch(getMeetups(userId))
      }

      const handleDetailClose = () => {
        setOpenDetail(false);
        
      }
    
  

  return (
    <div className={classes.root}>
        <Container className={classes.container}>

            <Grid className={classes.grid1} justify="space-evenly" container spacing={4}>
                <Grid item>
                </Grid>
            </Grid>

            <Grid className={classes.grid2} justify="center" alignItems="center" container direction="column" spacing={0}>
                {/* <div className={classes.backDiv}>
                    <Link className={classes.backLink} to='/dashboard'>Back to my profile</Link>
                </div> */}
                <div className={classes.btnDiv}>
                <Button className={classes.createBtn} variant="outlined" color="primary" onClick={handleClickOpen}>
                  Create New Meetup
                </Button>
                {/* <Button className={classes.updateBtn} variant="outlined" color="primary" onClick={handleGetMeetups}>
                  Update Calendar
                </Button> */}
                </div>
                
                  <Grid item xs>
                    <Calendar
                        localizer={localizer}
                        defaultDate={new Date()}
                        defaultView="month"
                        events={meetups}
                        style={{ height: "70vh", width: "60vw" }}
                        startAccessor="date"
                        endAccessor="date"
                        titleAccessor="name"
                        onSelectEvent={handleEventSelect}
                        />
                    </Grid>
                  </Grid>

                  {/* --------------------- CREATE EVENT DIALOG ------------------- */}

                  <Dialog   
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="dialog-title"
                  >
                  <DialogTitle id="new-meetup-dialog">Create New Meetup</DialogTitle>
                  <DialogContent>
                  <DialogContentText>
                      Please fill in the event details
                  </DialogContentText>
                    <form className={classes.form} noValidate>
                      <div>
                            <TextField
                                id="name"
                                label="Name"
                                type="text"
                                fullWidth
                                value={name}
                                onChange={(e) => {
                                setName(e.target.value);
                                }}
                            />
                            <TextField
                                id="city"
                                label="City"
                                type="text"
                                fullWidth
                                value={inputCity}
                                onChange={(e) => {
                                setInputCity(e.target.value);
                          }}
                            />
                            <TextField
                                id="participant"
                                label="Person you are meeting(email)"
                                type="email"
                                fullWidth
                                value={participantEmail}
                                onChange={(e) => {
                                setParticipantEmail(e.target.value);
                          }}
                            />
                            <FormControl>
                            <TextField
                                id="date"
                                
                                type="date"
                                autoComplete="current-password"
                                value={date}
                                onChange={(e) => {
                                setDate(e.target.value);
                          }}
                            />
                            <FormHelperText id="component-helper-text">Date</FormHelperText>
                            <TextField
                                id="start-time"
                                
                                type="time"
                                autoComplete="current-password"
                                value={startTime}
                                onChange={(e) => {
                                setStartTime(e.target.value);
                          }}
                            />
                            <FormHelperText id="component-helper-text">Start Time</FormHelperText>
                            <TextField
                                id="end-time"
                                
                                type="time"
                                autoComplete="current-password"
                                value={endTime}
                                onChange={(e) => {
                                setEndTime(e.target.value);
                          }}
                            />
                            <FormHelperText id="component-helper-text">End Time</FormHelperText>
                            </FormControl>
                            <TextField
                                id="type"
                                label="Type"
                                type="text"
                                fullWidth
                                value={type}
                                onChange={(e) => {
                                setType(e.target.value);
                          }}
                            />
                            <TextField
                                id="language"
                                label="Language"
                                type="text"
                                fullWidth
                                value={inputLanguage}
                                onChange={(e) => {
                                setInputLanguage(e.target.value);
                          }}
                            />
                            <TextField
                                id="description"
                                label="Description"
                                type="text"
                                multiline
                                fullWidth
                                value={description}
                                onChange={(e) => {
                                setDescription(e.target.value);
                          }}
                            />
                            

                        </div>
                        </form>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleCreateNewMeetup} color="primary">
                            Submit
                        </Button>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        </DialogActions>
                    </Dialog>
                           
                    {/* ------------------ EVENT DETAIL DIALOG -------------- */}

                    
                    <Dialog
                      className={classes.detailDialog}
                      open={openDetail}
                      onClose={handleDetailClose}
                      aria-labelledby="event-detail-dialog"
                    >
                      <DialogTitle className={classes.titleDialog} id="event-detail-dialog-title">{nameDetail}</DialogTitle>
                      <DialogContent className={classes.contentDialog}>
                        <Typography className={classes.key} variant='overline'>Date: </Typography><Typography variant='body1' component='span'>{dateDetail}</Typography><br />
                        <Typography className={classes.key} variant='overline'>Start: </Typography><Typography variant='body1' component='span'>{startTimeDetail}</Typography><br />
                        <Typography className={classes.key} variant='overline'>End: </Typography><Typography variant='body1' component='span'>{endTimeDetail}</Typography><br />
                        <Typography className={classes.key} variant='overline'>Type: </Typography><Typography variant='body1' component='span'>{typeDetail}</Typography><br />
                        <Typography className={classes.key} variant='overline'>Description: </Typography><Typography variant='body1' component='span'>{descriptionDetail}</Typography>
                        
                        
                          
                      </DialogContent>
                      <DialogActions>
                      <Button onClick={handleEventDelete} color="primary">
                          Delete Event
                        </Button>
                        <Button onClick={handleDetailClose} color="primary">
                          Close
                        </Button>
                      </DialogActions>
                    </Dialog>
            

      </Container>
      <Footer />
    </div>
  );
};