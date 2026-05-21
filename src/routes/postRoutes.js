const express = require('express');
const router = express.Router();
const postsService = require('../services/postsService');
const asyncHandler = require('../middlewares/asyncHandler');

router.get('/', asyncHandler(async (req, res) => {
    const posts = await postsService.getAll();
    res.json(posts);
}));

router.get('/:id', asyncHandler(async (req, res) => {
    const post = await postsService.getById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Publicación no encontrada' });
    res.json(post);
}));

router.get('/author/:authorId', asyncHandler(async (req, res) => {
    const posts = await postsService.getByAuthor(req.params.authorId);
    res.json(posts);
}
));

router.post('/', asyncHandler(async (req, res) => {
    const { title, content, authorId } = req.body;
    const newPost = await postsService.create(title, content, authorId);
    res.status(201).json(newPost);
}));

module.exports = router;