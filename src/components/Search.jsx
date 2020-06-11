import React, {useState} from 'react'
import { Grid, CardHeader, Typography, Container, CardMedia} from '@material-ui/core'
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import Typography from '@material-ui/core/Typography';
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import { getUsers } from '../data/search';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#E1E2E1",
        alignItems: "center",
        display: 'flex',
        flexDirection: 'column',
        minHeight: "100vh",
    },
    container: {

    },
    search: {
      marginTop: '8rem',
      marginBottom: '8em',
        height: "6ch",
        position: 'relative',
        backgroundColor: fade(theme.palette.common.white, 0.25),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.35),
        },
        width: '80ch',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: 'auto',
        },
      },
      searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputRoot: {
        color: 'inherit',
        margin: '1ch'
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: '20ch',
        },
      gridList: {
        width: '800px',
        marginTop: '10rem'
      
      },
      searchBtn: {
        marginTop: '5em',
        display: "inline"
      },
      card: {
        display: 'flex',
        color: "#65499c"
      },
      details: {
        display: 'flex',
        flexDirection: 'column',
      },
      content: {
        flex: '1 0 auto',
      },
      cover: {
        height: "50px"
      },
      type: {
        color: "secondary"
      },
      gridroot: {
        flexGrow: 1,
        padding: theme.spacing(8)
    },
    grid: {
      padding: 50,
      width: 300,
    },
    linkText: {
      textDecoration: "none",
    },
   link: {
     textDecoration: "none"
   },
   backLink: {
    textDecoration: 'none',
    fontSize: '1rem'
  },
  backIcon: {
   verticalAlign: 'text-bottom',
   fontSize: '1.1rem' 
  },
  backDiv: {
    marginBottom: '1.8rem'
  },
    
   
    
  }
  }));


export default function Search() {
    const classes = useStyles();
    // const theme = useTheme();
    const [searchInput, setSearchInput] = useState("")
    const dispatch = useDispatch();
    const users = useSelector((state) => state.search.users);

    /// make array of user ids
      let i;
      let idArray = []

      for (i = 0; i < users.length; i++) {
      const firstObj = users[i]
      const value = firstObj[Object.keys(firstObj)[0]]
      var n = value.lastIndexOf('/');
      var result = value.substring(n + 1);
      idArray.push(result)
      }

      // console.log(idArray)
      
    const handleSearchFormSubmit = (e) => {
      e.preventDefault();
      dispatch(getUsers(searchInput))
      console.log('handlesearchformsubmit')
    }

    const handleChange = (e) => {
      setSearchInput(e.target.value)
    }
    console.log(users)

    return (
        
        // <Container disableGutters maxWidth="xl" className={classes.root}>
        <>
        <div className={classes.root}>
          <Container maxWidth="xs">
        <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <form onSubmit={handleSearchFormSubmit}>
              <div>
              <InputBase
                placeholder="Search a city"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                onChange={handleChange}
                value={searchInput}
                />
              </div>
                
                <Button className={classes.searchBtn} type="submit" variant="contained" color="secondary">
                    Go
                </Button>
                
            </form>
            </div>

            
            <Grid
                container
                spacing={4}
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
                className={classes.grid}
                width={900}
                
            >
                {users.map((user, index) => (
                    <Grid item xs={12} key={index}>
                        <Card>
                        <CardMedia
                              className={classes.cover}
                              component="img"
                              src={`https://wdev.be/wdev_nicole/eindwerk/image.php?${user.images[0].filename}.jpg&width=200&height=200&&cropratio=4:3&image=/wdev_nicole/eindwerk/images/${user.images[0].filename}.jpg`}
                              title="profile photo"
                              height="220"
                              
                            />
                            <CardHeader
                                title={user.firstname + ' ' + user.lastname}
                                subheader={user.age}
                                // subheader={user.city}
                            />
                            <CardContent className={classes.cardContent}>
                              <Link className={classes.link} to={`/profile/${idArray[index]}`}>
                                <Typography className={classes.linkText}>View Profile</Typography>
                                </Link>
                            </CardContent>
                            
                        </Card>
                     </Grid>
                ))}
            </Grid>
            </Container>
        </div> 
        </>   
    )
}