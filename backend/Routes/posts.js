const router = require("express").Router();
const Post = require("../Models/Post.js");
const Comment = require("../Models/Comment.js")
const User = require("../Models/User.js");
const bcrypt = require('bcrypt');
const passport = require('passport');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;
const { cloudinary } = require('../utils/cloudinary.js');

router.post("/add",
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        if (req.user.username === req.body.username) {
            try {
                const newquestionPost = new Post({
                    "title": req.body.title,
                    "question": req.body.question,
                    "username": req.body.username,
                    "userId": req.body.userId,
                });
                // console.log(req.files.image)
                // console.log(question)
                if (req.files.image) {
                    const fileStr = req.files["image"].path;
                    const result = await cloudinary.uploader.upload(fileStr, {
                        upload_preset: 'post_images',
                    });
                    // console.log(result)
                    newquestionPost.image = result.url
                    newquestionPost.cloudinary_id = result.public_id
                }
                const questionPost = await newquestionPost.save();
                res.status(200).json(questionPost,);
            }
            catch (err) {
                res.status(500).json(err);
            }
        } else { res.status(400).json("Unauthorised user.") }
    }
)


//Get Post
router.get("/:id",
    async (req, res) => {
        try {
            // console.log(req.params)
            const questionPost = await Post.findById(req.params.id);
            res.status(200).json(questionPost);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
)

//Get all Posts
router.get("/",
    async (req, res) => {
        const username = req.query.user;
        const catName = req.query.cat;
        try {
            let questionPost;
            if (username) {
                questionPost = await Post.find({ username });

            }
            else {
                questionPost = await Post.find();
            }
            res.status(202).json(questionPost)
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
)


//Like Post
router.put("/:id/like",
    async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            if (!post.likes.includes(req.body.userId)) {
                await post.updateOne({ $push: { likes: req.body.userId } })
                res.status(200).json("The post has been liked")
            } else {
                await post.updateOne({ $pull: { likes: req.body.userId } })
                res.status(200).json("The post has been disliked")
            }
        } catch {
            res.status(500).json(err);

        }
    })


//update post

router.put("/:id",
    passport.authenticate('jwt', { session: false }),

    async (req, res) => {

        try {
            const post = await Post.findById(req.params.id);
            if (post.username === req.body.username) {
                // console.log(post.username)
                // console.log(req.body.username)
                let updatedPostInfo = {}
                if (req.body.title) {
                    updatedPostInfo.title = req.body.title;
                    // console.log(updatedPostInfo.title)
                }

                if (req.body.question) {
                    updatedPostInfo.question = req.body.question;
                    // console.log(updatedPostInfo.question)
                }

                if (req.files.image) {
                    // console.log(req.files.image)
                    if (post.cloudinary_id) {
                        await cloudinary.uploader.destroy(post.cloudinary_id);
                        // console.log(post.cloudinary_id)
                    }
                    const strValue = req.files["image"].path;
                    const result1 = await cloudinary.uploader.upload(strValue, {
                        upload_preset: 'post_images',
                    });
                    // console.log(result)
                    updatedPostInfo.image = result1.url
                    updatedPostInfo.cloudinary_id = result1.public_id
                    // console.log(result1)
                }
                // console.log(updatedPostInfo)

                try {
                    const updatedPost = await Post.findByIdAndUpdate(req.params.id,
                        { $set: updatedPostInfo },
                        { new: true }
                    );
                    res.status(200).json(updatedPost);
                    // console.log(updatedPost)
                } catch (err) {
                    res.status(500).json(err);
                }
            }
            else {
                res.status(401).json("You can update only your post ");
            }
        } catch (err) {
            res.status(501).json(err);
        }
    });


//delete post

router.delete("/:id",
    passport.authenticate('jwt', { session: false }),

    async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            if (post.username === req.body.username) {

                // console.log(req.params.id)
                try {
                    await Comment.deleteMany({ postId: req.params.id })
                    // console.log(post)

                    res.status(200).json(" Comments Deleted!!!");
                    await post.delete(post._id);
                    // console.log(post._id)
                    res.status(201).json("post Deleted!!!");
                } catch (err) {
                    res.status(500).json(err);
                }
            } else {
                res.status(401).json("You only can delete your post");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    }
);
module.exports = router;