const commentsService = require('../services/commentsService');

const createComment = async (req, res, next) => {
    const { post_id, author_id, content } = req.body;
    try {
        const newComment = await commentsService.create(post_id, author_id, content);
        res.status(201).json(newComment);
    } catch (error) {
        next(error);
    }
};

const getCommentsByPost = async (req, res, next) => {
    try {
        const comments = await commentsService.getByPostId(req.params.postId);
        res.json(comments);
    } catch (error) {
        next(error);
    }
};

module.exports = { createComment, getCommentsByPost };