const e = require('express');
const postsService = require('../services/postsService');

const getAllPosts = async (req, res, next) => {
    try {
        const posts = await postsService.getAll();
        res.json(posts);
    } catch (error) {
        next(error);
    }
};

const createPost = async (req, res, next) => {
    const { author_id, title, content } = req.body;

    if (!author_id || !title || !content) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    try {
        const newPost = await postsService.create(author_id, title, content);
        res.status(201).json(newPost);
    } catch (error) {
        next(error);
    }
};

const getPostById = async (req, res, next) => {
    try {
        const post = await postsService.getById(req.params.id);
        if (!post) return res.status(404).json({ error: 'Post no encontrado' });
        res.json(post);
    } catch (error) {
        next(error);
    }
};

const getPostsByAuthor = async (req, res, next) => {
    try {
        const posts = await postsService.getByAuthor(req.params.authorId);
        res.json(posts);
    } catch (error) {
        next(error);
    }
};

const updatePost = async (req, res, next) => {
    const { title, content, published } = req.body;
    try {
        const updatedPost = await postsService.update(req.params.id, title, content, published);
        if (!updatedPost) return res.status(404).json({ error: 'Post no encontrado' });
        res.json(updatedPost);
    } catch (error) {
        next(error);
    }
};

const deletePost = async (req, res, next) => {
    try {
        const deletedPost = await postsService.delete(req.params.id);
        if (!deletedPost) return res.status(404).json({ error: 'Post no encontrado' });
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

module.exports = { 
    getAllPosts, 
    createPost, 
    getPostById, 
    getPostsByAuthor, 
    updatePost, 
    deletePost 
};