const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/user');

describe('Authentication API', () => {

  // Cleanup before each test
  beforeEach(async () => {
    await User.deleteMany({ email: 'testuser@example.com' });
  });

  it('should sign up a new user', async () => {
    const response = await request(app)
      .post('/api/auth/signup')
      .send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'Password123'
      });
    expect(response.status).to.equal(201);
    expect(response.body).to.have.property('token');
  });

  it('should sign in an existing user', async () => {
    // First, ensure the user is created
    await request(app)
      .post('/api/auth/signup')
      .send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'Password123'
      });

    // Now test sign-in
    const response = await request(app)
      .post('/api/auth/signin')
      .send({
        email: 'testuser@example.com',
        password: 'Password123'
      });
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('token');
  });
});
