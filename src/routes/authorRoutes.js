const express = require('express');
const router = express.Router();
const AuthorsService = require('../services/authorsService');
const { validateAuthor } = require('../middlewares/validations');
const asyncHandler = require('../middlewares/asyncHandler');

router.get('/', asyncHandler(async (req, res) => {
    const authors = await AuthorsService.getAll();
    res.json(authors);
}));

router.get('/:id', asyncHandler(async (req, res) => {
    const author
     = await AuthorsService.getById(req.params.id);
     
    if (!author) return res.status(404).json({ error: 'Autor no encontrado' });
    res.json(author);
}));

router.post('/', validateAuthor, asyncHandler(async (req, res) => {
    try {
        const { name, email, bio } = req.body;
        const newAuthor = await AuthorsService.create(name, email, bio);
        res.status(201).json(newAuthor);
    } catch (error) {
        if (error.code === '23505') { 
            return res.status(400).json({ error: 'El email ya está registrado' });
    }
    throw error;
    }
}));
router.put('/:id', validateAuthor, asyncHandler(async (req, res) => {
    const { name, email, bio } = req.body;
    const updatedAuthor = await AuthorsService.update(req.params.id, name, email, bio);
    if (!updatedAuthor) {
        return res.status(404).json({ error: 'Autor no encontrado' });
    }
    res.json(updatedAuthor);
}));

router.delete('/:id', asyncHandler(async (req, res) => {
    const deleted = await AuthorsService.delete(req.params.id);
    if (!deleted) {
        return res.status(404).json({ error: 'Autor no encontrado' });
    }
    res.status(204).send();
}));

module.exports = router;