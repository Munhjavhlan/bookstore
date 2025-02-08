const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static('public')); // Static файлуудыг үйлчлэх

// PostgreSQL холболт
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '4578',
    port: 5432,
});

// Root route - Үндсэн хуудас
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Бүртгүүлэх хуудас
app.get('/burtguuleh', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'burtguuleh.html'));
});

// Нэвтрэх хуудас
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Бүртгүүлэх API
app.post('/api/register', async (req, res) => {
    try {
        const { ner, ovog, email, utas, nuuts_ug } = req.body;

        // Email давхардал шалгах
        const userExists = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );

        if (userExists.rows.length > 0) {
            return res.status(400).json({ error: 'И-мэйл хаяг бүртгэлтэй байна' });
        }

        // Нууц үг hash хийх
        const hashedPassword = await bcrypt.hash(nuuts_ug, 10);

        // Шинэ хэрэглэгч үүсгэх
        const newUser = await pool.query(
            `INSERT INTO users (ner, ovog, email, utas, nuuts_ug)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING id, ner, email`,
            [ner, ovog, email, utas, hashedPassword]
        );

        res.status(201).json({
            message: 'Бүртгэл амжилттай',
            user: newUser.rows[0]
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Серверийн алдаа гарлаа' });
    }
});

// Нэвтрэх API
app.post('/api/login', async (req, res) => {
    try {
        const { email, nuuts_ug } = req.body;

        // Хэрэглэгч хайх
        const user = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );

        if (user.rows.length === 0) {
            return res.status(401).json({ error: 'И-мэйл эсвэл нууц үг буруу байна' });
        }

        // Нууц үг шалгах
        const validPassword = await bcrypt.compare(nuuts_ug, user.rows[0].nuuts_ug);
        if (!validPassword) {
            return res.status(401).json({ error: 'И-мэйл эсвэл нууц үг буруу байна' });
        }

        res.json({
            message: 'Амжилттай нэвтэрлээ',
            user: {
                id: user.rows[0].id,
                ner: user.rows[0].ner,
                email: user.rows[0].email
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Серверийн алдаа гарлаа' });
    }
});

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
 