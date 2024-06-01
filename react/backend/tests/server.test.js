const request = require('supertest');
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

// Konfiguracja bazy danych
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'reactjs'
});

// Mockowanie bazy danych
jest.mock('mysql', () => ({
    createConnection: jest.fn().mockReturnValue({
        connect: jest.fn(),
        query: jest.fn(),
        end: jest.fn(),
        on: jest.fn()
    })
}));

// Konfiguracja serwera
const app = express();
app.use(cors());
app.use(express.json());

// Trasy
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Błąd podczas logowania' });
            return;
        }
        if (results.length === 0) {
            res.status(401).json({ message: 'Invalid username or password' });
            return;
        }
        res.status(200).json({ message: 'Logged in successfully', username: username });
    });
});

// Inne endpointy z serwera
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    connection.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Error during registration' });
            return;
        }
        if (results.length > 0) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }
        connection.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (err, result) => {
            if (err) {
                res.status(500).json({ message: 'Error during registration' });
                return;
            }
            res.status(200).json({ message: 'Registration successful' });
        });
    });
});

// Testy
describe('API Endpoints', () => {
    test('POST /login - success', async () => {
        connection.query.mockImplementation((query, params, callback) => {
            callback(null, [{ username: 'testuser', password: 'testpass' }]);
        });
        const res = await request(app)
            .post('/login')
            .send({ username: 'testuser', password: 'testpass' });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Logged in successfully');
        expect(res.body).toHaveProperty('username', 'testuser');
    });

    test('POST /login - failure', async () => {
        connection.query.mockImplementation((query, params, callback) => {
            callback(null, []);
        });
        const res = await request(app)
            .post('/login')
            .send({ username: 'wronguser', password: 'wrongpass' });

        expect(res.statusCode).toEqual(401);
        expect(res.body).toHaveProperty('message', 'Invalid username or password');
    });

    test('POST /register - success', async () => {
        connection.query.mockImplementation((query, params, callback) => {
            if (query.includes('SELECT')) {
                callback(null, []);
            } else if (query.includes('INSERT')) {
                callback(null, { insertId: 1 });
            }
        });
        const res = await request(app)
            .post('/register')
            .send({ username: 'newuser', password: 'newpass' });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Registration successful');
    });

    test('POST /register - user exists', async () => {
        connection.query.mockImplementation((query, params, callback) => {
            if (query.includes('SELECT')) {
                callback(null, [{ username: 'existinguser' }]);
            }
        });
        const res = await request(app)
            .post('/register')
            .send({ username: 'existinguser', password: 'somepass' });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('message', 'User already exists');
    });
});
