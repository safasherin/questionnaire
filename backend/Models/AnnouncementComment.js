const mongoose = require("mongoose");
const AnnouncementCommentSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        announcementId: {
            type: String,
            required: true,
        },
        replyAnt: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("AnnouncementComment", AnnouncementCommentSchema);