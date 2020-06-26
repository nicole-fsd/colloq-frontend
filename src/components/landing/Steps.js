import React from 'react';
import { Typography, Grid, Card, CardMedia, Container, CardActionArea, Avatar } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

 
const useStyles = makeStyles(theme => ({
  container: {
    minHeight: "800px",
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff7043",
    [theme.breakpoints.down('md')]: {
      height: '1000px',
    },
    
  },
  // grid: {
  //   padding: "8rem",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   color: "white",
  //   marginLeft: '28px'
  // },
  // gridItem: {
  //   height: "5rem",
  //   width: "5rem",
  //   borderRadius: "50%",
    
  // },
  card: {
    maxWidth: "350px",
    borderRadius: "50%"
  },
  media: {
    minHeight: "300px",
  },
  stepTitle: {
    fontSize: "3rem",
    // textAlign: "center",
    marginBottom: "1.5rem",
    paddingLeft: "100px"
  },
  stepTitle3: {
    fontSize: "3rem",
    // textAlign: "center",
    marginBottom: "1.5rem",
    paddingLeft: "30px",

  },
  gridItem: {
    height: '300px',
    width: '300px',
    // border: '1px solid black',
    margin: '.5rem',
    [theme.breakpoints.down('md')]: {
      height: '200px',
      width: '200px',
      marginTop: '30px'
    },
  },
  grid: {
    marginBottom: '50px',
    // border: 'solid 1px black',
    maxWidth: '80%',
    [theme.breakpoints.down('md')]: {
      marginBottom: '20px'
    },
    [theme.breakpoints.down('sm')]: {
      height: '100%'
    },

  },
  avatar: {
    backgroundColor: 'white',
    height: '300px',
    width: '300px',
    [theme.breakpoints.down('md')]: {
      height: '200px',
      width: '200px',
      
    },
  },
  title: {
    textAlign: 'center',
    fontSize: '2.5rem',
    color: 'white',
    marginBottom: '15px'
  },
  avatar3: {
    backgroundColor: 'white',
    height: '300px',
    width: '300px',
    [theme.breakpoints.down('md')]: {
      height: '200px',
      width: '200px',
      
    },
  },
  gridItem3: {
    height: '300px',
    width: '300px',
    // border: '1px solid black',
    margin: '.5rem',
    [theme.breakpoints.down('md')]: {
      height: '200px',
      width: '200px',
      marginTop: '0px'
    },
    [theme.breakpoints.down('lg')]: {
      marginTop: '0px',
      marginBottom: '20px'
    },
  },
  title3: {
    textAlign: 'center',
    fontSize: '1.5rem',
    color: 'white',
    marginBottom: '15px',
    [theme.breakpoints.down('md')]: {
      fontSize: '2rem',
      marginBottom: '20px',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '2.3rem',
      marginBottom: '25px'
     
    },
  },
  
}));

  export default function Steps() {
    const classes = useStyles();
   
    return (
      <div>
      <Container disableGutters maxWidth="xl" className={classes.container}>
        <Grid className={classes.grid} justify="space-around" container spacing={4}>
          <Grid item  xs={12} sm={6} md={3} className={classes.gridItem}>
          <Typography className={classes.title}>Sign up</Typography>
            <Avatar style={{margin: "auto"}} className={classes.avatar} alt="sign-up" src={require('./images/working.svg')}></Avatar>
          </Grid>
          <Grid item xs={12} sm={6} md={3} className={classes.gridItem}>
          <Typography className={classes.title}>Connect</Typography>
            <Avatar style={{margin: "auto"}} className={classes.avatar} alt="connect" src={require('./images/connect.svg')}></Avatar>
          </Grid>
          <Grid item xs={12} sm={6} md={3} className={classes.gridItem3}>
          <Typography className={classes.title3}>Meet and Learn</Typography>
            <Avatar style={{margin: "auto"}} className={classes.avatar3} alt="meet and learn" src={require('./images/conversation.svg')}></Avatar>
          </Grid>
        </Grid>
        
      </Container>
      </div>
    );
  }






  // <Grid container direction="row" justify="space-evenly" className={classes.grid}>
  //         <Grid item className={classes.gridItem} xs={12} sm={4}>
  //         <Typography className={classes.stepTitle}>Sign up</Typography>
  //           <Card className={classes.card}>
  //             <CardActionArea>
  //               <CardMedia
  //                 className={classes.media}
  //                 component="img"
  //                 image={require('./images/working.svg')}
  //                 title="sign up"
  //               />
  //             </CardActionArea>
  //           </Card>
  //         </Grid>
  //         <Grid item 
  //         className={classes.gridItem} 
  //         xs={12} sm={4}
  //         >
  //         <Typography className={classes.stepTitle}>Connect</Typography>
  //         <Card className={classes.card}>
  //             <CardActionArea>
  //               <CardMedia
  //               className={classes.media}
  //                 component="img"
  //                 image={require('./images/connect.svg')}
  //                 title="connect"
  //               />
  //             </CardActionArea>
  //           </Card >
  //         </Grid>
  //         <Grid item className={classes.gridItem} xs={12} sm={4}>
  //         <Typography className={classes.stepTitle3}>Meet and Learn</Typography>
  //         <Card className={classes.card}>
  //             <CardActionArea>
  //               <CardMedia
  //                 className={classes.media}
  //                 component="img"
  //                 image={require('./images/conversation.svg')}
  //                 title="meet and learn"
  //               />
               
  //             </CardActionArea>
     
  //           </Card>
  //         </Grid>
  //       </Grid>