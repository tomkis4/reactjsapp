const request = require('supertest');
const express = require('express');
const app = express();

app.use(express.json());

const mockConnection = {
    query: jest.fn()
};

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    mockConnection.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error during registration' });
        }
        if (results.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }
        mockConnection.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error during registration' });
            }
            res.status(200).json({ message: 'Registration successful' });
        });
    });
});

describe('POST /register', () => {
    it('should register successfully with valid data', async () => {
        mockConnection.query.mockImplementationOnce((query, values, callback) => {
            callback(null, []);
        });
        mockConnection.query.mockImplementationOnce((query, values, callback) => {
            callback(null);
        });
        const res = await request(app)
            .post('/register')
            .send({ username: 'newuser', password: 'password' });
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Registration successful');
    });

    it('should return error if user already exists', async () => {
        mockConnection.query.mockImplementationOnce((query, values, callback) => {
            callback(null, [{ username: 'existinguser' }]);
        });
        const res = await request(app)
            .post('/register')
            .send({ username: 'existinguser', password: 'password' });
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('User already exists');
    });
});
