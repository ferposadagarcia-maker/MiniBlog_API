const pool = require('../config/db');

const commentsService = {
    create: async (post_id, author_id, content) => {
        const query = 'INSERT INTO comments (post_id, author_id, content) VALUES ($1, $2, $3) RETURNING *';
        const result = await pool.query(query, [post_id, author_id, content]);
        return result.rows[0];
    },

    getByPostId: async (postId) => {
        const query = `
            SELECT comments.*, authors.name as author_name 
            FROM comments 
            JOIN authors ON comments.author_id = authors.id 
            WHERE post_id = $1 
            ORDER BY created_at DESC`;
        const result = await pool.query(query, [postId]);
        return result.rows;
    }
};

module.exports = commentsService;