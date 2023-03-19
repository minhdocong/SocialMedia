const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            max: 50,
            default: '',
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        avatar: {
            public_id: {
                type: String,
                default: '',
            },
            url: {
                type: String,
                default: '',
            },
        },
        requestFollowers: {
            type: Array,
            default: [],
        },
        requestFollowings: {
            type: Array,
            default: [],
        },
        followers: {
            type: Array,
            default: [],
        },
        followings: {
            type: Array,
            default: [],
        },
        location: {
            type: String,
            max: 50,
            default: '',
        },
        bio: {
            type: String,
            max: 500,
            default: '',
        },
        website: {
            facebook: {
                type: String,
                default: '',
            },
            instagram: {
                type: String,
                default: '',
            },
            linkedIn: { type: String, default: '' },
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);