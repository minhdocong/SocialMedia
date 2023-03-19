const userCtrl = require('../controllers/userCtrl');
const router = require('express').Router();

//get all users
router.post('/', userCtrl.getAllUsers);
//update user
router.put('/:id', userCtrl.updateInfo);
//get a user
router.get('/', userCtrl.getInfo);
//request follow a user
router.put('/:id/requestFollow', userCtrl.requestFollows);
//delete request follow a user
router.put('/:id/delete-requestFollow', userCtrl.deleteRequestFollows);
//follow a user
router.put('/:id/follow', userCtrl.followUser);
//unfollow a user
router.put('/:id/unfollow', userCtrl.unfollowUser);
//forgot password
router.post('/forgot', userCtrl.forgot);
//confirm forgot password
router.get('/reset-password/:token', userCtrl.getResetPassword);
//enter new password
router.post('/reset-password/:token', userCtrl.postResetPassword);

module.exports = router;
