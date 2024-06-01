const request = require('supertest');
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to CatsApp');
});

describe('GET /', () => {
    it('should return welcome message', async () => {
        const res = await request(app).get('/');
        expect(res.status).toBe(200);
        expect(res.text).toBe('Welcome to CatsApp');
    });
});
