const Posts = require('../models/postModel');
const Users = require('../models/userModel');
const Comments = require('../models/commentModel');

const postCtrl = {
    createPost: async (req, res) => {
        const newPost = new Posts(req.body);
        try {
            const savedPost = await newPost.save();
            console.log (req.body)
            await Comments.create({ postId: savedPost._id });
            res.status(200).json(savedPost);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    updatePost: async (req, res) => {
        try {
            const post = await Posts.findById(req.params.id);
            if (post.userId === req.body.userId) {
                await post.updateOne({ $set: req.body });
                res.status(200).json('the post has been updated');
            } else {
                res.status(403).json('you can update only your post');
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
    deletePost: async (req, res) => {
        try {
            const post = await Posts.findById(req.params.id);
            if (post.userId === req.body.userId) {
                await post.deleteOne();
                res.status(200).json('The post has been deleted');
            } else {
                res.status(403).json('You can delete only your post');
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getTimelinePost: async (req, res) => {
        try {
            const currentUser = await Users.findById(req.params.userId);
            const userPosts = await Posts.find({ userId: currentUser._id });
            const friendPosts = await Promise.all(
                currentUser.followings.map((friendId) => {
                    return Posts.find({ userId: friendId });
                })
            );
            res.status(200).json(userPosts.concat(...friendPosts));
        } catch (err) {
            res.status(500).json(err);
        }
    },
    likeUnlikePost: async (req, res) => {
        try {
            const post = await Posts.findById(req.params.id);
            if (!post.likes.includes(req.body.userId)) {
                await post.updateOne({ $push: { likes: req.body.userId } });
                res.status(200).json('The post has been liked');
            } else {
                await post.updateOne({ $pull: { likes: req.body.userId } });
                res.status(200).json('The post has been disliked');
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
    commentPost: async (req, res) => {
        try {
            const comment = await Comments.findOne({
                postId: req.params.postId,
            });
            if (!comment) return res.status(404).json('Post not found');
            await comment.updateOne({
                $push: { commentList: req.body },
            });
            return res.status(200).json('The post has been commented');
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    getCommentPost: async (req, res) => {
        try {
            const commentOfPost = await Comments.findOne({
                postId: req.params.postId,
            });
            if (!commentOfPost) return res.status(404).json('Post not found');
            const userList = await Promise.all(
                commentOfPost.commentList.map((comment) => {
                    return Users.findOne({ _id: comment.userId }).select([
                        'email',
                        'name',
                        'avatar',
                    ]);
                })
            );
            const newCommentList = commentOfPost.commentList.map(
                (comment, index) => {
                    return { content: comment.content, user: userList[index] };
                }
            );
            return res.status(200).json(newCommentList);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};

module.exports = postCtrl;