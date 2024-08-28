const request = require('supertest');
const { expect } = require('chai');
const mongoose = require('mongoose');
const app = require('../app');

let server;
let token;

before(async function () {
    this.timeout(10000);

    // Start the server on a different port for testing
    process.env.PORT = 4001; 
    server = app.listen(process.env.PORT, () => console.log(`Test server running on port ${process.env.PORT}`));

    // Clear database before tests
    await mongoose.connection.dropDatabase();

    // Signup a user
    await new Promise((resolve, reject) => {
        request(app)
            .post('/api/auth/signup')
            .send({ username: 'testuser', email: 'testuser@example.com', password: 'testpassword' })
            .end((err, res) => {
                if (err) return reject(err);
                token = res.body.token;
                resolve();
            });
    });
});

after(async function () {
    // Close the server
    if (server) server.close();
    await mongoose.disconnect();
});

describe('Password Management Routes', function () {
    it('should create a password entry', function (done) {
        request(app)
            .post('/api/passwords')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Test Password',
                description: 'Test Description',
                start_date: new Date(),
                end_date: new Date(),
                password: 'testpassword'
            })
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.have.property('_id');
                done();
            });
    });

    it('should get all password entries', function (done) {
        request(app)
            .get('/api/passwords')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.be.an('array');
                done();
            });
    });

    it('should delete a password entry', function (done) {
        // Create a password entry to delete
        request(app)
            .post('/api/passwords')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Test Password',
                description: 'Test Description',
                start_date: new Date(),
                end_date: new Date(),
                password: 'testpassword'
            })
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);
                const passwordId = res.body._id;

                // Delete the created password entry
                request(app)
                    .delete(`/api/passwords/${passwordId}`)
                    .set('Authorization', `Bearer ${token}`)
                    .expect(200)
                    .end((err, res) => {
                        if (err) return done(err);
                        expect(res.body).to.have.property('message', 'Password deleted successfully');
                        done();
                    });
            });
    });
});
