const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// PostgreSQL холболт
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '4578', // Өөрийн нууц үгийг оруулна
    port: 5432,
});

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Бүх номыг авах
app.get('/api/books', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM books');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Серверийн алдаа' });
    }
});

// Категориор шүүх
app.get('/api/books/category/:category', async (req, res) => {
    try {
        const { category } = req.params;
        const result = await pool.query('SELECT * FROM books WHERE category = $1', [category]);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Серверийн алдаа' });
    }
});

// Хайлтаар шүүх
app.get('/api/books/search', async (req, res) => {
    try {
        const { query } = req.query;
        const result = await pool.query(
            'SELECT * FROM books WHERE title ILIKE $1 OR author ILIKE $1',
            [`%${query}%`]
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Серверийн алдаа' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
