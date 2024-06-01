const request = require('supertest');
const express = require('express');
const app = express();

app.get('/get-chat-messages', (req, res) => {
    const messages = [{ username: 'testuser', message: 'Hello!' }];
    res.status(200).json({ messages });
});

describe('GET /get-chat-messages', () => {
    it('should return 200 and list of chat messages', async () => {
        const res = await request(app).get('/get-chat-messages');
        expect(res.status).toBe(200);
        expect(res.body.messages).toEqual([{ username: 'testuser', message: 'Hello!' }]);
    });
});
