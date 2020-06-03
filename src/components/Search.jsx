import React, {useState} from 'react'
import { Container } from '@material-ui/core'
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import {useDispatch, useSelector} from 'react-redux'
import { getUsers } from '../data/search';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#65499c",
        justifyContent: "center",
        alignItems: "center",
        display: 'flex',
        height: "100vh"
    },
    search: {
        height: "7ch",
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
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: '20ch',
        },
    }
  }));


export default function Search() {
    const classes = useStyles();
    const [searchInput, setSearchInput] = useState("")
    const dispatch = useDispatch();
    const users = useSelector((state) => state.search.users);

    const handleSearchFormSubmit = (e) => {
      e.preventDefault();
      dispatch(getUsers())
      console.log('handlesearchformsub')
    }

    const handleChange = (e) => {
      setSearchInput(e.target.value)
    }

    return (
        
        <Container disableGutters maxWidth="xl" className={classes.root}>
        <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <form onSubmit={handleSearchFormSubmit}>
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
                <Button type="submit" variant="contained" color="secondary">
                    Submit
                </Button>
            </form>
            <div>
                {users.map((user) => (
                  <li>{user.email}</li>
                ))}
            </div>
            
          </div>
        </Container>
    )
}