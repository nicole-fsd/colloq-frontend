import React, {useState} from 'react'
import { Container } from '@material-ui/core'
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#65499c",
        justifyContent: "center",
        alignItems: "center",
        display: 'flex',
        height: "100vh"
    },
  }));


export default function Search() {
    const classes = useStyles();
    const [searchInput, setSearchInput] = useState("")

    return (
        
        <Container disableGutters maxWidth="xl" className={classes.root}>
        <div>
            
        
            
          </div>
        </Container>
    )
}