const request = require('supertest');
const app = require('../app');
const Password = require('../models/password');

describe('Password Management Routes', () => {
  beforeEach(async () => {
    await Password.deleteMany({});
  });

  it('should create a new password', async () => {
    const res = await request(app)
      .post('/passwords')
      .send({
        title: 'Test Password',
        description: 'This is a test password',
        start_date: new Date(),
        end_date: new Date(),
        password: 'GeneratedPassword123!'
      })
      .expect('Content-Type', /json/)
      .expect(201);

    expect(res.body).toHaveProperty('_id');
    expect(res.body.title).toBe('Test Password');
  });

  it('should get all passwords', async () => {
    await request(app)
      .post('/passwords')
      .send({
        title: 'Test Password',
        description: 'This is a test password',
        start_date: new Date(),
        end_date: new Date(),
        password: 'GeneratedPassword123!'
      });

    const res = await request(app)
      .get('/passwords')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should delete a password', async () => {
    const password = await request(app)
      .post('/passwords')
      .send({
        title: 'Test Password',
        description: 'This is a test password',
        start_date: new Date(),
        end_date: new Date(),
        password: 'GeneratedPassword123!'
      });

    await request(app)
      .delete(`/passwords/${password.body._id}`)
      .expect('Content-Type', /json/)
      .expect(200);

    await request(app)
      .get(`/passwords/${password.body._id}`)
      .expect(404);
  });

  it('should update the status of a password', async () => {
    const password = await request(app)
      .post('/passwords')
      .send({
        title: 'Test Password',
        description: 'This is a test password',
        start_date: new Date(),
        end_date: new Date(),
        password: 'GeneratedPassword123!'
      });

    const res = await request(app)
      .put(`/passwords/${password.body._id}/status`)
      .send({ status: 'updated' })
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body.status).toBe('updated');
  });

  it('should generate a new password and save it', async () => {
    const res = await request(app)
      .post('/passwords/generate')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body).toHaveProperty('password');
  });
});
