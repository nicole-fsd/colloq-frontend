import React, {useState} from "react";
// import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import 'date-fns';
import { Link } from "react-router-dom";
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import DateFnsUtils from '@date-io/date-fns';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormLabel from '@material-ui/core/FormLabel';
import { registerUser } from '../data/auth'
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
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [city, setCity] = useState("");
    const [meetupCity, setMeetupCity] = useState("");
    const [meetupType, setMeetupType] = useState("");
    const [age, setAge] = useState("");
    const [error, setError] = useState("");
    const [radioValue, setRadioValue] = useState('');
    const [isTourist, setIsTourist] = useState(false);
    const [isTutor, setIsTutor] = useState(false);
    const [startDate, setStartDate] = useState(new Date('2014-08-18T21:11:54'));
    const [endDate, setEndDate] = useState(new Date('2014-08-18T21:11:54'));
   


    const handleRoleChange = (event) => {
      setRadioValue(event.target.value)
      console.log(radioValue)
    };

    const handleStartDateChange = (date) => {
      setStartDate(date);
    };
    const handleEndDateChange = (date) => {
      setEndDate(date);
    };
  
    const submitHandler = (e) => {
      e.preventDefault();
      dispatchEvent(registerUser(firstname, lastname, email, password, age, city, meetupCity, meetupType, startDate, endDate, radioValue))
    };

    return (
      <>
        <div className={classes.root}>
          <Paper className={classes.paper} component="div" variant="elevated" elevation={3}>
            <Typography variant="h4" component="h2" className={classes.title}>
              Register
            </Typography>
            <form className={classes.form}>
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
                    <TextField
                    id="date"
                    label="Start Date"
                    type="date"
                    value={startDate}
                    onChange={handleStartDateChange}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <TextField
                    id="date"
                    label="End Date"
                    type="date"
                    value={endDate}
                    onChange={handleEndDateChange}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
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
            {/* <Grid container >
              <form className={classes.gridTop}>
                <div className={classes.gridLeft}>

                </div>
                <div className={classes.gridRight}>

                </div>
              </form> 
            </Grid> */}
          </Paper>
        </div>
      </>
    );
  }



  {/* <div className={classes.root}>
        <Paper className={classes.paper} component="div" variant="elevated" elevation={3}>
          <Grid>
          <form onSubmit={submitHandler}>
            <Grid item xs={6} container direction="column" className={classes.container}>
              <Grid item container xs={12} sm={10} direction="column">
                <Grid item xs={12}>
                  <Typography variant="h4" component="h2" className={classes.title}>
                    Register
                  </Typography>
                  <Container component="main" maxWidth="xs">
                    <div>
                      <TextField variant="standard" margin="normal" required fullWidth id="firstname" label="First name" name="firstname" autoComplete="firstname" value={firstname}
                          onChange={(e) => {
                            setError("");
                            setEmail(e.target.value);
                          }}
                        />
                        <TextField variant="standard" margin="normal" required fullWidth id="lastname" label="Last name" name="lastname" autoComplete="lastname" value={lastname}
                          onChange={(e) => {
                            setError("");
                            setEmail(e.target.value);
                          }}
                        />
                        <TextField variant="standard" margin="normal" required fullWidth id="age" label="Age" name="age" autoComplete="age" value={age}
                          onChange={(e) => {
                            setError("");
                            setEmail(e.target.value);
                          }}
                        />
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
                        <div className={classes.div}>
                        <Button type="submit" variant="contained" color="secondary">
                          Submit
                        </Button>
                        <Link className={classes.link} to="/login">Already have an account? </Link>
                        </div>
                      </form>
                    </div>
                  </Container>
              </Grid>
            </Grid>
            <Grid item xs={6} container>

            </Grid>
          </Grid>
      </Grid>
          
      </Paper>
      </div> */}