import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { Grid, Typography, TextField, Container, Button, Paper } from "@material-ui/core";
import { loginUser } from "../data/auth";


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
    color: '#757575'
  },
  toolbar: {
    color: "white",
  },
  container: {
    alignItems: "center",
    marginTop: theme.spacing(5),
    
    
  },
  paper: {
    border: '1px solid #bdbdbd',
    padding: 20,
    overflow: 'auto',
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
    

  }
}));

export default function Login() {
    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
  
    
    const submitHandler = (e) => {
      e.preventDefault();
      dispatch(loginUser(email, password)); 
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
                Login
              </Typography>
              <Container component="main" maxWidth="xs">
                <div>


                {/* <ValidatorForm
                  
                  onSubmit={submitHandler}
                  onError={errors => console.log(errors)}
                >
                  <TextValidator
                      label="Email"
                      onChange={(e) => {setEmail(e.target.value)}}
                      name="email"
                      value={email}
                      validators={['required', 'isEmail']}
                      errorMessages={['this field is required', 'email is not valid']}
                  />
                  <TextValidator
                      label="Password"
                      onChange={(e) => {setPassword(e.target.value)}}
                      name="password"
                      type="password"
                      validators={['required', 'minNumber:8', 'maxNumber:255', 'matchRegexp:^[0-9]$']}
                      errorMessages={['this field is required', 'minimum 8 characters', 'maximum 255 characters', 'must contain an uppercase letter']}
                      value={password}
                      
                  />
                  <Button type="submit">Submit</Button>
                </ValidatorForm> */}


                  <form onSubmit={submitHandler}>
                    <TextField variant="standard" margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" value={email} onChange={(e) => {setEmail(e.target.value);}}/>
                    <TextField variant="standard" margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" value={password} onChange={(e) => { setPassword(e.target.value);}}/>
                    <div className={classes.div}>
                      <Button color="secondary" type="submit" variant="contained">Log In</Button>
                      <Link className={classes.link} to="/register">Not yet registered? </Link>
                    </div>
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
  