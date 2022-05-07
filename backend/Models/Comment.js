const mongoose = require("mongoose");
const CommentSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        postId: {
            type: String,
            required: true,
        },
        reply: {
            type: String,
            required: true,
        },
        likes: {
            type: Array,
            default: [],
        },
    },
    { timestamps: true }

);

module.exports = mongoose.model("Comment", CommentSchema);