const pool = require('../config/db');

const postService = {
    getAll: async () => {
        const query = `
            SELECT posts.*, authors.name as author_name 
            FROM posts 
            JOIN authors ON posts.author_id = authors.id 
            ORDER BY posts.created_at DESC`;
        const result = await pool.query(query);
        return result.rows;
    },

    create: async (author_id, title, content) => {
        const query = `
            INSERT INTO posts (author_id, title, content) 
            VALUES ($1, $2, $3) 
            RETURNING *`;
        const result = await pool.query(query, [author_id, title, content]);
        return result.rows[0];
    },

    getById: async (id) => {
        const query = 'SELECT * FROM posts WHERE id = $1';
        const result = await pool.query(query, [id]);
        return result.rows[0];
    },

    getByAuthor: async (authorId) => {
        const query = `
            SELECT posts.*, authors.name as author_name, authors.email as author_email 
            FROM posts 
            JOIN authors ON posts.author_id = authors.id 
            WHERE authors.id = $1`;
        const result = await pool.query(query, [authorId]);
        return result.rows;
    },

    update: async (id, title, content, published) => {
        const query = `
            UPDATE posts 
            SET title = $1, content = $2, published = $3 
            WHERE id = $4 
            RETURNING *`;
        const result = await pool.query(query, [title, content, published, id]);
        return result.rows[0];
    },

    delete: async (id) => {
        const result = await pool.query('DELETE FROM posts WHERE id = $1 RETURNING *', [id]);
        return result.rows[0];
    }
};

module.exports = postService;