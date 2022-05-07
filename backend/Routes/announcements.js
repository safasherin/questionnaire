const router = require("express").Router();
const passport = require('passport');
const Announcement = require("../Models/Announcement.js");
require('dotenv').config();


router.post("/add",
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        try {
            const newAnnouncement = new Announcement({
                "announcementTitle": req.body.announcementTitle,
                "details": req.body.details,
                "username": req.body.username,
                "userId": req.body.userId,
            });
            const announcementPost = await newAnnouncement.save();

            res.status(200).json(announcementPost);
        }
        catch (err) {
            res.status(500).json(err);
        }
    })

//get announcement

router.get("/:id", async (req, res) => {
    try {
        const announcementPost = await Announcement.findById(req.params.id);
        res.status(200).json(announcementPost);
    } catch (err) {
        res.status(500).json(err);
    }
})


//get all announcement
router.get("/",

    async (req, res) => {

        const username = req.query.user;
        try {
            if (username) {
                const announcementPost = await Announcement.find({ username });
                res.status(200).json(announcementPost)
            } else {
                const announcementPost = await Announcement.find();
                res.status(201).json(announcementPost);
            }
        } catch (err) {
            res.status(500).json(err)
        }
    })


//update announcement

router.put("/:id",
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        try {
            const announcement = await Announcement.findById(req.params.id);
            let updatedAnnouncementInfo = {}
            if (announcement.announcementTitle) {
                updatedAnnouncementInfo.announcementTitle = req.body.announcementTitle;
            }
            if (announcement.details) {
                updatedAnnouncementInfo.details = req.body.details;
            }
            try {
                const updatedAnnouncement = await Announcement.findByIdAndUpdate(req.params.id,
                    { $set: updatedAnnouncementInfo },
                    { new: true }
                );
                // console.log(updatedAnnouncementInfo.details)
                res.status(200).json(updatedAnnouncement)
            } catch (err) {
                res.status(500).json(err)
            }
        } catch (err) {
            res.status(500).json(err)
        }
    })

//delete announcement
router.delete("/:id",
    passport.authenticate('jwt', { session: false }),

    async (req, res) => {
        // console.log(req.params.id);
        try {
            // console.log(req.params.id);
            const announcement = await Announcement.findById(req.params.id);
            // console.log(announcement);
            await announcement.delete(req.params.id);
            res.status(200).json("Deleted")
        } catch (err) {
            res.status(500).json(err)
        }
    })

module.exports = router;