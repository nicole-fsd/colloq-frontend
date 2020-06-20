import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { Grid, Typography, TextField, Container, Button, Paper } from "@material-ui/core";
import { loginUser } from "../data/auth";
import { Formik } from "formik";
import * as EmailValidator from "email-validator";
import * as Yup from "yup";


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
    backgroundColor: "white",
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

const Login= () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  return(
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          console.log("Logging in", values);
          dispatch(loginUser(values.email, values.password))

          setSubmitting(false);
        }, 500);
        }}

      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email()
          .required("Required"),
        password: Yup.string()
          .required("No password provided.")
          .min(8, "Password is too short - should be 8 chars minimum.")
          .matches(/(?=.*[0-9])/, "Password must contain a number.")
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

      

      
      return(
        <div>
          <div className={classes.root}>
            <Paper className={classes.paper} component="div" elevation={3}>
              <Typography variant="h4" component="h2" className={classes.title}>
                 Login
              </Typography>
              <form onSubmit={handleSubmit}>
          
                <TextField 
                  variant="standard" 
                  type='email' 
                  margin="normal" 
                  required 
                  fullWidth 
                  id="email" 
                  label="Email Address" 
                  name="email" 
                  autoComplete="email" 
                  value={values.email} 
                  onChange={handleChange}
                  />
                  {errors.email && touched.email && (
                    <div className="input-feedback">{errors.email}</div>
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
                    autoComplete="current-password" 
                    value={values.password} 
                    onChange={handleChange}
                  />
                  {errors.password && touched.password && (
                    <div className="input-feedback">{errors.password}</div>
                  )}
                  <div className={classes.div}>
                       <Button color="secondary" type="submit" disabled={isSubmitting} variant="contained">Log In</Button>
                       <Link className={classes.link} to="/register">Not yet registered? </Link>
                  </div>
                  {/* <button type="submit" disabled={isSubmitting}>
                    Login
                  </button> */}
              </form>
        </Paper>
        </div>
        </div>
      );
    }}
    
  </Formik>
  )
};

export default Login;



/////ORIGINAL/////////////////////////////////////////////////

// export default function Login() {
//     const classes = useStyles();
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const dispatch = useDispatch();

    
  
    
//     const submitHandler = (e) => {
//       e.preventDefault();
//       dispatch(loginUser(email, password)); 
//       }
  

//     return (
//       <>
//       <div>
//       <div className={classes.root}>
//       <Paper className={classes.paper} component="div" elevation={3}>
//         <Grid container direction="column" className={classes.container}>
//           <Grid item container xs={12} sm={10} direction="column">
//             <Grid item xs={12}>
//               <Typography variant="h4" component="h2" className={classes.title}>
//                 Login
//               </Typography>
//               <Container component="main" maxWidth="xs">
//                 <div>
//                   <form onSubmit={submitHandler}>
//                     <TextField variant="standard" type='email' margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" value={email} onChange={(e) => {setEmail(e.target.value);}}/>
//                     <TextField variant="standard" margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" value={password} onChange={(e) => { setPassword(e.target.value);}}/>
//                     <div className={classes.div}>
//                       <Button color="secondary" type="submit" variant="contained">Log In</Button>
//                       <Link className={classes.link} to="/register">Not yet registered? </Link>
//                     </div>
//                   </form>
//                 </div>
//               </Container>
//             </Grid>
//           </Grid>
//         </Grid>
//         </Paper>
//         </div>
//         </div>
//       </>
//     );
//   }
  