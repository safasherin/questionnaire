import { Button, Grid, Paper, Typography, TextField, } from '@material-ui/core'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import { Context } from '../context/Context';
import { Box } from '@mui/system';
axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);


const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);



const useStyles = makeStyles((theme) => ({
    containerStyle: {
        marginTop: theme.spacing(3),
        display: "flex",
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column"
        }
    },
    paperStyle1: {
        backgroundColor: "#19efbd",
        height: "10rem",
        display: "flex",
        clipPath: " polygon(0 0, 100% 0, 60% 100%, 0% 100%)",
        alignItems: "center",
        justifyContent: "spaceAround",
    },
    paperStyle2: {
        backgroundColor: "#19efbd",
        height: "10rem",
        display: "flex",
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 48% 100%)",
        alignItems: "center",
        justifyContent: "end",
    },

    itemStyle: {
        textAlign: "center",
        flex: 1,
        margin: "10px"
    },
    btnStyle1: {
        backgroundColor: "#f1f133",
        marginLeft: "59px",
        cursor: "pointer",
        fontSize: "15px",
        fontWeight: "800",
        '&:hover': {
            backgroundColor: "#bea8ff"
        },
    },
    btnStyle2: {
        backgroundColor: "#f1f133",
        marginRight: "59px",
        cursor: "pointer",
        fontSize: "15px",
        fontWeight: "800",
        '&:hover': {
            backgroundColor: "#bea8ff"
        },
    },
    typographyStyleQ: {
        paddingTop: theme.spacing(9),
        paddingBottom: theme.spacing(7),
        letterSpacing: theme.spacing(0.5),
        textTransform: "uppercase",
        color: "white",
        textAlign: "center",
        fontSize: "150%",

    },
    typographyStyleA: {
        fontSize: "150%",
        paddingTop: theme.spacing(9),
        paddingBottom: theme.spacing(7),
        letterSpacing: theme.spacing(0.5),
        textTransform: "uppercase",
        color: "white",
        textAlign: "center"

    },
    questionField: {
        marginTop: "15px",

    },
    dividerStyle: {
        border: "5px solid #9ea0da",
        margin: "2px"
    },
    gridStyle: {
        border: "35px solid #9ea0da"
    },
    gridStyle2: {
        border: "35px solid #36f5c8"
    },
    buttonStyle1: {
        backgroundColor: "#9ea0da",
        margin: "10px",
        color: "white",
        '&:hover': {
            background: "blue",
        },
    },
    buttonStyle2: {
        backgroundColor: "#abf7ed",
        margin: "10px",
        color: "white",
        '&:hover': {
            background: "#36f5c8",
        },
    },
    titleStyle: {
        margin: "0 auto",

    },
    imageStyle: {
        cursor: "pointer",
        width: "60%",
        height: "50%",
        objectFit: "cover",
        marginLeft: "9px",
        marginBottom: "2%",
        marginTop: "2%"

    },
    imagetypographyStyle: {
        cursor: "pointer",
        marginTop: theme.spacing(4),
        fontSize: "25px"

    },
    labelStyle: {
        marginTop: theme.spacing(4),
        fontSize: "25px"
    },
    boxStyle: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        border: "1px solid #cacad5",
        width: "100%",
        minHeight: "3rem",
        color: "black",
        borderRadius: "2%"
    },
    ulStyle: {
        listStyle: "none",
        display: "flex",
    },
    liStyle: {
        marginRight: theme.spacing(2),
        fontSize: "25px",
        backgroundColor: "pink"
    },
    tfStyle: {
        width: "100%",
    }
}))

export default function QuestionBoard() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [state, setState] = useState("initial");
    const [announcementState, setAnnouncementState] = useState("initial");
    const { user, jsonwebtoken } = useContext(Context);
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");
    const [question, setQuestion] = useState("");
    const [tags, setTags] = useState([]);
    let [allUsernames, setAllUsernames] = useState([])
    let [searchName, setSearchName] = useState("")
    let [dd, setdd] = useState(false)
    const announcementTitleRef = useRef()
    const detailsRef = useRef()
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen2 = () => {
        setOpen2(true);
    }
    const handleClose2 = () => {
        setOpen2(false);
    }

    const addTags = (event) => {
        if (event.key === "Enter" && event.target.value !== "") {
            // console.log("tag")
            // console.log(event)
            setTags([...tags, event.target.value]);
            // console.log(event.target.value)
            // console.log(tags)
            event.target.value = ""
        }
    }

    const removeTags = indexToRemove => {
        setTags([...tags.filter((_, index) => index !== indexToRemove)]);
    };




    const getAllUsernames = async () => {
        try {
            const res = await axios.get("/user/")
            let usernames = [];
            res.data.map((item) => {
                usernames.push(item.username)
            })
            setAllUsernames(usernames)
        } catch (err) { }


    }

    useEffect(() => {
        getAllUsernames()
    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault();
        setState("sending");
        const newPost = new FormData();
        newPost.append("title", title)
        newPost.append("username", user.username)
        newPost.append("question", question)
        newPost.append("userId", user._id)
        // console.log(JSON.stringify(newPost))
        if (file) {
            newPost.append("image", file)
        }
        try {
            const res = await axios.post("/post/add", newPost,
                {
                    headers: {
                        Authorization: `Bearer ${jsonwebtoken}`
                    }
                });
            setState("successful");
            window.location.replace("/post/" + res.data._id);
        } catch (err) {
            setState("Unsuccessful");
        };
    }

    const handleSubmit2 = async (e) => {
        e.preventDefault();
        setAnnouncementState("sending");
        try {
            const newAnnouncement = new FormData()
            newAnnouncement.append("announcementTitle", announcementTitleRef.current.value)
            newAnnouncement.append("details", detailsRef.current.value)
            newAnnouncement.append("username", user.username)
            newAnnouncement.append("userId", user._id)
            // console.log(body)
            const res = await axios.post("/announcement/add",
                newAnnouncement,
                {
                    headers: {
                        Authorization: `Bearer ${jsonwebtoken}`
                    }
                }
            );
            // console.log(res)
            setAnnouncementState("successful");
            window.location.replace("/announcement/" + res.data._id);
        } catch (err) {
            // console.log(setAnnouncementState)
            setAnnouncementState("Unsuccessful");
        };
    }

    return (
        <div>
            <Grid container className={classes.containerStyle}>
                <Grid item
                    className={classes.itemStyle}>
                    <Paper
                        variant="h3"
                        className={classes.paperStyle1}
                    >

                        <Button variant="contained" className={classes.btnStyle1} onClick={handleClickOpen}>
                            Question Board
                        </Button>
                        <Dialog maxWidth="md" classes={{ paper: classes.gridStyle }} onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                            <DialogTitle className={classes.titleStyle} id="customized-dialog-title" onClose={handleClose}>
                                Create Post
                            </DialogTitle>
                            <form onSubmit={handleSubmit}>
                                <DialogContent  >
                                    <TextField inputProps={{ style: { fontSize: 35, padding: 25 } }}
                                        InputLabelProps={{ style: { fontSize: 25, } }}
                                        multiline
                                        label="Title"
                                        fullWidth
                                        required
                                        variant="outlined"
                                        onChange={(e) => setTitle(e.target.value)}
                                    />

                                    <TextField
                                        label="Your Question Here...."
                                        multiline
                                        rows={20} className={classes.questionField}
                                        fullWidth
                                        required
                                        variant="outlined"
                                        onChange={(e) => setQuestion(e.target.value)}
                                    />
                                    <label htmlFor="inputFile">
                                        {file ? (
                                            <img
                                                src={URL.createObjectURL(file)}
                                                className={classes.imageStyle}
                                                alt=""
                                            />
                                        ) : (
                                            <Typography className={classes.imagetypographyStyle}> Click to upload picture</Typography>
                                        )}

                                    </label>
                                    <input type="file" id="inputFile"
                                        onChange={(e) => setFile(e.target.files[0])}
                                        style={{ display: "none" }}
                                    />
                                    <div className={classes.labelStyle}>
                                        <label htmlFor="inputTag">
                                            Tag People:
                                        </label>
                                    </div>
                                    <Box className={classes.boxStyle} >
                                        <ul className={classes.ulStyle}>
                                            {
                                                tags.map((tag, index) => (
                                                    <li key={index} className={classes.liStyle}>
                                                        <span>{tag}</span>
                                                        <IconButton onClick={() => removeTags(index)}><CloseIcon /></IconButton>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                        <span>
                                            <TextField id="standard-basic"
                                                placeholder="Name"
                                                className={classes.tfStyle}
                                                onChange={event => {
                                                    setSearchName(event.target.value)
                                                }}
                                                onKeyPress={addTags}
                                                onFocus={() => { setdd(true) }}
                                                onBlur={() => { setdd(false) }}
                                            />

                                            {dd && allUsernames.filter((username) => {
                                                if (searchName === " ") {
                                                    return username;
                                                } else if (username.toLowerCase().includes(searchName.toLowerCase())) {
                                                    return username;
                                                }
                                            }
                                            ).map((username, index) => (
                                                <div key={index}>
                                                    <Typography>{username}</Typography>
                                                </div>
                                            ))}
                                        </span>
                                    </Box>
                                </DialogContent>
                                {
                                    state !== "sending" && state !== "successful" && state !== "unsuccessful" &&
                                    <DialogActions>
                                        <Button
                                            type="submit" className={classes.buttonStyle1} variant="contained">
                                            Create Post
                                        </Button>
                                    </DialogActions>
                                }
                                {
                                    state === "successful" &&
                                    <div className="alert alert-success" role="alert">
                                        You have posted successfully!
                                    </div>
                                }
                                {
                                    state === "unsuccessful" &&
                                    <div className="alert alert-danger" role="alert">
                                        Please Fill Out every field
                                    </div>
                                }
                                {
                                    state === "sending" &&
                                    <p>Loading...</p>
                                }
                            </form>
                        </Dialog>
                    </Paper>
                </Grid>
                <Grid item
                    className={classes.itemStyle}>
                    <Paper
                        variant="h3"
                        className={classes.paperStyle2}
                    >
                        <Button variant="contained" className={classes.btnStyle2} onClick={handleClickOpen2}>
                            Announcements
                        </Button>


                        <Dialog maxWidth="md" classes={{ paper: classes.gridStyle2 }} onClose={handleClose2} aria-labelledby="customized-dialog-title" open={open2}>
                            <DialogTitle className={classes.titleStyle} id="customized-dialog-title" onClose={handleClose2}>
                                Announcement
                            </DialogTitle>
                            <form onSubmit={handleSubmit2}>
                                <DialogContent  >

                                    <TextField inputProps={{ style: { fontSize: 35, padding: 25 } }}
                                        InputLabelProps={{ style: { fontSize: 25, } }}
                                        multiline
                                        label="Title"
                                        fullWidth
                                        required
                                        variant="outlined"
                                        inputRef={announcementTitleRef}
                                    />
                                    <TextField
                                        label="Details..."
                                        multiline
                                        rows={20} className={classes.questionField}
                                        fullWidth
                                        required
                                        variant="outlined"
                                        inputRef={detailsRef}
                                    />

                                    <div className={classes.labelStyle}>
                                        <label htmlFor="inputTag">
                                            Tag People:
                                        </label>
                                    </div>
                                    <Box className={classes.boxStyle} >
                                        <ul className={classes.ulStyle}>
                                            {
                                                tags.map((tag, index) => (
                                                    <li key={index} className={classes.liStyle}>
                                                        <span>{tag}</span>
                                                        <IconButton onClick={() => removeTags(index)}><CloseIcon /></IconButton>
                                                    </li>
                                                ))
                                            }
                                        </ul>

                                        <span>
                                            <TextField id="standard-basic"
                                                placeholder="Name"
                                                className={classes.tfStyle}
                                                onChange={event => {
                                                    setSearchName(event.target.value)
                                                }}
                                                onKeyPress={addTags}
                                                onFocus={() => { setdd(true) }}
                                                onBlur={() => { setdd(false) }}

                                            />
                                            {dd && allUsernames.filter((username) => {
                                                if (searchName === " ") {
                                                    return username;
                                                } else if (username.toLowerCase().includes(searchName.toLowerCase())) {
                                                    return username;
                                                }
                                            }
                                            ).map((username, index) => (
                                                <div key={index}>
                                                    <Typography>{username}</Typography>
                                                </div>
                                            ))}

                                        </span>
                                    </Box>
                                </DialogContent>
                                {
                                    announcementState !== "sending" && announcementState !== "successful" && announcementState !== "unsuccessful" &&
                                    <DialogActions>
                                        <Button
                                            type="submit" className={classes.buttonStyle2} variant="contained">
                                            Create Announcement
                                        </Button>
                                    </DialogActions>
                                }

                                {
                                    announcementState === "successful" &&
                                    <div className="alert alert-success" role="alert">
                                        You have posted successfully!
                                    </div>
                                }

                                {
                                    announcementState === "unsuccessful" &&
                                    <div className="alert alert-danger" role="alert">
                                        Please Fill Out every field
                                    </div>
                                }

                                {
                                    announcementState === "sending" &&
                                    <p>Loading...</p>
                                }
                            </form>

                        </Dialog>
                    </Paper>
                </Grid>
            </Grid>
        </div >
    )
}
