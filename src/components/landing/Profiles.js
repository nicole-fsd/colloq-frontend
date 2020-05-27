import React from 'react';
import { Typography, Container } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import profileData from './profileData';


const useStyles = makeStyles(theme => ({
  root: {
    padding: "400px",
    minHeight: "800px",
    // backgroundImage: `url(${Background})`,
    backgroundColor: "#ff7043",
    color: "white",
    justify: "center",
    alignItems: "center"
  },
  container: {
    justify: "center",
    alignItems: "center"
  },
  gridList: {
    justifySelf: "center",
    width: 1200,
    
  },
  grid: {
    justify:"center"
  }
}));

  export default function Profiles() {
    const classes = useStyles();
   
   
    return (
      <div >
      <Container className={classes.root} disableGutters maxWidth="xl">
        <Typography className={classes.heading} variant="h3"></Typography>
      <GridList spacing={40} cellHeight={300} className={classes.gridList}>
        {/* <GridListTile key="Subheader" cols={2} style={{ height: '150px', width: '100px', margin: "20px" }}>
          <ListSubheader component="div">Improve your speaking skills with locals who want to meet YOU</ListSubheader>
        </GridListTile> */}
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