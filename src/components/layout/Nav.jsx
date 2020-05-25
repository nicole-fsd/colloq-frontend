import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom'
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { logoutUser } from "../../data/user";
import { useDispatch } from "react-redux";


  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    logo: {
      flexGrow: 1,
      marginLeft: "10%",
      color: "white",
      
    },
    link: {
      textDecoration: "none",
      color: "white"
    },
    title: {
      flexGrow: 1,
    },
    appbar: {
      backgroundColor: "#ff7043"
    },
    accountCircle: {
      color: "white",
     
      fontSize: "50px"
    },
    iconButton: {
      marginRight: "20vw",
    }
  }));

export default function Nav() {
    const dispatch = useDispatch()
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const menuId = 'primary-search-account-menu';

    const handleMenuClose = () => {
      setAnchorEl(null);
    };

    const handleLogOut = () => {
      setAnchorEl(null);
      dispatch(logoutUser())
    };

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem component={Link} to={"/search"}>Search</MenuItem>
        <MenuItem onClick={handleLogOut}>Log out</MenuItem>
        
      </Menu>
    );

    const handleProfileMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };

    return (
        <div className={classes.root}>
        <AppBar className={classes.appbar} position="static">
            <Toolbar className={classes.toolbar}>
            <Typography variant="h2" className={classes.logo}>
            <Link className={classes.link} to="/">Colloq </Link>
            </Typography>
            <IconButton
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              className={classes.iconButton}
            >
              <AccountCircle className={classes.accountCircle} fontSize="large"/>
            </IconButton>
            </Toolbar>
        </AppBar>
        {renderMenu}
        </div>
  );
}





