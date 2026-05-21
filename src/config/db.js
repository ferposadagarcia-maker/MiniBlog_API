const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
     rejectUnauthorized: false } 
});

pool.on('connect', () => {
  console.log(' Conectado a la base de datos PostgreSQL');
});

console.log('Intentando conectar a la DB:', process.env.DB_NAME);

module.exports = pool;