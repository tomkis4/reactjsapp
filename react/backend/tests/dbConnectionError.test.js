// tests/dbConnectionError.test.js

const request = require('supertest');
const app = require('../server');

describe('Database connection error handling', () => {
    it('should return 500 on login when there is a connection error', async () => {
        const res = await request(app)
            .post('/login')
            .send({ username: 'testuser', password: 'password' });
        expect(res.status).toBe(500);
        expect(res.body.message).toBe('Błąd podczas logowania');
    });
});
