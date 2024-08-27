const request = require('supertest');
const app = require('../app'); // Adjust path as needed

describe('User Management Routes', () => {
  let token;

  before(async () => {
    // Create a user and obtain a token for testing
    const response = await request(app)
      .post('/signin')
      .send({ email: 'test@example.com', password: 'password123' });
    token = response.body.token;
  });

  it('should get all users', async () => {
    const response = await request(app)
      .get('/all-user')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should update a user', async () => {
    const response = await request(app)
      .post('/update-user')
      .set('Authorization', `Bearer ${token}`)
      .send({ userId: 'userId123', updates: { email: 'updated@example.com' } });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'User updated successfully');
  });
});
