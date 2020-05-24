import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Container from '@material-ui/core/Container';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import tileData from './tileData';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignContent: "center"
  },
  gridList: {
    height: "100vh",
    width: "70vw",
    // border: "1px solid black",
    paddingTop: "60px"
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },

}));

export default function TitlebarGridList() {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <GridList spacing={60} cellHeight={250} className={classes.gridList}>
        {tileData.map((tile) => (
          <GridListTile key={tile.img}>
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
            />
          </GridListTile>
        ))}
      </GridList>
    </Container>
  );
}