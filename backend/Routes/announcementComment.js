const router = require("express").Router();
const Announcement = require("../Models/Announcement.js");
const AnnouncementComment = require("../Models/AnnouncementComment");
const passport = require('passport');
require('dotenv').config()

//create replies
router.post("/:id/reply",
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        try {
            const newAnnouncementComment = await new AnnouncementComment({
                "announcementId": req.params.id,
                "replyAnt": req.body.replyAnt,
                "username": req.body.username,
            })
            // console.log(newAnnouncementComment)
            const commentAnt = await newAnnouncementComment.save();
            const announcement = await Announcement.findById(req.params.id);
            await announcement.updateOne({ $push: { replies: commentAnt._id } })
            res.status(200).json(commentAnt);
        } catch (err) {
            res.status(500).json(err)
        }
    })

//get single reply by commentId
router.get("/",
    async (req, res) => {
        try {
            // console.log(req)
            const commentAnt = await AnnouncementComment.findById(req.query.id);
            res.status(200).json(commentAnt);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
)



//get all replies by announcementId
router.get("/getall", async (req, res) => {
    try {
        const allCommentAnt = await AnnouncementComment.find({ "announcementId": req.query.id });
        // console.log(req.query.id)
        res.status(200).json(allCommentAnt);
    } catch (err) {
        res.status(500).json(err)
    }
})


//update replies
router.put("/:id",
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        try {
            const antReply = await AnnouncementComment.findById(req.params.id);
            let updatedAntCommentInfo = {}
            if (antReply.replyAnt) {
                updatedAntCommentInfo.replyAnt = req.body.replyAnt;
            }
            try {
                const updatedAntComment = await cc.findByIdAndUpdate(req.params.id,
                    { $set: updatedAntCommentInfo },
                    { new: true }
                );
                res.status(200).json(updatedAntComment);
                // console.log(updatedPost)
            } catch (err) {
                res.status(500).json(err);
            }

        } catch (err) {
            res.status(501).json(err)
        }
    })


//delete reply

router.delete("/:id",
    async (req, res) => {
        try {
            const antReply = await AnnouncementComment.findById(req.params.id);
            // console.log(antReply)
            try {
                const announcement = await Announcement.findById(antReply.announcementId);
                // console.log(antReply.announcementId)
                await announcement.updateOne({ $pull: { replies: antReply._id } });
                await antReply.delete();
                res.status(200).json("deleted")
            } catch (err) {
                res.status(500).json(err);
            }

        } catch (err) {
            res.status(500).json(err)
        }
    })

module.exports = router;