const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        question: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
        cloudinary_id: {
            type: String,
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
        comments: [{ type: mongoose.Types.ObjectId, ref: 'Comment' }],

    },
    { timestamps: true }

);

module.exports = mongoose.model("Post", PostSchema);