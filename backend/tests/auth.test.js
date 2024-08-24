// backend/tests/auth.test.js
const request = require('supertest');
const app = require('../app.js'); // Correct path
const mongoose = require('mongoose');

describe('Auth Routes', () => {
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should sign up a user', async () => {
    const res = await request(app)
      .post('/api/signup')
      .send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'TestPassword123!',
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'User signed up successfully');
  });

  it('should sign in a user', async () => {
    const res = await request(app)
      .post('/api/signin')
      .send({
        email: 'testuser@example.com',
        password: 'TestPassword123!',
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });
});
