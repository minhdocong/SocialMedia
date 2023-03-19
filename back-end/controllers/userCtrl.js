const Users = require('../models/userModel');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userCtrl = {
    getAllUsers: async (req, res) => {
        const { idArr } = req.body;
        try {
            const users = await Users.find({ _id: { $nin: idArr } }).limit(10);
            res.json(users);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    followUser: async (req, res) => {
        // check if the user is not following himself
        if (req.body.userIdFollowing !== req.params.id) {
            try {
                // find the user that is being followed
                const currentUser = await Users.findById(req.params.id);
                // find the user that is following
                const user = await Users.findById(req.body.userIdFollowing);
                if (!currentUser.followers.includes(req.body.userIdFollowing)) {
                    await currentUser.updateOne({
                        $push: { followers: req.body.userIdFollowing },
                        $pull: { requestFollowers: req.body.userIdFollowing },
                    });
                    await user.updateOne({
                        $push: { followings: req.params.id },
                    });
                    res.status(200).json(
                        `You has been followed ${
                            currentUser?.name ||
                            currentUser?.email.split('@')[0]
                        }`
                    );
                } else {
                    res.status(403).json('you allready follow this user');
                }
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(403).json('you cant follow yourself');
        }
    },
    unfollowUser: async (req, res) => {
        // check if the user is not following himself
        if (req.body.userIdFollowing !== req.params.id) {
            try {
                // find the user that is being followed
                const user = await Users.findById(req.params.id);
                // find the user that is following
                const currentUser = await Users.findById(
                    req.body.userIdFollowing
                );
                if (user.followers.includes(req.body.userIdFollowing)) {
                    await user.updateOne({
                        $pull: { followers: req.body.userIdFollowing },
                    });
                    await currentUser.updateOne({
                        $pull: { followings: req.params.id },
                    });
                    res.status(200).json('user has been unfollowed');
                } else {
                    res.status(403).json('you dont follow this user');
                }
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(403).json('you cant unfollow yourself');
        }
    },
    updateInfo: async (req, res) => {
        if (req.body.userId === req.params.id) {
            try {
                const user = await Users.findByIdAndUpdate(
                    req.params.id,
                    {
                        $set: req.body,
                    },
                    { new: true }
                );
                res.status(200).json(user);
            } catch (err) {
                return res.status(500).json(err);
            }
        } else {
            return res.status(403).json('You can update only your account!');
        }
    },
    getInfo: async (req, res) => {
        const userId = req.query.userId;
        const username = req.query.username;
        try {
            const user = userId
                ? await Users.findById(userId)
                : await Users.findOne({ username: username });
            const { password, updatedAt, ...other } = user._doc;
            res.status(200).json(other);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    forgot: async (req, res) => {
        const { email } = req.body;
        try {
            const user = await Users.findOne({ email });
            if (!user) {
                return res.json({ status: 'User Not Exists!!' });
            }
            const token = createToken({ id: user._id });
            const link = `http://localhost:3000/new-pass/${token}`;
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'minhdocong2001@gmail.com', // generated ethereal user
                    pass: 'fzqnfvnkfowhixrm', // generated ethereal password
                },
            });

            var mailOptions = {
                from: 'minhdocong2001@gmail.com',
                to: email,
                subject: 'Password Reset',
                text: link,
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            return res.status(200).json({ msg: 'success' });
        } catch (error) {
            console.log(error);
        }
    },
    getResetPassword: async (req, res) => {
        const { token } = req.params;
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
            if (err) {
                return res.status(400).json({ msg: 'Invalid Authentication' });
            }
            try {
                const oldUser = await Users.findOne({ _id: user.id });
                if (!oldUser) {
                    return res
                        .status(400)
                        .json({ status: 'User Not Exists!!' });
                }
                res.send({
                    email: oldUser.email,
                    status: 'verified',
                });
            } catch (error) {
                console.log('error: ', error);
                res.send('Not Verified');
            }
        });
    },
    postResetPassword: async (req, res) => {
        const { token } = req.params;
        const { password } = req.body;

        let userTmp;
        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ msg: 'Invalid Authentication' });
            }
            userTmp = user;
        });
        console.log(userTmp);
        //check lai 
        const oldUser = await Users.findOne({ _id: userTmp.id });
        if (!oldUser) {
            return res.json({ status: 'User Not Exists!!' });
        }
        try {
            const encryptedPassword = await bcrypt.hash(password, 10);
            await Users.updateOne(
                {
                    _id: userTmp.id,
                },
                {
                    $set: {
                        password: encryptedPassword,
                    },
                }
            );

            res.send({ email: oldUser.email, status: 'success' });
        } catch (error) {
            console.log(error);
            res.json({ status: 'Something Went Wrong' });
        }
    },
    requestFollows: async (req, res) => {
        // check if the user is not requesting himself
        if (req.body.userIdRequesting !== req.params.id) {
            try {
                // find the user that is being followed
                const user = await Users.findById(req.params.id);
                // find the user that is following
                const currentUser = await Users.findById(
                    req.body.userIdRequesting
                );
                if (
                    !user.requestFollowers.includes(req.body.userIdRequesting)
                ) {
                    await user.updateOne({
                        $push: { requestFollowers: req.body.userIdRequesting },
                    });
                    await currentUser.updateOne({
                        $push: { requestFollowings: req.params.id },
                    });
                    res.status(200).json(
                        `You has been send request follow ${
                            user?.name || user?.email.split('@')[0]
                        }`
                    );
                } else {
                    res.status(403).json('You already follow this user');
                }
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(403).json('You cant follow yourself');
        }
    },
    deleteRequestFollows: async (req, res) => {
        // check if the user is not requesting himself
        if (req.body.currentUserId !== req.params.id) {
            try {
                // find the user that is requesting
                const user = await Users.findById(req.params.id);
                // find the user that is being requested
                const currentUser = await Users.findById(
                    req.body.currentUserId
                );
                if (currentUser.requestFollowers.includes(req.params.id)) {
                    await currentUser.updateOne({
                        $pull: { requestFollowers: req.params.id },
                    });
                    await user.updateOne({
                        $pull: { requestFollowings: req.body.currentUserId },
                    });
                    res.status(200).json(
                        `You has been deleted request follow of ${
                            user?.name || user?.email.split('@')[0]
                        }`
                    );
                } else {
                    res.status(403).json('This user doesnt follow you');
                }
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(403).json('You cant delete yourself');
        }
    },
};

const createToken = (user) => {
    return jwt.sign(user, process.env.TOKEN_SECRET, {
        expiresIn: '120s',
    });
};

module.exports = userCtrl;