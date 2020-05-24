import React from 'react';
import { Typography, Grid, Card, CardMedia, Container, CardActionArea } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

 
const useStyles = makeStyles(theme => ({
  container: {
    minHeight: "700px",
    justify: "center",
    alignItems: "center",
    backgroundColor: "#ff7043",
  },
  grid: {
    padding: "150px",
    justify: "center",
    alignItems: "center",
    color: "white",
  },
  gridItem: {
    height: "150px",
    width: "150px",
    borderRadius: "50%"
  },
  card: {
    maxWidth: "350px",
    borderRadius: "50%"
  },
  media: {
    height: "300px",
  },
  stepTitle: {
    fontSize: "30px",
    textAlign: "center",
    paddingBottom: "20px",
    paddingRight: "25px"
  }
}));

  export default function Steps() {
    const classes = useStyles();
   
    return (
      <Container disableGutters maxWidth="xl" className={classes.container}>
        <Grid container direction="row" justify="space-evenly" className={classes.grid}>
          <Grid item className={classes.gridItem} xs={3}>
          <Typography className={classes.stepTitle}>Sign up</Typography>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  component="img"
                  image={require('./images/working.svg')}
                  title="sign up"
                />
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item 
          className={classes.gridItem} 
          xs={3}
          >
          <Typography className={classes.stepTitle}>Connect</Typography>
          <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                className={classes.media}
                  component="img"
                  image={require('./images/connect.svg')}
                  title="connect"
                />
              </CardActionArea>
            </Card >
          </Grid>
          <Grid item className={classes.gridItem} xs={3}>
          <Typography className={classes.stepTitle}>Meet and Learn</Typography>
          <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  component="img"
                  image={require('./images/conversation.svg')}
                  title="meet and learn"
                />
               
              </CardActionArea>
     
            </Card>
          </Grid>
        </Grid>
      </Container>
    );
  }