const request = require('supertest');
const app = require('../app');

describe('User Routes', function () {
  let token;

  before(async function () {
    const response = await request(app)
      .post('/api/auth/signup')
      .send({ username: 'testuser', password: 'testpassword' });
    token = response.body.token;
  });

  it('should sign up a user', async function () {
    const response = await request(app)
      .post('/api/auth/signup')
      .send({ username: 'newuser', password: 'newpassword' });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should sign in a user', async function () {
    const response = await request(app)
      .post('/api/auth/signin')
      .send({ username: 'testuser', password: 'testpassword' });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
});
