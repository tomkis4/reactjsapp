const request = require('supertest');
const express = require('express');
const app = express();
app.use(express.json());

app.post('/send-message', (req, res) => {
    const { username, message } = req.body;
    if (!username || !message) {
        return res.status(400).json({ message: 'Invalid message data' });
    }
    // Mock database query
    res.status(200).json({ message: 'Chat message saved successfully' });
});

describe('POST /send-message', () => {
    it('should return 400 if username or message is missing', async () => {
        const res = await request(app).post('/send-message').send({});
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Invalid message data');
    });

    it('should return 200 and success message when message is saved', async () => {
        const res = await request(app).post('/send-message').send({ username: 'testuser', message: 'Hello!' });
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Chat message saved successfully');
    });
});
