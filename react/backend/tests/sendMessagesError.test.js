const request = require('supertest');
const express = require('express');
const app = express();

app.use(express.json());

const mockConnection = {
    query: jest.fn()
};

app.post('/send-message', (req, res) => {
    const { username, message } = req.body;
    if (!username || !message) {
        return res.status(400).json({ message: 'Invalid message data' });
    }
    mockConnection.query('INSERT INTO chat_messages (username, message) VALUES (?, ?)', [username, message], (err) => {
        if (err) {
            res.status(500).json({ message: 'Error while saving chat message' });
            return;
        }
        res.status(200).json({ message: 'Chat message saved successfully' });
    });
});

describe('POST /send-message', () => {
    it('should return error if database query fails', async () => {
        mockConnection.query.mockImplementationOnce((query, values, callback) => {
            callback(new Error('Database error'), null);
        });
        const res = await request(app)
            .post('/send-message')
            .send({ username: 'testuser', message: 'Hello, world!' });
        expect(res.status).toBe(500);
        expect(res.body.message).toBe('Error while saving chat message');
    });
});
