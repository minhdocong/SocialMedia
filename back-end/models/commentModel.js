const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(
    {
        postId: {
            type: String,
            required: true,
        },
        commentList: {
            type: [
                {
                    content: String,
                    time: String,
                    userId: String,
                },
            ],
            default: [],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Comment', CommentSchema);