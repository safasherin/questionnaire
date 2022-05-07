import { Button, IconButton, makeStyles, Typography, TextField, form } from '@material-ui/core'
import React, { useEffect, useContext, useState, useRef } from 'react'
import { ThumbUp } from '@material-ui/icons';
import { useLocation } from 'react-router-dom'
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import axios from 'axios';
import { Context } from '../context/Context';
import Navbar from '../components/Navbar';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

const useStyle = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    containerfeedStyle: {
        width: "100%",
        height: "100%",
    },
    feedPaperStyle: {
        backgroundColor: "#eaeaea",
        padding: theme.spacing(3),
        margin: "0 auto"


    },
    commentedStylesingle: {

        color: "grey",
        paddingLeft: theme.spacing(1),
    },
    singleContainerStyle: {
        marginTop: "100px",
        display: "flex",
        flexDirection: "column",
        padding: theme.spacing(3),
        justifyContent: "center",
        alignItems: "center",
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
    },
    likeStyle: {
        color: "blue",
    },
    dislikeStyle: {
        color: "rgba(0, 0, 0, 0.54)",
    },
    articleImg: {
        width: "100%",
        // height: "50%",
        paddingTop: theme.spacing(3),

        position: "cover",
    },
    btnsStyle: {
        // display: "flex",
        // justifyContent: "space-between",
        // width: "100%",
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
    textFormStyle: {
        marginLeft: theme.spacing(6),
        backgroundColor: "cyan"

    },
    // textFieldStyle: {
    //     paddingBottom: theme.spacing(2)
    // },
    singlePostButton: {
        backgroundColor: "cyan",
        marginTop: theme.spacing(1),

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


export default function SingleQuestion() {
    const classes = useStyle();
    const location = useLocation();
    const path = (location.pathname.split('/')[2]);
    // console.log(path)
    const [post, setPost] = useState({});

    const [likeLength, setLikeLength] = useState([])
    const [commentLength, setCommentLength] = useState([])
    const [isLiked, setIsLiked] = useState(false);
    const { user, jsonwebtoken } = useContext(Context);
    const [title, setTitle] = useState(null)
    const [question, setQuestion] = useState(null)
    const [file, setFile] = useState(null)
    const [updateMode, setUpdateMode] = useState(false)
    const [showComments, setShowComments] = useState(false);
    const [commentList, setCommentList] = useState([]);
    const replyRef = useRef();

    useEffect(() => {
        const getPost = async () => {
            try {
                const res = await axios.get("/post/" + path);
                setPost(res.data);
                setIsLiked(res.data.likes.includes(user._id))
                setLikeLength(res.data.likes.length)
                setCommentLength(res.data.comments.length)
                // console.log(res.data);
                // console.log(res.data)
                // console.log(post.question)
                // console.log(user)
            } catch (err) { }
        }
        getPost();

    }, []);



    const likeHandler = async (req, res) => {
        try {

            const res = await axios.put("/post/" + post._id + "/like",

                { userId: user._id }


            )
            // console.log(res.data)
            if (res.data === "The post has been disliked") {
                setIsLiked(false);
                setLikeLength(likeLength - 1)
            }
            else {
                setIsLiked(true);
                setLikeLength(likeLength + 1);
            }
            // console.log(like)

        } catch (err) {

        }


    }



    const handleDeletePost = async () => {
        try {
            await axios.delete("/post/" + post._id, {
                headers: { Authorization: `Bearer ${jsonwebtoken}` }
            }

            );
            window.location.replace("/");
        } catch (err) { }
    };


    const showCommentsBtn = async () => {
        try {
            await setShowComments(!showComments);
            // console.log("s")
            const res = await axios.get("/comments/?id=" + post._id)
            // console.log(res.data);
            setCommentList(res.data);
            // console.log(commentList);
            // console.log(res.data._id);

        } catch (err) { }

    }

    const handleUpdate = async () => {

        const updatedPost = new FormData();
        updatedPost.append("username", user.username)
        if (title) {
            updatedPost.append("title", title)
        }
        if (question) {
            updatedPost.append("question", question)

        }
        if (file) {
            updatedPost.append("image", file)

        }
        // console.log(title, question)

        try {

            await axios.put("/post/" + post._id, updatedPost,
                {
                    headers: { Authorization: `Bearer ${jsonwebtoken}` }
                }
            );
            // console.log(res)
            window.location.reload();
        } catch (err) { }
    };
    const handleCreateComment = async (e) => {
        e.preventDefault();
        const newComment = new FormData();
        newComment.append("postId", post._id)
        newComment.append("reply", replyRef.current.value)
        newComment.append("username", user.username);
        // console.log(post._id)


        try {
            const res = await axios.post("/comments/" + post._id + "/comment", newComment,
                {
                    headers: { Authorization: `Bearer ${jsonwebtoken}` }

                },

            )
            setCommentList([...commentList.concat(res.data)]);
            e.target.reset();
            console.log(commentList);
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
                // console.log(res)
                setCommentList(res.data);
            } catch (err) { }
        }

        return handleDeleteCommentActual
    }


    return (


        <div>

            <Navbar />
            <div className={classes.singleContainerStyle}>
                <div >
                    {
                        updateMode ? (
                            file ? (
                                <div>
                                    <img

                                        src={URL.createObjectURL(file)}

                                        className={classes.articleImg}
                                        alt=""
                                    />
                                    <input type="file" id="filePostInput"
                                        onChange={(e) => setFile(e.target.files[0])}
                                        style={{ display: "none" }}
                                    />
                                </div>
                            ) : (
                                <div>
                                    <label htmlFor="filePostInput" >
                                        <img className={classes.articleImg}
                                            src={post.image}
                                            alt="img"
                                        />
                                    </label>
                                    <input type="file" id="filePostInput"
                                        onChange={(e) => setFile(e.target.files[0])}
                                        style={{ display: "none" }}
                                    />
                                </div>
                            )
                        ) :
                            (post.image &&
                                <label htmlFor="filePostInput" >
                                    <img className={classes.articleImg}
                                        src={post.image}
                                        alt="img"
                                    />
                                </label>
                            )
                    }



                </div>
                <div  >
                    {
                        updateMode ?
                            (
                                <TextField
                                    defaultValue={post.title}
                                    className={classes.textFieldStyle}
                                    label="Title"
                                    multiline
                                    maxRows={4}

                                    fullWidth
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            ) :

                            (
                                <Typography variant="h5" className={classes.titleStyle}>
                                    {post.title}
                                </Typography>
                            )}

                </div>
                <div >
                    {
                        updateMode ? (
                            <TextField
                                id="standard-multiline-flexible"
                                label="question"
                                multiline
                                maxRows={4}
                                defaultValue={post.question}
                                fullWidth
                                onChange={(e) => setQuestion(e.target.value)}
                            />


                        ) : (
                            <Typography variant="h5" className={classes.questionStyle}>
                                {post.question}
                            </Typography>
                        )}
                </div>
                <div className={classes.infoStyle}>

                    <Typography variant="h7" >
                        asked by

                        <span> {post.username} </span>
                        on July 6, 2021
                    </Typography>
                </div>
                <div className={classes.infoStyle}>

                    {likeLength > 1 ? (
                        <Typography variant="h7" >
                            {likeLength} Likes {commentLength} reply

                        </Typography>) : (
                        <Typography variant="h7" >
                            {likeLength} Like {commentLength} reply

                        </Typography>
                    )}
                </div>
                <div>


                    <IconButton className={isLiked ? classes.likeStyle : classes.dislikeStyle} onClick={likeHandler}>
                        <ThumbUp />
                    </IconButton>
                    <IconButton onClick={showCommentsBtn}>
                        <ModeCommentIcon />
                    </IconButton>

                    {showComments ?


                        <form onSubmit={handleCreateComment}>
                            <TextField className={classes.textFieldStyle}

                                placeholder="Add your comment"
                                inputRef={replyRef}
                            >

                            </TextField>
                            <br />
                            <br />
                            <Button variant="contained"
                                className={classes.btnPostStyle} type="submit">Post</Button>
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

                        : null
                    }

                </div>
                {/* { cond1 && ((cond2=con3)&& (

               ))} */}




                {updateMode ? (
                    <div>

                        <Button className={classes.singlePostButton}
                            variant="contained"
                            onClick={handleUpdate}
                        >
                            Update
                        </Button>

                    </div>
                ) : (
                    <div >
                        {user ?
                            ((post.username === user.username) && (

                                <div>
                                    <ModeEditIcon className={classes.updateStyle} onClick={() => setUpdateMode(true)} />
                                    <DeleteIcon className={classes.deleteStyle} onClick={() => handleDeletePost()} />

                                </div>

                            )) :
                            null}
                    </div>

                )}

            </div>

        </div >

    )
}
