import React, {useState, useEffect} from "react";
// import { Redirect, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Container , Paper, Grid, Typography, Button, TextField} from '@material-ui/core';
import Footer from '../components/landing/Footer'
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from 'react-router-dom'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import DeleteIcon from '@material-ui/icons/Delete';
import ListSubheader from '@material-ui/core/ListSubheader';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import IconButton from '@material-ui/core/IconButton';
import { getMessages } from "../data/messages";
import CloseIcon from '@material-ui/icons/Close';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "gray"
      },
      paper: {
        padding: theme.spacing(5),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        backgroundColor: "#eeeeee",
        height: "90vh",
        width: "70vw",
        margin: "30px"
      },
      listitem: {
          borderBottom: ".5px solid gray"
      },
      menu: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper, 
      }
  }));

export default function MessagesOverview() {
    const classes = useStyles()
    const dispatch = useDispatch();
    const userFirstName = useSelector((state) => state.auth.user.firstName);
    const userAge = useSelector((state) => state.auth.user.age);
    const userId = useSelector((state) => state.auth.user.id);
    const messages = useSelector((state) => state.messages.messages);
    const [dense, setDense] = useState(false);
    const [secondary, setSecondary] = useState(false);
    const [open, setOpen] = useState(true);
    const [openModal, setOpenModal] = useState(true);
    const [modalStyle] = useState(getModalStyle);


  const handleClick = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLiClick = (id) => {
    setOpenModal(true);
  }

  const handleLiClose = () => {
    setOpenModal(false);
  };

  function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  
  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }


      useEffect(() => {
        dispatch(getMessages(userId));
      }, [])

      function handleMessageDelete(e) {
        console.log('handlemessagedelete:' + e.target.parentNode.parentNode)
      }

      // const handleMessageDelete = (id) => {
      //   axios.delete(`${process.env.REACT_APP_ENDPOINT}/messages/${id}`, {
      //     headers: {
      //       Authorization: authorizationToken
      //     }
      //   });
      // }

      


      /////MODAL BODY/////////////////

      const body = (
        <div style={modalStyle} className={classes.paperModal}>
          <div className={classes.showDiv}>
          <h2 id="simple-modal-title"></h2>
          <IconButton aria-label="delete" className={classes.close} size="small" onClick={handleClose}>
              <CloseIcon fontSize="inherit" />
            </IconButton>
          </div>
          <div>
          <TextField variant="standard" margin="normal" required fullWidth id="subject" label="Subject" name="subject"/>
          <TextareaAutosize className={classes.textarea} aria-label="message textarea" required fullWidth rowsMin={8} id="text" label="Message" name="text"/>
          <Button className={classes.replyBtn} variant="contained" color="secondary">
            Reply
          </Button>
          </div>
        </div>
      );
    
    

    

  return (
    <div className={classes.root}>
        <Paper className={classes.paper} elevation={3}>
            <div className={classes.backDiv}>
                <Link className={classes.backLink} to='/dashboard'>Back to my profile</Link>
            </div>
            <Grid container>
                <Grid item xs={12} md={4}>
                    <List
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        className={classes.menu}
                        >
                        <ListItem button>
                            <ListItemIcon>
                            <SendIcon />
                            </ListItemIcon>
                            <ListItemText primary="Sent mail" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                            <DraftsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Drafts" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                            <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Inbox" /> 
                        </ListItem>
                        {/* <Collapse in={open} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                            <ListItem button className={classes.nested}>
                                <ListItemIcon>
                                <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary="Starred" />
                            </ListItem>
                        </List>
                    </Collapse> */}
                    </List>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Typography variant="h6" className={classes.title}>
                        Inbox
                    </Typography>
                    <div className={classes.inbox}>
                        <List dense={dense}>
                            {messages.length === 0 && <p>You have no messages</p>}
                            {messages.length > 0 &&
                                messages.map((message) => (
                                <ListItem className={classes.listitem} button="true" onClick={handleLiClick}>
                                {/* <ListItemAvatar>
                                    <Avatar>
                                    <FolderIcon />
                                    </Avatar>
                                </ListItemAvatar> */}
                                <ListItemText
                                    primary={message.messageAuthor.firstname + ' ' + message.messageAuthor.lastname}
                                    secondary={message.subject}
                                />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="delete" onClick={handleMessageDelete}>
                                    <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                    </div>
                </Grid>
            </Grid>
        </Paper>
      <Footer />
    </div>
  );
};