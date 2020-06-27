import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios'
import 'date-fns';
import {useDispatch} from 'react-redux'
import { Link } from "react-router-dom";
import DateFnsUtils from '@date-io/date-fns';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { registerUser } from '../data/auth';
import { Formik } from "formik";
import * as Yup from "yup";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import {Grid, Typography, TextField, Button, Paper, FormControl } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: "#E1E2E1",
      minWidth: 400,
      maxWidth: 600,
      height: 'auto',
      position: 'relative',
      top: '10%',
      left: 0,
      right: 0,
      margin: '15px auto',

    },
  paper: {
    backgroundColor: "white",
    border: '1px solid #bdbdbd',
    padding: 20,
    overflow: 'auto',
  },
  // gridTop: {
  //   border: "1px solid black",
  //   display: "flex",
  //   flexDirection: "row",
  //   justifyContent: "center",
  //   height: "80%",
  //   alignContent: "center"
  // },
  // gridLeft: {
  //   border: "1px solid blue",
  //   height: "65ch",
  //   width: "73ch"
  // },
  // gridRight: {
  //   border: "1px solid red",
  //   height: "65ch",
  //   width: "73ch"
  // },
  title: {
    fontSize: "2.5rem",
    textAlign: "center",
    margin: "3ch 1ch",
    fontFamily: 'Segoe UI',
    color: '#757575'
  },
  form: {
    width: "70%",
    margin: 'auto'
  },
  submitDiv: {
    margin: "4ch",
    [theme.breakpoints.down('xs')]: {
      margin: '.5ch'
    },
  },
  link: {
    fontSize: '1rem',
    marginLeft: "6ch",
    textDecoration: "none",
    color: "gray",
    '&:hover': {
      color: "black"
    },
    [theme.breakpoints.down('xs')]: {
      marginLeft: '3ch'
    },
  },
  formControl: {
    margin: '2ch'
  },
  roleSelect: {
    paddingRight: '18px'
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
    const [radioValue, setRadioValue] = useState('');
    // const [isTourist, setIsTourist] = useState(false);
    // const [isTutor, setIsTutor] = useState(false);
    const [startDate, setStartDate] = useState(Date.now());
    const [endDate, setEndDate] = useState(Date.now());
    
    
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

    const submitHandler = async (e) => {
      e.preventDefault();
      // console.log(email, password, firstname, lastname, age, meetupType, startDate, endDate, cityIri, meetupCityIri, radioValue)
      dispatch(registerUser(email, password, firstname, lastname, age, city, meetupCity, nativeLang, targetLang, meetupType, startDate, endDate, radioValue))
    };

    return (
      <Formik
      initialValues={{ 
        email: "", 
        password: "",
        firstName: "",
        lastName: "",
        age: "",
        city: "",
        meetupCity: "",
        nativeLanguage: "",
        targetLanguage: "",
        meetupType: "",
        startDate: Date.now(),
        endDate: Date.now(),
        role: ""

      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          console.log("Registration in progress", values);
          dispatch(registerUser(
            values.email, 
            values.password, 
            values.firstName, 
            values.lastName, 
            values.age, 
            values.city, 
            values.meetupCity, 
            values.nativeLanguage, 
            values.targetLanguage, 
            values.meetupType, 
            values.startDate, 
            values.endDate, 
            values.role))

          setSubmitting(false);
        }, 500);
        }}

      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email()
          .required("Required"),
        password: Yup.string()
          .required("No password provided")
          .min(8, "Password is too short - should be 8 characters minimum")
          .matches(/(?=.*[0-9])/, "Password must contain a number"),
        firstName: Yup.string()
          .matches(/^[a-zA-Z\s]+$/, 'Input is not valid - must only contain letters'),
        lastName: Yup.string()
          .matches(/^[a-zA-Z]+$/, 'Input is not valid - must only contain letters'),
        age: Yup.number()
          .typeError("Age must be a number")
          .positive("Age must be greater than 0")
          .integer(),
        city: Yup.string()
          .matches(/^[a-zA-Z\s]+$/, 'Input is not valid - must only contain letters')
          .required("Required"),
        meetupCity: Yup.string()
          .matches(/^[a-zA-Z]+$/, 'Input is not valid - must only contain letters')
          .required("Required"),
        nativeLanguage: Yup.string()
          .matches(/^[a-zA-Z]+$/, 'Input is not valid - must only contain letters')
          .required("Required"),
        targetLanguage: Yup.string()
          .matches(/^[a-zA-Z]+$/, 'Input is not valid - must only contain letters')
          .required("Required"),
        meetupType: Yup.string()
          .matches(/^[a-zA-Z]+$/, 'Input is not valid - must only contain letters')
          .required("Required"),
        startDate: Yup.string(),
        endDate: Yup.string()

      })}
    >
      {props => {
      const {
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
      } = props;

      return (


      <>
      <div>
        <div className={classes.root}>
          <Paper className={classes.paper} component="div" elevation={3}>
            <Typography variant="h4" component="h2" className={classes.title}>
              Register
            </Typography>
            <form className={classes.form} method="POST" onSubmit={handleSubmit}>
                        <TextField 
                          variant="standard" 
                          margin="normal" type="email" 
                          required fullWidth id="email" 
                          label="Email Address" 
                          name="email" 
                          autoComplete="email" 
                          value={values.email}
                          onChange={handleChange}
                        />
                        {errors.email && touched.email && (
                          <div style={{color: "red"}} className="input-feedback">{errors.email}</div>
                        )}
                        <TextField 
                          variant="standard" 
                          margin="normal" 
                          required 
                          fullWidth 
                          name="password" 
                          label="Password" 
                          type="password" 
                          id="password" 
                          autoComplete="password" 
                          value={values.password}
                          onChange={handleChange}
                        />
                        {errors.password && touched.password && (
                          <div style={{color: "red"}} className="input-feedback">{errors.password}</div>
                        )}
                        <TextField 
                          variant="standard" 
                          margin="normal" 
                          required 
                          fullWidth 
                          id="firstName" 
                          label="First name" 
                          name="firstName"  
                          value={values.firstName}
                          onChange={handleChange}
                        />
                        {errors.firstName && touched.firstName && (
                          <div className="input-feedback">{errors.firstName}</div>
                        )}
                        <TextField 
                          variant="standard" 
                          margin="normal" 
                          required 
                          fullWidth 
                          id="lastName" 
                          label="Last name" 
                          name="lastName" 
                          value={values.lastName}
                          onChange={handleChange}
                        />
                        {errors.lastName && touched.lastName && (
                          <div className="input-feedback">{errors.lastName}</div>
                        )}
                        <TextField 
                          variant="standard" 
                          margin="normal" 
                          fullWidth 
                          id="age" 
                          label="Age" 
                          name="age" 
                          autoComplete="age" 
                          value={values.age}
                          onChange={handleChange}
                        />
                        {errors.age && touched.age && (
                          <div className="input-feedback">{errors.age}</div>
                        )}
                        <TextField 
                          variant="standard" 
                          margin="normal" 
                          required 
                          fullWidth 
                          name="city" 
                          label="City" 
                          type="text" 
                          id="city" 
                          value={values.city}
                          onChange={handleChange}
                        />
                        {errors.city && touched.city && (
                          <div className="input-feedback">{errors.city}</div>
                        )}
                        <TextField 
                          variant="standard" 
                          margin="normal" 
                          required 
                          fullWidth 
                          name="nativeLanguage" 
                          label="Native Language" 
                          type="text" 
                          id="nativeLanguage" 
                          value={values.nativeLanguage}
                          onChange={handleChange}
                        />
                        {errors.nativeLanguage && touched.nativeLanguage && (
                          <div className="input-feedback">{errors.nativeLanguage}</div>
                        )}
                        <TextField 
                          variant="standard" 
                          margin="normal" 
                          required 
                          fullWidth 
                          name="targetLanguage" 
                          label="Meetup Language" 
                          type="text" 
                          id="targetLanguage" 
                          value={values.targetLanguage}
                          onChange={handleChange}
                        />
                        {errors.targetLanguage && touched.targetLanguage && (
                          <div className="input-feedback">{errors.targetLanguage}</div>
                        )}
                        <TextField 
                          variant="standard" 
                          margin="normal" 
                          required 
                          fullWidth 
                          name="meetupCity" 
                          label="City of meetup" 
                          type="text" 
                          id="meetupCity" 
                          value={values.meetupCity}
                          onChange={handleChange}
                        />
                        {errors.meetupCity && touched.meetupCity && (
                          <div className="input-feedback">{errors.meetupCity}</div>
                        )}
                        <TextField 
                          variant="standard" 
                          margin="normal" 
                          required
                          fullWidth 
                          name="meetupType" 
                          label="Preferred type of meetup" 
                          type="text" 
                          id="meetupType" 
                          value={values.meetupType}
                          onChange={handleChange}
                        />
                        {errors.meetupType && touched.meetupType && (
                          <div className="input-feedback">{errors.meetupType}</div>
                        )}
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container justify="start">
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
                      id="startDate"
                      label="Available start date"
                      value={values.startDate}
                      onChange={handleChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                    {errors.startDate && touched.startDate && (
                      <div className="input-feedback">{errors.startDate}</div>
                    )}
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="endDate"
                      label="Available end date"
                      value={values.endDate}
                      onChange={handleChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                    {errors.endDate && touched.endDate && (
                      <div className="input-feedback">{errors.endDate}</div>
                    )}
                      
                      <FormControl className={classes.formControl}>
                      <InputLabel id="simple-select-label">Role: </InputLabel>
                      <Select
                        className={classes.roleSelect}
                        labelId="simple-select-label"
                        id="role"
                        name="role"
                        value={values.role}
                        onChange={handleChange}
                      >
                        <MenuItem id="tourist" name="tourist" value={"tourist"}>Tourist</MenuItem>
                        <MenuItem id="tutor" name="tutor" value={"tutor"}>Tutor</MenuItem>
                        
                      </Select>
                      {errors.role && touched.role && (
                      <div className="input-feedback">{errors.role}</div>
                    )}
                    </FormControl>
                        </Grid>
                      </MuiPickersUtilsProvider>
                      {/* {errors.length > 0 && <p>Please correct errors in the form</p>} */}
                      <div className={classes.submitDiv}>
                        <Button type="submit" variant="contained" color="secondary" disabled={isSubmitting}>
                          Submit
                        </Button>
                        <Link className={classes.link} to="/login">Already have an account? </Link>
                        </div>
              </form>
          </Paper>
        </div>
        </div>
      </>
    );
  }}
  </Formik>
    )
  }