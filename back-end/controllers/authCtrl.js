const Users = require('../models/userModel');
const bcrypt = require('bcrypt');

const authCtrl = {
    register: async (req, res) => {
        try {
            const { email } = req.body;

            // check email is already exist
            const user = await Users.findOne({ email });
            if (user)
                return res
                    .status(400)
                    .json({ msg: 'The email already exists.' });

            // Password Encryption
            const passwordHash = await bcrypt.hash(req.body.password, 10);
            const newUser = new Users({
                email,
                password: passwordHash,
            });

            // Save mongodb
            const saveUser = await newUser.save();

            const { password, ...others } = saveUser._doc;
            res.json({ ...others });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    login: async (req, res) => {
        try {
            const { email } = req.body;
            // check email is already exist
            const user = await Users.findOne({ email });
            if (!user)
                return res
                    .status(400)
                    .json({ msg: 'Incorrect email or password.' });

            // check password is correct
            const isMatch = await bcrypt.compare(
                req.body.password,
                user.password
            );
            if (!isMatch)
                return res
                    .status(400)
                    .json({ msg: 'Incorrect email or password.' });

            const { password, ...others } = user._doc;
            res.json({ ...others });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
};

module.exports = authCtrl;