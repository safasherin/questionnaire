const router = require("express").Router();
const User = require("../Models/User.js");
const Post = require("../Models/Post.js");
const Comment = require("../Models/Comment.js");
const bcrypt = require('bcrypt');
const passport = require('passport');
require('dotenv').config()
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;
const { cloudinary } = require('../utils/cloudinary.js');

//register
router.post("/register", async (req, res) => {
    // console.log(req.files["profilePic"].path)
    try {
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            res.status(201).json("Sorry, Email id already exist")
        }
        const salt = await bcrypt.genSalt(11);
        const hashedpassword = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            "name": req.body.name,
            "username": req.body.username,
            "email": req.body.email,
            "password": hashedpassword,
            "designation": req.body.designation,
            "linkedInURL": req.body.linkedInURL,
            "phoneNumber": req.body.phoneNumber,
            "expertiseLevel": req.body.expertiseLevel,
            // "profilePic": req.body.profilePic,

        });
        const user_callback = await newUser.save();
        res.status(200).json(user_callback)
    } catch (error) {
        res.status(500).json(error)
    }
}
)



router.post("/login",
    async (req, res) => {
        try {
            const user = await User.findOne({ username: req.body.username });
            !user && res.status(400).json("Sorry. Wrong email or password");
            // console.log(req.body.password)
            // console.log(user.password)
            const isMatch = await bcrypt.compare(req.body.password, user.password);
            !isMatch && res.status(400).json("Sorry. Wrong email or password");
            const payload = {
                id: user.id
            }
            await jwt
                .sign(
                    payload,
                    jwtSecret,

                    // { expiresIn: "200s" },
                    (err, jsonwebtoken) => {
                        res.status(200).json({ user, jsonwebtoken })

                    }
                )
        } catch (err) {
            res.status(500).json(err);
        }
    }
)


// get single user
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Get all users
router.get("/", async (req, res) => {
    try {
        // console.log(1)
        const user = await User.find();
        // console.log(user)
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});


//Update password
router.put("/:id/resetpassword",
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        try {
            // console.log("in")
            // console.log(req.params)
            const user = await User.findById({ _id: req.params.id })
            // console.log(req.params.id)
            // console.log(user)
            let updatedUserPassword = {}
            const salt = await bcrypt.genSalt(11);
            const isMatch = await bcrypt.compare(req.body.oldpassword, user.password);
            // console.log(isMatch)
            if (!isMatch) {
                res.status(201).json("Sorry, You entered Wrong password")
            } else {
                // console.log(isMatch)
                // console.log(user.password)
                const hashedpassword = await bcrypt.hash(req.body.newpassword, salt);
                // console.log(hashedpassword)
                updatedUserPassword.password = hashedpassword
                const updatepassword = await User.findByIdAndUpdate(req.params.id,
                    { $set: updatedUserPassword },
                    { new: true }
                );
                // console.log(updatepassword)
                // console.log("out")
                // console.log(updatedUserPassword)
                res.status(200).json(updatedUserPassword);
            }
        } catch (error) {
            res.status(502).json(error)
        }
    }
)


//Update User
router.put("/:id",
    async (req, res) => {
        try {
            // console.log(req)
            if (req.body.userId === req.params.id) {
                let user = await User.findById(req.params.id);
                let updateUserInfo = {}
                // console.log(req.files.profilePic)
                if (req.body.linkedInURL) {
                    updateUserInfo.linkedInURL = req.body.linkedInURL
                }
                if (req.body.phoneNumber) {
                    updateUserInfo.phoneNumber = req.body.phoneNumber
                }
                if (req.body.designation) {
                    updateUserInfo.designation = req.body.designation
                }
                if (req.files.profilePic) {
                    // console.log("here 1")
                    // console.log(user)
                    if (user.cloudinary_id) {
                        await cloudinary.uploader.destroy(user.cloudinary_id);
                        // console.log(user.cloudinary_id)
                    }
                    // console.log(req.files["profilePic"].path)

                    const fileStr = req.files["profilePic"].path;
                    const result = await cloudinary.uploader.upload(fileStr, {
                        upload_preset: 'questionnaire_app',
                    });
                    // console.log(result)
                    updateUserInfo.profilePic = result.url
                    updateUserInfo.cloudinary_id = result.public_id
                    // console.log(3, updateUserInfo)

                }

                const updatedUser = await User.findByIdAndUpdate(
                    req.params.id,
                    { $set: updateUserInfo },
                    { new: true }
                    //to see the updatedUser in postman
                );

                res.status(200).json(updatedUser);

            } else {
                res.status(201).json("You can only update your own account!!")
            }

        } catch (error) {
            res.status(501).json(error)
        }
    }
)



//delete
router.delete('/:id',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {

        try {
            const user = await User.findById(req.params.id);
            await Comment.deleteMany({ userId: user.userId })
            res.status(200).json("Comments Deleted!!!");
            await Post.deleteMany({ username: user.username })
            res.status(201).json("Posts Deleted!!!");

            await User.findByIdAndDelete(req.params.id)
            res.status(202).json("Delete success!!")
        }
        catch (error) {
            res.status(501).json("error deleting post", error)
        }
    }
)





module.exports = router;