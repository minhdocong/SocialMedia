const router = require('express').Router();
const authCtrl = require('../controllers/authCtrl');

//REGISTER
router.post('/register', authCtrl.register);

//LOGIN
router.post('/login', authCtrl.login);

module.exports = router;