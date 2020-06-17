import React from 'react';
import { Typography, Container, ListSubheader } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import profileData from './profileData';


const useStyles = makeStyles(theme => ({
  root: {
    padding: "2rem",
    minHeight: "1000px",
    // backgroundImage: `url(${Background})`,
    backgroundColor: "#ff7043",
    color: "white",
    display: 'flex',
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    justifyContent: "center",
    alignItems: "center"
  },
  gridList: {
    justifyContent: "center",
    width: 1200, 
  },
  heading: {
    paddingBottom: '1rem',
    marginBottom: "1.8rem",
    width: '60%',
    textAlign: 'center',
    lineHeight: '4rem'
  },
  grid: {
    justifyContent:"center"
  }
}));

  export default function Profiles() {
    const classes = useStyles();
   
   
    return (
      <div >
      <Container className={classes.root} disableGutters maxWidth="xl">
        <Typography className={classes.heading} variant="h3">Improve your speaking skills with users who want to meet YOU</Typography>
      <GridList spacing={50} cellHeight={300} className={classes.gridList}>
        {/* <GridListTile key="Subheader" cols={2} style={{ height: '150px', width: '100px', margin: "20px" }}> */}
          {/* <ListSubheader component="div">Improve your speaking skills with locals who want to meet YOU</ListSubheader> */}
        {/* </GridListTile> */}
        {profileData.map((tile) => (
          <GridListTile key={tile.img}>
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
            />
          </GridListTile>
        ))}
      </GridList>
      </Container>
      </div>
    );
  }