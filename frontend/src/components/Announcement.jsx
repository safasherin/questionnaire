import { Avatar, Button, IconButton, makeStyles, TextField, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import DeleteIcon from '@material-ui/icons/Delete';

import axios from 'axios';
import { Context } from '../context/Context';


const useStyle = makeStyles((theme) => ({
    gridStyle: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#c0fcff",
        margin: theme.spacing(1),
        marginRight: "10px",
        borderRadius: "10px"

    },
    grpStyle: {
        display: "flex",
        margin: theme.spacing(2),
        marginBottom: theme.spacing(0),

    },
    grp1Style: {
        marginLeft: theme.spacing(1),
    },
    grp2Style: {
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(1),

    },
    nameStyle: {
        fontSize: "15px",
        fontWeight: "500"
    },
    expertiseStyle: {
        fontSize: "15px"
    },
    singleContainerStyle: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
    },
    singleitemStyleimg: {
        height: "200px",
        width: "350px",
    },
    titleStyle: {
        fontSize: "25px",
        fontWeight: "500",
        textAlign: "center",
        paddingBottom: theme.spacing(1),
        color: "black",
    },
    linkStyle: {
        textDecoration: "none",
    },
    questionStyle: {
        fontSize: "17px",
        padding: theme.spacing(1),
    },
    infoStyle1: {
        color: "grey",
        paddingLeft: theme.spacing(1),

    },
    infoStyle2: {
        color: "grey",
        fontSize: "10px",
        fontWeight: "500",
        paddingLeft: theme.spacing(1),
    },
    infoStyle2sub: {
        color: "#3e2d2d",
        fontWeight: "500",
    },
    infoStyle3: {
        marginBottom: theme.spacing(1),
    },
    likeStyle: {
        color: "blue",
    },
    dislikeStyle: {
        color: "rgba(0, 0, 0, 0.54)",
    },
    btnPostStyle: {
        backgroundColor: "cyan",
        color: "black",
        marginLeft: theme.spacing(2),
        marginBottom: theme.spacing(1)
    },
    textFieldStyle: {
        margin: theme.spacing(2),
        width: "80%"
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
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(1)
    },
    deleteIconStyle: {
        fontSize: "15px",
        display: "flex",
        justifyContent: "right",
    }

}))

export default function Announcement({ ant, socket }) {
    const classes = useStyle();
    const [antUsername, setAntUsername] = useState("")
    const [antUserPp, setAntUserPp] = useState("")
    const [antExpertiseLevel, setAntExpertiseLevel] = useState("")
    const [showAntComments, setShowAntComments] = useState(false);
    const [antCommentList, setAntCommentList] = useState([]);

    const [reply, setReply] = useState(ant.replies.length)
    const { user, jsonwebtoken } = useContext(Context);
    const replyAntRef = useRef();
    useEffect(() => {
        const getAntUserDet = async () => {
            try {
                // console.log(post.userId)
                const res = await axios.get("/user/" + ant.userId)
                // console.log(res);
                setAntUsername(res.data.username);
                setAntExpertiseLevel(res.data.expertiseLevel)
                setAntUserPp(res.data.profilePic)
            } catch (err) { }
        }
        getAntUserDet();
    }, [ant.userId]);

    const handleDeleteAntComment = (acid) => {
        const handleDeleteAntCommentActual = async () => {
            try {


                await axios.delete("/antComment/" + acid,
                    {
                        headers: { Authorization: `Bearer ${jsonwebtoken}` }

                    },
                )
                const res = await axios.get("/antComment/getall?id=" + ant._id)
                // console.log(res)
                setAntCommentList(res.data);
                setReply(reply - 1)
            } catch (err) { }
        }

        return handleDeleteAntCommentActual
    }


    const showCommentsBtn = async () => {
        try {
            await setShowAntComments(!showAntComments);
            // console.log("see")
            const replyComments = await axios.get("/antComment/getall?id=" + ant._id,);
            setAntCommentList(replyComments.data);
            // console.log(commentList)
        } catch (err) { }
    }

    const handleCreateAntComments = async (e) => {
        e.preventDefault();
        // console.log("d")
        const newAntComment = new FormData();
        newAntComment.append("replyAnt", replyAntRef.current.value);
        newAntComment.append("username", user.username);
        newAntComment.append("announcementId", ant._id);
        try {
            const replyAntComments = await axios.post("/antComment/" + ant._id + "/reply",
                newAntComment,
                {
                    headers: { Authorization: `Bearer ${jsonwebtoken}` }

                });
            setAntCommentList([...antCommentList.concat(replyAntComments.data)]);
            setReply(reply + 1)
            e.target.reset();
            //  console.log(antCommentList);
        } catch (err) { }
    }

    return (
        <div className={classes.gridStyle}>
            <div className={classes.grpStyle}>
                <div >
                    <Avatar src={antUserPp}
                        className={classes.ppStyle}
                    />
                </div>
                {antExpertiseLevel === "Expert" ? (
                    <div className={classes.grp1Style}>
                        <Typography className={classes.nameStyle}>{antUsername}</Typography>
                        <Typography className={classes.expertiseStyle}>{antExpertiseLevel}</Typography>
                    </div>
                ) :
                    <div className={classes.grp2Style}>
                        <Typography className={classes.nameStyle}>{antUsername}</Typography>
                    </div>
                }
            </div>
            <div className={classes.singleContainerStyle}>
                <div >
                    <Link to={`/announcement/${ant._id}`} className={classes.linkStyle}>
                        <Typography variant="h5" className={classes.titleStyle}>
                            {ant.announcementTitle}
                        </Typography>
                    </Link>
                </div>
                <div
                >
                    <Typography variant="h5" className={classes.questionStyle}>
                        {ant.details}
                    </Typography>
                </div>
                <div
                    className={classes.infoStyle1}>
                    <Typography  >
                        asked by
                        <span> {ant.username}</span>
                        <span> on July 6, 2021</span>
                    </Typography>
                </div>
                <div
                    className={classes.infoStyle2}>
                    <Typography className={classes.infoStyle2sub} >
                        {reply} reply
                    </Typography>
                </div>
                <div>
                    <IconButton >
                        <ModeCommentIcon onClick={showCommentsBtn} />
                    </IconButton>
                    {
                        showAntComments ?
                            (
                                <form onSubmit={handleCreateAntComments}>
                                    <TextField className={classes.textFieldStyle}
                                        fullWidth
                                        placeholder="Add your comment"
                                        inputRef={replyAntRef}
                                    >

                                    </TextField>
                                    <br />
                                    <br />
                                    <Button variant="contained" className={classes.btnPostStyle} type="submit">Post</Button>
                                    {antCommentList.map(p => (
                                        <div className={classes.commentfullStyle}>
                                            <div className={classes.commentListStyle}>
                                                <div className={classes.nameCommentStyle}>{p.username}
                                                </div>
                                                < div >{p.replyAnt}</  div>
                                            </div>
                                            {user &&
                                                <div className={classes.deleteIconStyle}>
                                                    {(user.username === p.username) && (
                                                        <IconButton >
                                                            <DeleteIcon
                                                                onClick={handleDeleteAntComment(p._id)}
                                                            />
                                                        </IconButton>
                                                    )}
                                                </div>
                                            }
                                        </div>

                                    ))}
                                    <br />
                                    <br />
                                    <hr />
                                </form>
                            ) :
                            null
                    }
                </div>
            </div>
        </div >
    )
}
