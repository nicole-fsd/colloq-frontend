import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import 'date-fns';
import {useDispatch} from 'react-redux'
import { Link } from "react-router-dom";
import DateFnsUtils from '@date-io/date-fns';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { registerUser } from '../data/auth';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import {Grid, Typography, TextField, Container, Button, Paper, FormControl, NativeSelect } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      justifyContent: "center",
      backgroundColor: "#E1E2E1",
      height: "100vh"
    },
  paper: {
    backgroundColor: "white",
    width: "40%",
    height: "90vh",
    alignSelf: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: ".5ch"
  },
  gridTop: {
    border: "1px solid black",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    height: "80%",
    alignContent: "center"
  },
  gridLeft: {
    border: "1px solid blue",
    height: "65ch",
    width: "73ch"
  },
  gridRight: {
    border: "1px solid red",
    height: "65ch",
    width: "73ch"
  },
  title: {
    fontSize: "30px",
    textAlign: "center",
    margin: "1ch"
  },
  form: {
    width: "400px",
  },
  submitDiv: {
    margin: "4ch"
  },
  link: {
    marginLeft: "6ch",
    textDecoration: "none",
    color: "gray",
    '&:hover': {
      color: "black"
    }
  }
}));



export default function Register() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [city, setCity] = useState("");
    const [nativeLang, setNativeLang] = useState("");
    const [targetLang, setTargetLang] = useState("");
    const [meetupCity, setMeetupCity] = useState("");
    const [meetupType, setMeetupType] = useState("");
    const [age, setAge] = useState("");
    const [error, setError] = useState("");
    const [radioValue, setRadioValue] = useState('');
    const [isTourist, setIsTourist] = useState(false);
    const [isTutor, setIsTutor] = useState(false);
    const [startDate, setStartDate] = useState(new Date('2014-08-18T21:11:54'));
    const [endDate, setEndDate] = useState(new Date('2014-08-18T21:11:54'));
    

    const handleStartDateChange = (date) => {
      setStartDate(date);
    };

    const handleEndDateChange = (date) => {
      setEndDate(date);
    };
    
    const handleRoleChange = (event) => {
        setRadioValue(event.target.value)
        console.log(radioValue)
      };

    const submitHandler = (e) => {
      e.preventDefault();
      dispatch(registerUser(firstname, lastname, email, password, age, meetupType, startDate, endDate, radioValue))
    };

    return (
      <>
        <div className={classes.root}>
          <Paper className={classes.paper} component="div" elevation={3}>
            <Typography variant="h4" component="h2" className={classes.title}>
              Register
            </Typography>
            <form className={classes.form} method="POST" onSubmit={submitHandler}>
                          <TextField variant="standard" margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" value={email}
                          onChange={(e) => {
                            setError("");
                            setEmail(e.target.value);
                          }}
                        />
                        <TextField variant="standard" margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" value={password}
                          onChange={(e) => {
                            setError("");
                            setPassword(e.target.value);
                          }}
                        />
                        <TextField variant="standard" margin="normal" required fullWidth id="firstname" label="First name" name="firstname" autoComplete="firstname" value={firstname}
                          onChange={(e) => {
                            setError("");
                            setFirstName(e.target.value);
                          }}
                        />
                        <TextField variant="standard" margin="normal" required fullWidth id="lastname" label="Last name" name="lastname" autoComplete="lastname" value={lastname}
                          onChange={(e) => {
                            setError("");
                            setLastName(e.target.value);
                          }}
                        />
                        <TextField variant="standard" margin="normal" fullWidth id="age" label="Age" name="age" autoComplete="age" value={age}
                          onChange={(e) => {
                            setError("");
                            setAge(e.target.value);
                          }}
                        />
                        <TextField variant="standard" margin="normal" required fullWidth name="city" label="City" type="text" id="city" value={city}
                          onChange={(e) => {
                            setError("");
                            setCity(e.target.value);
                          }}
                        />
                        <TextField variant="standard" margin="normal" required fullWidth name="nativeLang" label="Native Language" type="text" id="nativeLang" value={nativeLang}
                          onChange={(e) => {
                            setError("");
                            setNativeLang(e.target.value);
                          }}
                        />
                        <TextField variant="standard" margin="normal" required fullWidth name="targetLang" label="Meetup Language" type="text" id="targetLang" value={targetLang}
                          onChange={(e) => {
                            setError("");
                            setTargetLang(e.target.value);
                          }}
                        />
                        <TextField variant="standard" margin="normal" required fullWidth name="meetup_city" label="City of meetup" type="text" id="meetup_city" value={meetupCity}
                          onChange={(e) => {
                            setError("");
                            setMeetupCity(e.target.value);
                          }}
                        />
                        <TextField variant="standard" margin="normal" fullWidth name="meetup_type" label="Preferred type of meetup" type="text" id="meetup_type" value={meetupType}
                          onChange={(e) => {
                            setError("");
                            setMeetupType(e.target.value);
                          }}
                        />
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container justify="space-around">
                    {/* <TextField
                    id="startdate"
                    label="Start Date"
                    type="date"
                    defaultValue="2017-05-24"
                    value={startDate}
                    onChange={handleStartDateChange}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  /> */}
                  
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      label="Date-picker-inline1"
                      value={startDate}
                      onChange={handleStartDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="date-picker-inline2"
                      label="Date picker inline"
                      value={endDate}
                      onChange={handleEndDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                      
                      <FormControl className={classes.formControl}>
                      <InputLabel id="demo-simple-select-label">Role</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={radioValue}
                        onChange={handleRoleChange}
                      >
                        <MenuItem value={"tourist"}>Tourist</MenuItem>
                        <MenuItem value={"tutor"}>Tutor</MenuItem>
                        
                      </Select>
                    </FormControl>
                        </Grid>
                      </MuiPickersUtilsProvider>
                      <div className={classes.submitDiv}>
                        <Button type="submit" variant="contained" color="secondary">
                          Submit
                        </Button>
                        <Link className={classes.link} to="/login">Already have an account? </Link>
                        </div>
              </form>
          </Paper>
        </div>
      </>
    );
  }