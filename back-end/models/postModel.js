const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            max: 500,
            required: true,
        },
        img: {
            public_id: {
                type: String,
                default: '',
            },
            url: {
                type: String,
                default: '',
            },
        },
        likes: {
            type: Array,
            default: [],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Post', PostSchema);
