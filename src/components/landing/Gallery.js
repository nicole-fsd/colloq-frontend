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
    alignContent: "center",
    marginBottom: '1rem'
  },
  gridList: {
    minHeight: "100vh",
    width: "70vw",
    // border: "1px solid black",
    paddingTop: "60px",
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      spacing: '0'
    },
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  gridListTile: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      
    },
  }

}));

export default function TitlebarGridList() {
  const classes = useStyles();

  const spacing = window.innerWidth < 800 ? 10 : 60;

  return (
    <Container className={classes.root}>
      <GridList spacing={spacing} cellHeight={250} className={classes.gridList}>
        {tileData.map((tile) => (
          <GridListTile className={classes.gridListTile} xs={12} key={tile.img}>
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