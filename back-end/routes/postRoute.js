const router = require('express').Router();
const postCtrl = require('../controllers/postCtrl');

//create a post
router.post('/', postCtrl.createPost);
//update a post
router.put('/:id', postCtrl.updatePost);
//delete a post
router.delete('/:id', postCtrl.deletePost);
//like / dislike a post
router.put('/:id/like', postCtrl.likeUnlikePost);
//get timeline posts
router.get('/timeline/:userId', postCtrl.getTimelinePost);
//get list comments
router.get('/comment/:postId', postCtrl.getCommentPost);
//post comment
router.post('/comment/:postId', postCtrl.commentPost);

module.exports = router;