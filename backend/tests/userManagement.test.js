const request = require('supertest');
const app = require('../app.js'); // Updated path
const mongoose = require('mongoose');

// Function to get a valid admin token for testing
const getAdminTokenForTestUser = async () => {
  // Implement this function based on how you generate admin tokens in your application
  // This is a placeholder for demonstration purposes
  const res = await request(app)
    .post('/api/signin')
    .send({
      email: 'adminuser@example.com',
      password: 'AdminPassword123!',
    });

  return res.body.token;
};

describe('User Management Routes', () => {
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should retrieve all users', async () => {
    const token = await getAdminTokenForTestUser(); // Function to get a valid admin token

    const res = await request(app)
      .get('/api/all-user')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should update a user', async () => {
    const token = await getAdminTokenForTestUser();
    const res = await request(app)
      .post('/api/update-user')
      .set('Authorization', `Bearer ${token}`)
      .send({
        userId: 'someUserId', // Replace with a valid user ID for the test
        username: 'updatedUsername',
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'User updated successfully');
  });
});
