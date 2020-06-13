import React, {useState} from "react";
// import { Redirect, Route } from "react-router-dom";
import axios from 'axios'
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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import FormHelperText from '@material-ui/core/FormHelperText';
import { addMeetup } from "../data/meetups";




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
    
  }));

export default function MeetupsOverview() {
    const classes = useStyles()
    const dispatch = useDispatch();
    const localizer = momentLocalizer(moment);
    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');
    const [city, setCity] = useState("");
    const [language, setLanguage] = useState("");
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [languageId, setLanguageId] = useState("");
    const [cityId, setCityId] = useState("");


    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

      const handleCreateNewMeetup = async (e) => {
        // setOpen(false);
        e.preventDefault();
        const requestOne = axios.get(`${process.env.REACT_APP_ENDPOINT}/cities?name=vienna`, {
            headers: {
              authorization: `Bearer ${localStorage.getItem('token')}`
            }
           });
        const requestTwo = axios.get(`${process.env.REACT_APP_ENDPOINT}/languages?name=german`, {
            headers: {
              authorization: `Bearer ${localStorage.getItem('token')}`
            }
           });

        const [city, language] = await axios.all([requestOne, requestTwo]);

        const cityIdData = (city.data['hydra:member'][0].id)
        const languageIdData = (language.data['hydra:member'][0].id)
        
        setLanguageId(languageIdData)
        setCityId(cityIdData)
        console.log(name)

        dispatch(addMeetup(name, cityIdData, date, startTime, endTime, type, languageIdData, description))
        setOpen(false);
      };

    
      

    const events = [
        {
            start: moment().toDate(),
            end: moment().toDate(),
            // end: moment()
            // .add(1, "days")
            // .toDate(),
            title: "Meetup in Lisbon"
        },
        {
            start: moment().add(12, 'days').toDate(),
            end: moment().add(12, 'days').toDate(),
            title: "Meetup in Tokyo"
        },
        {
            start: moment().add(3, 'days').toDate(),
            end: moment().add(3, 'days').toDate(),
            title: "Meetup in Paris"
        },
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
                <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                        Create New Meetup
                    </Button>
                <Dialog
                        fullWidth={fullWidth}
                        maxWidth={maxWidth}
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
                                value={city}
                                onChange={(e) => {
                                setCity(e.target.value);
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
                                value={language}
                                onChange={(e) => {
                                setLanguage(e.target.value);
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
            

      </Container>
      <Footer />
    </div>
  );
};