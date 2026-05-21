const express = require('express');
const router = express.Router();
const commentsService = require('../services/commentsService');
const asyncHandler = require('../middlewares/asyncHandler');

router.post('/', asyncHandler(async (req, res) => {
    const { postId, authorId, content } = req.body;
    const newComment = await commentsService.create(postId, authorId, content);
    res.status(201).json(newComment);
}));

router.get('/post/:postId', asyncHandler(async (req, res) => {
    const comments = await commentsService.getByPost(req.params.postId);
    res.json(comments);
}));

module.exports = router;