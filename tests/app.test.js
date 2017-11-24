const request = require('supertest');
const expect = require('chai').expect;

const app = require('../app').app;
const getPosts = require('../controllers/post-controller').getPosts;


describe('Test app.js', () => {
  it('should respond with 404 for invalid routes', (done) => {
    request(app)
      .get('/not-found')
      .expect(404)
      .end(done);
  });

  it('should have a home page', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .end(done);
  });
});
