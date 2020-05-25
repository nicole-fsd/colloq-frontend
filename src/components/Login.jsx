import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import {
    Grid,
    Typography,
    TextField,
    Container,
    Button,
  } from "@material-ui/core";


import { loginUser } from "./../data/user";
import { loggedIn } from "../helpers/auth";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  title: {
    fontSize: "30px",
    textAlign: "center"
  },
  toolbar: {
    color: "white",
  },
  container: {
    alignItems: "center",
    marginTop: theme.spacing(15),
  },
  link: {
    textDecoration: "none",
    marginLeft: "50px",
    color: "gray",
    '&:hover': {
      color: "black"
    }
  },
  div: {
    margin: "20px auto"
  }
}));

export default function Login() {
    const classes = useStyles();
    const [email, setEmail] = useState("test@example.com");
    const [password, setPassword] = useState("authenticate");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const loginError = useSelector((state) => state.user.login.error);
    const loading = useSelector((state) => state.user.login.loading);

    const submitHandler = (e) => {
      e.preventDefault();
      if (email === "" || password === "") {
        setError("All fields are required");
      } else {
        dispatch(loginUser(email, password));
        
      }
    };

    return (
      <>
       
        <Grid container direction="column" className={classes.container}>
          <Grid item container xs={12} sm={10} direction="column">
            <Grid item xs={12}>
              <Typography
                variant="h4"
                component="h2"
                className={classes.title}
              >
                Login
              </Typography>
              <Container component="main" maxWidth="xs">
                <div>
                  {loginError.bool && (
                    <Typography color="error">{loginError.msg}</Typography>
                  )}
                  {error !== "" && <Typography color="error">{error}</Typography>}
                  <form onSubmit={submitHandler}>
                    <TextField
                      InputProps={{
                        classes: {
                          notchedOutline: classes.notchedOutline,
                          input: classes.inputField,
                        },
                      }}
                      variant="standard"
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => {
                        setError("");
                        setEmail(e.target.value);
                      }}
                    />
                    <TextField
                      InputProps={{
                        classes: {
                          notchedOutline: classes.notchedOutline,
                          input: classes.inputField,
                        },
                      }}
                      variant="standard"
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => {
                        setError("");
                        setPassword(e.target.value);
                      }}
                    />
                    <div className={classes.div}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                      >
                        Log In
                      </Button>
                      <Link className={classes.link} to="/register">Not yet registered? </Link>
                    </div>
                    
                  </form>
                </div>
              </Container>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  }
  