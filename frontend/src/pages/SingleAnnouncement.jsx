import { Button, Grid, IconButton, makeStyles, TextField, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useRef, useState } from 'react';
import NavBar from '../components/Navbar';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import { useLocation } from 'react-router';
import { Context } from '../context/Context';

import axios from 'axios';


const useStyle = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    containerfeedStyle: {
        width: "100%",
        height: "100%",
        // display: "flex"
    },
    feedPaperStyle: {
        backgroundColor: "#eaeaea",
        padding: theme.spacing(3),
        margin: "0 auto"


    },

    singleContainerStyle: {
        backgroundColor: "#caf9f9",
        // marginTop: theme.spacing(3),
        display: "flex",
        flexDirection: "column",
        padding: theme.spacing(3),
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
    },
    titleStyle: {
        fontSize: "25px",
        padding: theme.spacing(1),
        color: "black",
    },
    linkStyle: {
        textDecoration: "none",
    },
    questionStyle: {
        fontSize: "17px",
        padding: theme.spacing(1)

    },
    infoStyle: {
        color: "grey",
        padding: theme.spacing(1),
        paddingLeft: theme.spacing(2)
    },
    likeStyle: {
        color: "blue",
    },
    dislikeStyle: {
        color: "rgba(0, 0, 0, 0.54)",
    },
    articleImg: {
        height: "300px",
        borderRadius: "10px",
        width: "350px",
        position: "cover",
    },
    btnsStyle: {
        color: "red",

    },
    deleteStyle: {
        cursor: "pointer",
        color: "red"
    },
    updateStyle: {
        color: "green",
        cursor: "pointer"
    },
    commentedStylesingle: {

        color: "grey",
        paddingLeft: theme.spacing(1),
    },

    singleAntCmtButton: {
        backgroundColor: "#3ec3ff",
        color: "black",
        "&:hover": {
            backgroundColor: "#3ec3ff",
            color: "white"
        }
    },
    textFieldStyle: {
        margin: theme.spacing(2),
        width: "80%"
        // paddingRight: theme.spacing(2),
    },
    btnPostStyle: {
        backgroundColor: "cyan",
        color: "black",
        marginLeft: theme.spacing(2),
        marginBottom: theme.spacing(1)
    },
    commentfullStyle: {
        display: "flex",
        justifyContent: "space-between",
    },
    commentListStyle: {
        display: "flex",
        alignItems: "center",
        textAlign: "start",
    },
    nameCommentStyle: {
        fontSize: "15px",
        fontWeight: "600",
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1)
    },
    deleteIconStyle: {
        fontSize: "15px",
        display: "flex",
        justifyContent: "right",
        // alignItems: "right"
    }
}))

export default function SingleAnnouncement() {
    const classes = useStyle();
    const location = useLocation();
    // console.log(location);
    const path = (location.pathname.split('/')[2]);
    const [updateMode, setUpdateMode] = useState(false);
    const [announcement, setAnnouncement] = useState({})
    const [announcementTitle, setAnnouncementTitle] = useState("");
    const [details, setDetails] = useState("");
    const { user, jsonwebtoken } = useContext(Context);
    const [showAnnComments, setShowAnnComments] = useState(false);
    const [commentList, setCommentList] = useState([])
    const [commentLength, setCommentLength] = useState([])
    const replyAnnRef = useRef();
    useEffect(() => {
        const getAnnouncement = async () => {
            try {
                const res = await axios.get("/announcement/" + path);
                setAnnouncement(res.data);
                // console.log(res.data)
                setCommentLength(res.data.replies.length)
            } catch (err) { }

        }

        getAnnouncement();
        // console.log(user._id);
        // console.log(announcement)

    }, []);



    const handleUpdate = async () => {
        const updatedAnnouncement = new FormData();
        updatedAnnouncement.username = user.username;
        if (announcementTitle) {
            updatedAnnouncement.append("announcementTitle", announcementTitle)
        }
        if (details) {
            updatedAnnouncement.append("details", details)

        }

        try {
            await axios.put("/announcement/" + announcement._id,
                updatedAnnouncement,

                {
                    headers: { Authorization: `Bearer ${jsonwebtoken}` }
                }

            )
            // console.log(resSubmit)
            window.location.reload();
        } catch (err) {

        }
    }




    const handleDelete = async () => {
        try {
            const resDelete = await axios.delete("/announcement/" + announcement._id,
                {
                    headers: { Authorization: `Bearer ${jsonwebtoken}` }

                },

            )
            window.location.replace("/");
        } catch (err) {

        }
    }

    const showCommentsBtn = async () => {
        try {
            await setShowAnnComments(!showAnnComments);

            const resreplyComm = await axios.get("/antComment/getall?id=" + announcement._id);
            setCommentList(resreplyComm.data);
            // console.log(resreplyComm.data)
            // console.log(commentList)


        } catch (err) { }

    }



    const createComment = async (e) => {
        e.preventDefault();
        // console.log("svdhgsaf");
        // console.log(replyRef.current.value)
        // console.log(announcement._id)
        const newAntComment = new FormData();
        newAntComment.append("replyAnt", replyAnnRef.current.value);
        newAntComment.append("username", user.username);
        newAntComment.append("announcementId", announcement._id);
        try {
            const resComment = await axios.post("/antComment/" + announcement._id + "/reply",
                newAntComment,
                {
                    headers: { Authorization: `Bearer ${jsonwebtoken}` }

                },
            )
            setCommentList([...commentList.concat(resComment.data)])
            // handleNotification(3)
            setCommentLength(commentLength + 1);
            // console.log(commentList)

            e.target.reset();

        } catch (err) { }
    }


    const handleDeleteAntComment = (acid) => {
        const handleDeleteAntCommentActual = async () => {
            try {


                await axios.delete("/antComment/" + acid,
                    {
                        headers: { Authorization: `Bearer ${jsonwebtoken}` }

                    },
                )
                const res = await axios.get("/antComment/getall?id=" + announcement._id)
                // console.log(res)
                setCommentList(res.data);
                setCommentLength(commentLength - 1);

            } catch (err) { }
        }

        return handleDeleteAntCommentActual
    }



    return (
        <div>
            <NavBar />
            <Grid container className={classes.singleContainerStyle}>
                <Grid item className={classes.singleitemStyle}>
                    {updateMode ? (
                        <TextField
                            defaultValue={announcement.announcementTitle}

                            label="Title"
                            multiline
                            maxRows={4}

                            fullWidth
                            onChange={(e) => setAnnouncementTitle(e.target.value)}
                        />
                    ) :

                        (



                            <Typography variant="h5" className={classes.titleStyle}>
                                {announcement.announcementTitle}
                            </Typography>
                        )}
                </Grid>
                <Grid item className={classes.singleitemStyle}>
                    {updateMode ? (
                        <TextField
                            defaultValue={announcement.details}
                            label="Details"
                            multiline
                            maxRows={10}
                            fullWidth
                            onChange={(e) => setDetails(e.target.value)}
                        ></TextField>
                    ) : (
                        <Typography variant="h5" className={classes.questionStyle}>
                            {announcement.details}

                        </Typography>
                    )}
                </Grid>
                <Grid item className={classes.infoStyle}>

                    <Typography variant="h7" >
                        asked by

                        <span> {announcement.username} </span>
                        on July 6, 2021
                    </Typography>
                </Grid>
                <Grid item className={classes.infoStyle}>
                    <Typography variant="h7" >
                        {/* 50 views  {like} Likes  {comment} reply */}
                        {commentLength} reply
                    </Typography>
                </Grid>
                <Grid item>
                    {updateMode ? (
                        null
                    ) : (
                        <IconButton
                            onClick={showCommentsBtn}
                        >
                            <ModeCommentIcon />
                        </IconButton>
                    )}

                </Grid>
                <Grid item>
                    {showAnnComments ?
                        <div>


                            <form onSubmit={createComment}>
                                <TextField className={classes.textFieldStyle}

                                    placeholder="Add your comment"
                                    inputRef={replyAnnRef}
                                >

                                </TextField>
                                <br />
                                <br />
                                <Button type="submit" variant="contained"
                                    className={classes.btnPostStyle}>Create comment</Button>
                                {commentList.map(p => (
                                    <div className={classes.commentfullStyle}>
                                        <div className={classes.commentListStyle}>


                                            <div className={classes.nameCommentStyle}>{p.username}
                                                {/* <span className={classes.commentedStylesingle}>  commented: </span> */}
                                            </div>
                                            < div >{p.replyAnt}</  div>
                                        </div>
                                        <div className={classes.deleteIconStyle}>
                                            {(user.username === p.username) && (
                                                <IconButton >
                                                    <DeleteIcon
                                                        onClick={handleDeleteAntComment(p._id)}
                                                    />
                                                </IconButton>
                                            )}
                                        </div>
                                    </div>

                                ))}
                                <br />
                                <br />
                                {/* <hr /> */}
                            </form>
                        </div>
                        : null
                    }

                </Grid>


                <Grid item>
                    {
                        updateMode ? (
                            <Grid item>

                                <Button className={classes.singleAntCmtButton}
                                    onClick={handleUpdate}
                                >
                                    Update
                                </Button>

                            </Grid>
                        ) : (
                            <Grid item>
                                {user ?
                                    (
                                        (announcement.userId === user._id) && (
                                            <div>
                                                <ModeEditIcon className={classes.updateStyle} onClick={() => setUpdateMode(true)} />
                                                <DeleteIcon className={classes.deleteStyle} onClick={() => handleDelete()} />
                                            </div>
                                        )
                                    )
                                    : null
                                }

                            </Grid>
                        )
                    }


                </Grid>
            </Grid>

        </div>
    )
}