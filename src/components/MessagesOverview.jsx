import React, {useState, useEffect} from "react";
// import { Redirect, Route } from "react-router-dom";
import axios from 'axios'
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid, Typography, Button, TextField} from '@material-ui/core';
import Footer from '../components/landing/Footer'
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import { getMessages } from "../data/messages";
import CloseIcon from '@material-ui/icons/Close';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Modal from '@material-ui/core/Modal';
import { postUserMessage } from '../data/messages';

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
      paperModal: {
        position: 'absolute',
        width: 500,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
      listitem: {
          borderBottom: ".5px solid gray"
      },
      menu: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper, 
      },
      modalBtn: {
        margin: '5px'
      },
      textfield: {
        margin: '.5rem'
      },
      close: {
        display: 'inline',
        justifyContent: 'end'
      },
      sendDiv: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: "space-between"
  
      },
      textarea: {
        width: '100%',
        color: 'black',
        '&::placeholder': {
          fontFamily: "Arial"
        }
      },
      inputRoot: {
        color: 'black'
      }
  }));

export default function MessagesOverview() {
    const classes = useStyles()
    const dispatch = useDispatch();
    // const userFirstName = useSelector((state) => state.auth.user.firstName);
    // const userAge = useSelector((state) => state.auth.user.age);
    const userId = useSelector((state) => state.auth.user.id);
    const messages = useSelector((state) => state.messages.messages);
    // const [secondary, setSecondary] = useState(false);
    const [open, setOpen] = useState(false);
    const [openReply, setOpenReply] = useState(false);
    const [openModal, setOpenModal] = useState(true);
    const [messageId, setmessageId] = useState(0);
    const [currentMessage, setCurrentMessage] = useState(0);
    const [modalStyle] = useState(getModalStyle);
    const [subject, setSubject] = useState('');
    const [text, setText] = useState('');
    const authUserId = useSelector((state) => state.auth.user.id);
    const [recipientId, setRecipientId] = useState('');



  const handleOpen = messageId => () => {
    setOpen(!open);
    setmessageId(messageId);
    // setCurrentMessage(messages.filter(msg => Object.keys(msg).id === messageId))
    // setCurrentMessage(messages[0])
    setCurrentMessage(messages.find(ms => ms.id === messageId))
    // console.log('currentMessage:' + msg.id)
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleReplyClose = () => {
    setOpenReply(false);
  };

  // const handleLiClick = (id) => {
  //   setOpenModal(true);
  // }

  // const handleLiClose = () => {
  //   setOpenModal(false);
  // };

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
      }, [dispatch, userId])

      // function handleMessageDelete(e) {
      //   console.log('handlemessagedelete:' + e.target.parentNode.parentNode)
      // }

      const handleMessageDelete = id => () => {
        axios.delete(`${process.env.REACT_APP_ENDPOINT}/messages/${id}`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setOpen(false);
      }

      const handleMessageReply = () => {
        setRecipientId(currentMessage.messageAuthor.id)
        setOpen(false);
        setOpenReply(true);

      }

      const handleMessageReplySubmit = (e) => {
        e.preventDefault()
        console.log('form submit')
        dispatch(postUserMessage(subject, text, recipientId, authUserId))
        setOpenReply(false)
      }

      


      
/////REPLY BODY ///////////////////////
  const replyBody = (
    <div style={modalStyle} className={classes.paperModal}>
      <div className={classes.sendDiv}>
      <h2 id="simple-modal-title">Send Reply</h2>
      <IconButton aria-label="delete" className={classes.close} size="small" onClick={handleReplyClose}>
          <CloseIcon fontSize="inherit" />
        </IconButton>
      </div>
      
      <form method="POST" onSubmit={handleMessageReplySubmit}>
      <TextField variant="standard" margin="normal" required fullWidth id="subject" label="Subject" name="subject" value={subject}
        onChange={(e) => {
          setSubject(e.target.value);
        }}
      />
      {/* <TextField variant="standard" margin="normal" required fullWidth id="text" label="Message" name="text" value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      /> */}
      <TextareaAutosize className={classes.textarea} aria-label="message textarea" required fullWidth rowsMin={8} placeholder="Write a message..." id="text" label="Message" name="text" value={text}
        onChange={(e) => {
          setText(e.target.value);
        }} />
      <Button type="submit" className={classes.submitmsgBtn} variant="contained" color="secondary">
        Send
      </Button>
      </form>
    </div>
  );
  //////////////////////////////////////////
    
    

    

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
                        <List>
                            {messages.length === 0 && <p>You have no messages</p>}
                            {messages.length > 0 &&
                                messages.map((message, index) => (
                                <ListItem key={index} className={classes.listitem} button="true" onClick={handleOpen(message.id)}>
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
                                    <Typography>{message.createdAt.substring(0,10)}</Typography>
                                </ListItemSecondaryAction>
                               
                                </ListItem>
                            ))}
                             <Modal
                                  open={open}
                                  onClose={handleClose}
                                  aria-labelledby="simple-modal-title"
                                  aria-describedby="simple-modal-description"
                                >
                                   <div style={modalStyle} className={classes.paperModal}>
                                      <div className={classes.showDiv}>
                                      <h2 id="simple-modal-title"></h2>
                                      <IconButton aria-label="delete" className={classes.close} size="small" onClick={handleClose}>
                                          <CloseIcon fontSize="inherit" />
                                        </IconButton>
                                      </div>
                                      <div>
                                        <Typography variant="overline">
                                          Subject: 
                                        </Typography>
                                        <Typography
                                          paragraph={true}
                                          variant='h6'
                                        >
                                        {currentMessage.subject}
                                        </Typography>
                                      {/* <TextField
                                        className={classes.textfield}
                                        id="message-subject"
                                        label="Subject"
                                        defaultValue={currentMessage.subject}
                                        disabled
                                        fullWidth
                                        multiline
                                        variant="outlined"
                                      /> */}
                                      <TextField
                                        className={classes.textfield}
                                        id="message-text"
                                        label="Message"
                                        multiline
                                        fullWidth
                                        rows={4}
                                        InputProps={{
                                          classes:{
                                            root: classes.inputRoot,
                                            
                                          }
                                        }}
                                        defaultValue={currentMessage.text}
                                        disabled
                                        variant="outlined"
                                      />
                                      
                                      <Button className={classes.modalBtn} variant="contained" color="secondary" onClick={handleMessageReply}>
                                        Reply
                                      </Button>
                                      <Button className={classes.modalBtn} variant="contained" color="secondary" onClick={handleMessageDelete(currentMessage.id)}>
                                        Delete
                                      </Button>
                                      </div>
                                    </div>
                                </Modal>
                                <Modal
                                  open={openReply}
                                  onClose={handleReplyClose}
                                  aria-labelledby="simple-modal-title"
                                  aria-describedby="simple-modal-description"
                                >
                                  {replyBody}
                                </Modal>
                        </List>
                    </div>
                </Grid>
            </Grid>
        </Paper>
      <Footer />
    </div>
  );
};