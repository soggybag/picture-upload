const request = require('supertest');
const expect = require('chai').expect;

const app = require('../app').app;
const Post = require('../models/post');
const getPosts = require('../controllers/post-controller').getPosts;

describe('test post controller', () => {

  it('Should find all posts', () => {
    return Post.find({}).then((posts) => {
      expect(posts).to.be.an('array');
    });
  });

  it('Should find no posts', () => {
    return Post.find({non:0}).then((posts) => {
      expect(posts).to.be.an('array');
      expect(posts.length).to.equal(0);
    });
  });

  let count = null;

  it('Should add a post', () => {
    let testPost;
    return Post.count({}).then((n) => {
      count = n;
      testPost = new Post({
        name: "Test Post",
        path: "abcd",
        originalFileName: "test file name"
      });
      return testPost.save();
    }).then((post) => {
      return Post.count({});
    }).then((n) => {
      expect(n).to.equal(count + 1);
      testPost.remove();
    });
  });
});
