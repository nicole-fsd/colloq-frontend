import React, {useState} from 'react'
import { Grid, CardHeader} from '@material-ui/core'
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

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#E1E2E1",
        alignItems: "center",
        display: 'flex',
        flexDirection: 'column',
        height: "100vh",
    },
    // card: {
      
    //   margin: 10
    // },
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
        width: '1200px',
        marginTop: '10rem'
      
      },
      searchBtn: {
        marginTop: '5em'
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
        width: 151,
      },
      type: {
        color: "secondary"
      },
      gridroot: {
        flexGrow: 1,
        padding: theme.spacing(8)
    },
    grid: {
      padding: 50
    }
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
        const first = users[i]
        const value = first[Object.keys(first)[0]]
        var lastChar = value.substr(value.length - 1)
        // console.log('lastchar:' + lastChar)
        idArray.push(lastChar)
      }
      // const firstObj = users[1]
        
    
    

    const handleSearchFormSubmit = (e) => {
      e.preventDefault();
      dispatch(getUsers())
      console.log('handlesearchformsub')
    }

    const handleChange = (e) => {
      setSearchInput(e.target.value)
    }

    return (
        
        // <Container disableGutters maxWidth="xl" className={classes.root}>
        <>
        <div className={classes.root}>
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
                    Submit
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
                
            >
                {users.map((user, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Card>
                            <CardHeader
                                title={user.email}
                                subheader={user.id}
                            />
                            <CardContent>
                            <Link to={`/profile/${idArray[index]}`}>View Profile</Link>
                            
                            </CardContent>
                        </Card>
                     </Grid>
                ))}
            </Grid>
        </div> 
        </>   
    )
}