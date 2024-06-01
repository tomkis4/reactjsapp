const request = require('supertest');
const express = require('express');
const app = express();

app.use(express.json());

const mockConnection = {
    query: jest.fn()
};

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    mockConnection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Błąd podczas logowania' });
        }
        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        res.status(200).json({ message: 'Logged in successfully', username: username });
    });
});

describe('POST /login', () => {
    it('should log in successfully with valid credentials', async () => {
        mockConnection.query.mockImplementationOnce((query, values, callback) => {
            callback(null, [{ username: 'testuser', password: 'password' }]);
        });
        const res = await request(app)
            .post('/login')
            .send({ username: 'testuser', password: 'password' });
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Logged in successfully');
    });

    it('should return error for invalid credentials', async () => {
        mockConnection.query.mockImplementationOnce((query, values, callback) => {
            callback(null, []);
        });
        const res = await request(app)
            .post('/login')
            .send({ username: 'testuser', password: 'wrongpassword' });
        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Invalid username or password');
    });
});
