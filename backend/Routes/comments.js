const router = require("express").Router();
const Post = require("../Models/Post.js");
const Comment = require("../Models/Comment.js");
const passport = require('passport');
require('dotenv').config()
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

//create comment
router.post("/:id/comment",
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        try {
            const newComment = await new Comment({
                "postId": req.params.id,
                // "userId": req.body.userId,
                "reply": req.body.reply,
                "username": req.body.username,
                "profilePic": req.body.profilePic,
            })
            // console.log(newComment)
            const commentPost = await newComment.save();
            // console.log(commentPost)

            const post = await Post.findById(req.params.id);
            // console.log(req.params.id)

            await post.updateOne({ $push: { comments: commentPost._id } })

            res.status(200).json(commentPost);

        } catch (err) {
            res.status(500).send(err)
        }
    })


router.get("/get",
    async (req, res) => {
        try {
            // console.log(req)
            const commentPost = await Comment.findById(req.query.id);
            // console.log(commentPost)
            res.status(200).json(commentPost);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
)


//get all comments
router.get("/",
    async (req, res) => {
        try {
            const allComments = await Comment.find({ "postId": req.query.id });
            // console.log(req.query.id)
            res.status(200).json(allComments)

        } catch (err) {
            res.status(500).json(err)
        }
    })



//delete comment

router.delete("/:id",
    passport.authenticate('jwt', { session: false }),

    async (req, res) => {
        try {

            const comment = await Comment.findById(req.params.id);
            try {
                const post = await Post.findById(comment.postId);
                await post.updateOne({ $pull: { comments: comment._id } })
                await comment.delete();
                res.status(200).json("Deleted!!!");
            } catch (err) {
                res.status(500).json(err);
            }
        } catch (err) {
            res.status(501).json(err);
        }
    }
);



module.exports = router;