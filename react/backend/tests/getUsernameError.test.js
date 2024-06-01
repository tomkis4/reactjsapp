const request = require('supertest');
const express = require('express');
const app = express();

const mockConnection = {
    query: jest.fn()
};

app.get('/get-username', (req, res) => {
    const username = req.query.username;
    if (!username) {
        return res.status(400).json({ message: 'Username missing in request' });
    }
    mockConnection.query('SELECT username FROM users WHERE username = ?', [username], (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Error while fetching username' });
            return;
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ username: results[0].username });
    });
});

describe('GET /get-username', () => {
    it('should return error if database query fails', async () => {
        mockConnection.query.mockImplementationOnce((query, values, callback) => {
            callback(new Error('Database error'), null);
        });
        const res = await request(app).get('/get-username').query({ username: 'testuser' });
        expect(res.status).toBe(500);
        expect(res.body.message).toBe('Error while fetching username');
    });
});
