const request = require('supertest');
const app = require('../app.js'); // Adjusted path to app.js

describe('Authentication Routes', () => {
  let token;

  // Test for user signup
  it('should sign up a new user', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({
        username: 'testuser',
        password: 'Test@1234',
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  // Test for user signin
  it('should sign in an existing user', async () => {
    const res = await request(app)
      .post('/api/auth/signin')
      .send({
        username: 'testuser',
        password: 'Test@1234',
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token; // Save token for later use
  });

  // Test for retrieving user details
  it('should get user details', async () => {
    const res = await request(app)
      .get('/api/auth/user-details')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('username', 'testuser');
  });

  // Test for user logout
  it('should log out the user', async () => {
    const res = await request(app)
      .get('/api/auth/logout')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Logout successful');
  });
});
