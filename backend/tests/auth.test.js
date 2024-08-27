const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const app = require('../app'); // Adjust the path if needed

describe('Authentication API', () => {
  it('should sign up a new user', async () => {
    const response = await request(app)
      .post('/api/auth/signup')
      .send({
        email: 'testuser@example.com',
        password: 'Password123'
      });
    expect(response.status).to.equal(201);
    expect(response.body).to.have.property('message', 'User created successfully');
  });

  it('should sign in an existing user', async () => {
    const response = await request(app)
      .post('/api/auth/signin')
      .send({
        email: 'testuser@example.com',
        password: 'Password123'
      });
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('token');
  });

  // Add more authentication tests as needed
});
