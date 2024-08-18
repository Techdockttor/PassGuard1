const request = require('supertest');
const app = require('../app.js'); // Updated path
const mongoose = require('mongoose');

// Function to get a valid token for the test user
const getValidTokenForTestUser = async () => {
  // Implement this function based on how you generate tokens in your application
  // This is a placeholder for demonstration purposes
  const res = await request(app)
    .post('/api/signin')
    .send({
      email: 'testuser@example.com',
      password: 'TestPassword123!',
    });

  return res.body.token;
};

describe('Password Routes', () => {
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create a password entry', async () => {
    const token = await getValidTokenForTestUser(); // Function to get a token

    const res = await request(app)
      .post('/api/passwords')
      .set('Authorization', `Bearer ${token}`)
      .send({
        website: 'example.com',
        username: 'testuser',
        password: 'SecurePassword123!',
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'Password saved successfully');
  });

  it('should retrieve all passwords for the user', async () => {
    const token = await getValidTokenForTestUser();

    const res = await request(app)
      .get('/api/passwords')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should delete a password entry', async () => {
    const token = await getValidTokenForTestUser();
    const passwordId = 'somePasswordId'; // Replace with a valid password ID for the test

    const res = await request(app)
      .delete(`/api/passwords/${passwordId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Password deleted successfully');
  });
});
