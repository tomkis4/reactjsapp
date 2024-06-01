const request = require('supertest');
const express = require('express');
const app = express();

const mockConnection = {
    query: jest.fn()
};

app.get('/get-chat-messages', (req, res) => {
    mockConnection.query('SELECT * FROM chat_messages', (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Error while fetching chat messages' });
            return;
        }
        res.status(200).json({ messages: results });
    });
});

describe('GET /get-chat-messages', () => {
    it('should return error if database query fails', async () => {
        mockConnection.query.mockImplementationOnce((query, callback) => {
            callback(new Error('Database error'), null);
        });
        const res = await request(app).get('/get-chat-messages');
        expect(res.status).toBe(500);
        expect(res.body.message).toBe('Error while fetching chat messages');
    });
});
