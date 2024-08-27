const request = require('supertest');
const app = require('../app'); // Adjust path as needed

describe('Password Management Routes', function () {
  let token;

  before(async function () {
    // Signup a user to get a token for authenticated routes
    const response = await request(app)
      .post('/api/auth/signup')
      .send({ username: 'testuser', password: 'testpassword' });
    token = response.body.token;
  });

  it('should create a password entry', async function () {
    const response = await request(app)
      .post('/api/passwords')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'testPassword', value: 'password123' });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name', 'testPassword');
  });

  it('should get all password entries', async function () {
    const response = await request(app)
      .get('/api/passwords')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should delete a password entry', async function () {
    // First, create a password entry to be deleted
    const createResponse = await request(app)
      .post('/api/passwords')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'deleteTest', value: 'password123' });
    const passwordId = createResponse.body._id;

    const deleteResponse = await request(app)
      .delete(`/api/passwords/${passwordId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.body).toHaveProperty('message', 'Password entry deleted');
  });

  // Additional tests for update and generate routes
});
