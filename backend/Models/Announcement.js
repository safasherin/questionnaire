const mongoose = require("mongoose");
const AnnouncementSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        announcementTitle: {
            type: String,
            required: true,
        },
        details: {
            type: String,
            required: true,
        },

        username: {
            type: String,
            required: true,
        },

        tags: {
            type: Array
        },
        likes: {
            type: Array,
            default: [],
        },
        replies: [{ type: mongoose.Types.ObjectId, ref: 'AnnouncementComment' }],

    },
    { timestamps: true }

);

module.exports = mongoose.model("Announcement", AnnouncementSchema);