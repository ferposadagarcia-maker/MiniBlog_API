const validateAuthor = (req, res, next) => {
    const { name, email } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || name.trim() === '') {
        return res.status(400).json({ error: 'El nombre es obligatorio' });
    }

    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({ error: 'El formato del email es inválido' });
    }

    next();
};

const validatePost = (req, res, next) => {
    const { title, content, author_id } = req.body;
    
    if (!title || !content || !author_id) {
        return res.status(400).json({ error: 'Título, contenido y ID de autor son obligatorios' });
    }
    next();
};

module.exports = { validateAuthor, validatePost };