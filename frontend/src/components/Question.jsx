import { Button, IconButton, makeStyles, Typography, TextField, form, Avatar } from '@material-ui/core'
import React, { useEffect, useContext, useState, useRef } from 'react'
import { Link } from 'react-router-dom';
import { ThumbUp } from '@material-ui/icons';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import axios from 'axios';
import { Context } from '../context/Context';
import DeleteIcon from '@mui/icons-material/Delete';
const useStyle = makeStyles((theme) => ({

    gridStyle: {
        height: "100%",
        backgroundColor: "#c0fcff",
        display: "flex",
        flexDirection: "column",
        margin: theme.spacing(1),
        borderRadius: "10px",
    },
    grpStyle: {
        display: "flex",
        margin: theme.spacing(2),
        marginBottom: theme.spacing(0),

    },
    nameStyle: {
        fontSize: "15px",
        fontWeight: "500"
    },
    expertiseStyle: {
        fontSize: "15px"
    },
    grp1Style: {
        marginLeft: theme.spacing(1),
    },
    grp2Style: {
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(1),
    },
    singleContainerStyle: {
        display: "flex",
        flexDirection: "column",
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
    articleImgdivStyle: {
        display: "flex",
        justifyContent: "center",
    },
    articleImg: {
        width: "40%",
    },
    commentedStyle: {
        color: "grey",
        paddingLeft: theme.spacing(1),
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
    textFieldStyle: {
        margin: theme.spacing(2),
        width: "80%"
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
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(1)
    },
    deleteIconStyle: {
        fontSize: "15px",
        display: "flex",
        justifyContent: "right",
    }

}))
export default function Question({ post }) {
    const classes = useStyle();
    const [like, setLike] = useState(post.likes.length)
    const [comment, setComment] = useState(post.comments.length)
    const [isLiked, setIsLiked] = useState(false);
    const [postUsername, setPostUsername] = useState("")
    const [postUserPp, setPostUserPp] = useState("")
    const [postExpertiseLevel, setPostExpertiseLevel] = useState("");
    const [commentList, setCommentList] = useState([]);
    const replyRef = useRef();
    const { user, jsonwebtoken } = useContext(Context);
    const [showComments, setShowComments] = useState(false);
    useEffect(() => {
        if (user !== null) {
            setIsLiked(post.likes.includes(user._id));
        }
    }, [])

    useEffect(() => {
        const getPostUserDet = async () => {
            try {
                // console.log(post.userId)
                const res = await axios.get("/user/" + post.userId)
                // console.log(res);
                setPostUsername(res.data.username);
                setPostExpertiseLevel(res.data.expertiseLevel)
                setPostUserPp(res.data.profilePic)
            } catch (err) { }
        }
        getPostUserDet();
    }, [])

    const likeHandler = async (req, res) => {
        try {
            const res = await axios.put("/post/" + post._id + "/like",
                { userId: user._id }
            )
            // console.log(res.data)
            if (res.data === "The post has been disliked") {
                setIsLiked(false);
                setLike(like - 1)
            }
            else {
                setIsLiked(true);
                setLike(like + 1);
            }
            // console.log(like)
        } catch (err) {
        }
    }


    const handleShowCommentBtn = async () => {
        try {
            await setShowComments(!showComments);
            const res = await axios.get("/comments/?id=" + post._id)
            setCommentList(res.data);
        } catch (err) { }
    }


    const handleCreateComment = async (e) => {
        e.preventDefault();
        const newComment = new FormData();
        newComment.append("postId", post._id)
        newComment.append("reply", replyRef.current.value)
        newComment.append("username", user.username);
        // console.log(replyRef.current.value)
        // console.log(user)
        try {
            const res = await axios.post("/comments/" + post._id + "/comment", newComment,
                {
                    headers: { Authorization: `Bearer ${jsonwebtoken}` }
                },
            )
            setCommentList([...commentList.concat(res.data)]);
            setComment(comment + 1)
            e.target.reset();
            // console.log(commentList)
        } catch (err) { }
    }

    const handleDeleteComment = (cid) => {
        const handleDeleteCommentActual = async () => {
            try {
                await axios.delete("/comments/" + cid,
                    {
                        headers: { Authorization: `Bearer ${jsonwebtoken}` }
                    },
                )
                const res = await axios.get("/comments/?id=" + post._id)
                setCommentList(res.data);
            } catch (err) { }
        }
        return handleDeleteCommentActual
    }
    return (
        <div className={classes.gridStyle}>

            <div className={classes.grpStyle}>
                <div >
                    <Avatar src={postUserPp}
                        className={classes.ppStyle}
                    />
                </div>
                {postExpertiseLevel === "Expert" ? (
                    <div className={classes.grp1Style}>
                        <Typography className={classes.nameStyle}>{postUsername}</Typography>
                        <Typography className={classes.expertiseStyle}>{postExpertiseLevel}</Typography>
                    </div>
                ) :
                    <div className={classes.grp2Style}>
                        <Typography className={classes.nameStyle}>{postUsername}</Typography>
                    </div>
                }
            </div>

            <div className={classes.singleContainerStyle}>
                <div
                    className={classes.singleitemStyle}>
                    <Link to={`/post/${post._id}`} className={classes.linkStyle}>
                        <Typography variant="h5" className={classes.titleStyle}>
                            {post.title}
                        </Typography>
                    </Link>

                </div>
                <div className={classes.articleImgdivStyle}>
                    {post.image &&
                        // console.log(post._id.image)
                        <img className={classes.articleImg}
                            src={post.image}
                            alt="img"
                        />
                    }

                </div>
                <div className={classes.singleitemStyle}>
                    <Typography variant="h5" className={classes.questionStyle}>
                        {post.question}
                    </Typography>
                </div>
                <div className={classes.infoStyle1}>
                    <Typography  >
                        asked by
                        <span> {post.username} </span>
                        <span> on July 6, 2021</span>
                    </Typography>
                </div>

                <div className={classes.infoStyle2}>
                    {like > 1 ? (
                        <Typography  >
                            {like} Likes  {comment} reply
                        </Typography>) : (
                        <Typography className={classes.infoStyle2sub}>
                            {like} Like  {comment} reply

                        </Typography>
                    )}
                </div>
                <div className={classes.infoStyle3}>
                    <IconButton className={isLiked ? classes.likeStyle : classes.dislikeStyle} onClick={likeHandler}>
                        <ThumbUp />
                    </IconButton>
                    <IconButton onClick={handleShowCommentBtn}>
                        <ModeCommentIcon />
                    </IconButton>
                    {showComments ?
                        <div>
                            <form onSubmit={handleCreateComment}>
                                <TextField className={classes.textFieldStyle}
                                    placeholder="Add your comment"
                                    inputRef={replyRef}
                                >
                                </TextField>
                                <br />
                                <br />
                                <Button variant="contained" className={classes.btnPostStyle} type="submit">Post</Button>
                                {commentList.map(p => (
                                    <div className={classes.commentfullStyle}>
                                        <div className={classes.commentListStyle}>
                                            <div className={classes.nameCommentStyle}>{p.username}
                                            </div>
                                            < div >{p.reply}</  div>
                                        </div>
                                        <div className={classes.deleteIconStyle}>
                                            {(user.username === p.username) && (
                                                <IconButton >
                                                    <DeleteIcon
                                                        onClick={handleDeleteComment(p._id)}
                                                    />
                                                </IconButton>
                                            )}
                                        </div>
                                    </div>

                                ))}
                                <br />
                                <br />
                            </form>
                        </div>
                        : null
                    }
                </div>
            </div>
        </div >
    )
}
