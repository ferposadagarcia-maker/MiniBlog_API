const authorsService = require('../services/authorsService');

const createAuthor = async (req, res, next) => {
    const { name, email, bio } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: 'Nombre e email son obligatorios' });
    }

    try {
        const newAuthor = await authorsService.create(name, email, bio);
        res.status(201).json(newAuthor);
    } catch (error) {
        if (error.code === '23505') {
            return res.status(400).json({ error: 'El email ya está registrado' });
        }
        next(error);
    }
};

const getAllAuthors = async (req, res, next) => {
    try {
        const authors = await authorsService.getAll();
        res.status(200).json(authors);
    } catch (error) {
        next(error);
    }
};

const getAuthorById = async (req, res, next) => {
    try {
        const author = await authorsService.getById(req.params.id);
        if (!author) return res.status(404).json({ error: 'Autor no encontrado' });
        res.json(author);
    } catch (error) {
        next(error);
    }
};

const updateAuthor = async (req, res, next) => {
    const { name, email, bio } = req.body;
    try {
        const updatedAuthor = await authorsService.update(req.params.id, name, email, bio);
        if (!updatedAuthor) return res.status(404).json({ error: 'Autor no encontrado' });
        res.json(updatedAuthor);
    } catch (error) {
        next(error);
    }
};

const deleteAuthor = async (req, res, next) => {
    try {
        const deletedAuthor = await authorsService.delete(req.params.id);
        if (!deletedAuthor) return res.status(404).json({ error: 'Autor no encontrado' });
        // 204 No Content es ideal para borrados exitosos
        res.status(204).send(); 
    } catch (error) {
        next(error);
    }
};

module.exports = { getAllAuthors, createAuthor, getAuthorById, updateAuthor, deleteAuthor };