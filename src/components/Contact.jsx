import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Grid, Typography, TextField, Container, Button, Paper, TextareaAutosize } from "@material-ui/core";
import { postMail } from "../data/contact";

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: "#E1E2E1",
      minWidth: 400,
      maxWidth: 500,
      height: 'auto',
      position: 'absolute',
      top: '20%',
      left: 0,
      right: 0,
      margin: 'auto',
    },
    
  title: {
    fontSize: "30px",
    textAlign: "center",
    color: '#757575',
    margin: '15px'
  },
  toolbar: {
    color: "white",
  },
  container: {
    alignItems: "center",
    marginTop: theme.spacing(5),
  },
  paper: {
    backgroundColor: "white",
    border: '1px solid #bdbdbd',
    padding: 20,
    overflow: 'auto',
    [theme.breakpoints.down('sm')]: {
      width: '95%',
      margin: 'auto',
    },
    [theme.breakpoints.up('md')]: {
      width: '100%',
      margin: 'auto',
      padding: '10px'
      
    },
  },
  link: {
    textDecoration: "none",
    fontSize: '1rem',
    marginLeft: "50px",
    color: "gray",
    '&:hover': {
      color: "black"
    }
  },
  div: {
    margin: "20px auto",
  },
  form: {
    width: '90%',
    margin: 'auto'
  },
  textarea: {
      width: '100%',
      marginTop: '15px'
  },
  submitmsgBtn: {
    marginTop: '10px'
  }
}))

export default function Contact() {
    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();

    
  
    
    const submitHandler = (e) => {
      e.preventDefault();
      dispatch(postMail(name, email, message))
      }
  

    return (
      <>
      <div>
      <div className={classes.root}>
      <Paper className={classes.paper} component="div" elevation={3}>
        <Grid container direction="column" className={classes.container}>
          <Grid item container xs={12} sm={10} direction="column">
            <Grid item xs={12}>
              <Typography variant="h4" component="h2" className={classes.title}>
                Contact Us
              </Typography>
              <Container component="main" maxWidth="xs">
                <div>
                  <form onSubmit={submitHandler}>
                    <TextField variant="standard" type='text' margin="normal" required fullWidth id="name" label="Name" name="name" value={name} onChange={(e) => {setName(e.target.value);}}/>
                    <TextField variant="standard" type='email' margin="normal" required fullWidth id="email" label="Email" name="email" autoComplete="email" value={email} onChange={(e) => {setEmail(e.target.value);}}/>
                    <TextareaAutosize className={classes.textarea} aria-label="message textarea" required rowsMin={8} placeholder="Write a message..." id="text" label="Message" name="text" value={message}
                        onChange={(e) => {
                        setMessage(e.target.value);
                        }} />
                    <Button type="submit" className={classes.submitmsgBtn} variant="contained" color="secondary">
                        Send
                    </Button>
                  </form>
                </div>
              </Container>
            </Grid>
          </Grid>
        </Grid>
        </Paper>
        </div>
        </div>
      </>
    );
  }
  