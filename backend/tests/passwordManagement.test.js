const request = require('supertest');
const app = require('../app'); // Adjust path as needed

describe('Password Management Routes', () => {
  let token;
  let passwordId;

  before(async () => {
    // Create a user and obtain a token for testing
    const response = await request(app)
      .post('/signin')
      .send({ email: 'test@example.com', password: 'password123' });
    token = response.body.token;
  });

  it('should create a new password', async () => {
    const response = await request(app)
      .post('/passwords')
      .set('Authorization', `Bearer ${token}`)
      .send({ password: 'newpassword' });
    passwordId = response.body._id;
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('password');
  });

  it('should get all passwords', async () => {
    const response = await request(app)
      .get('/passwords')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should delete a password', async () => {
    const response = await request(app)
      .delete(`/passwords/${passwordId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Password deleted successfully');
  });

  it('should update the status of a password', async () => {
    const response = await request(app)
      .put(`/passwords/${passwordId}/status`)
      .set('Authorization', `Bearer ${token}`)
      .send({ status: 'updated' });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Password status updated');
  });

  it('should generate a new password', async () => {
    const response = await request(app)
      .post('/passwords/generate')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('password');
  });
});
