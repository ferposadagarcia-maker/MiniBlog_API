const pool = require('../config/db');

const authorService = {
    getAll: async () => {
        const result = await pool.query('SELECT * FROM authors ORDER BY id ASC');
        return result.rows;
    },

    create: async (name, email, bio) => {
        const query = 'INSERT INTO authors (name, email, bio) VALUES ($1, $2, $3) RETURNING *';
        const values = [name, email, bio];
        const result = await pool.query(query, values);
        return result.rows[0];
    },
    
    getById: async (id) => {
        const result = await pool.query('SELECT * FROM authors WHERE id = $1', [id]);
        return result.rows[0];
    },

    update: async (id, name, email, bio) => {
        const query = `
            UPDATE authors 
            SET name = $1, email = $2, bio = $3 
            WHERE id = $4 
            RETURNING *`;
        const result = await pool.query(query, [name, email, bio, id]);
        return result.rows[0];
    },

    delete: async (id) => {
        const result = await pool.query('DELETE FROM authors WHERE id = $1 RETURNING *', [id]);
        return result.rows[0];
    }
}
module.exports = authorService;