const shortid = require('short-id');

const Post = require('../models/post');

const getPosts = (options = {}) => {
  // console.log("get Posts", options);
  return Post.find(options);
};

const getPost = (id) => {
  return Post.findById(id);
}

module.exports = (app) => {

  // Define some routes

  // localhost:3000/api/posts
  // herokuapp.com/whatever/api/posts
  app.get('/api/posts', (req, res) => {
    Post.find({}).then((posts) => {
      res.json(posts);
    }).catch((err) => {
      console.log(err.message);
    });
  });

  app.get('/api/post/:id', (req, res) => {
    const id = req.params.id;
    Post.findById(id).then((post) => {
      res.json(post);
    }).catch((err) => {
      console.log(err.message);
    });
  });



  // ***************************************
  // Show all posts
  // Index route show all posts
  // localhost:3000/
  // ***************************************
  app.get('/', (req, res) => {
    getPosts().then((posts) => {
      res.render('index.hbs', {
        pageTitle: 'Index',
        posts
      });
    }).catch((err) => {
      console.log(err);
    });
  });

  // ***************************************
  // New Post upload image
  // ***************************************
  app.post('/new', (req, res) => {
    // Check that a file was uploaded. 
    if (!req.files) {
      return res.status(400).send('No files were selected')
    }

    console.log("** post new image **");
    
    const body = req.body;
    // Get the image data from the req.body
    const imageFile = req.files.image;
    // Split the name on the .
    const fileNameArray = imageFile.name.split('.');
    // get the file extension
    const fileExtsion = fileNameArray[fileNameArray.length - 1];
    // generate a short id with the same file extension
    const filePath = `./${shortid.generate()}.${fileExtsion}`;
    // Define the upload path
    const uploadPath = `./uploads/${filePath}`;

    // Move the uploaded file to the upload path this "saves" the file.
    // This should move the file to the uploads directory
    imageFile.mv(uploadPath, (err) => {
      // Check for errors
      if (err) {
        console.log(err);
        return res.status(500)
      }
      // If no error make a post that includes the path to the file. 
      const post = new Post({
        ...body,
        path: filePath,
        originalFileName: imageFile.name
      });
      // Save the post to the database. 
      post.save().then((post) => {
        console.log("post added");
        res.redirect('/');
      }).catch((err) => {
        console.log(err);
      });
    });
  });

  // *************************************
  // Post Details
  // *************************************
  app.get('/post/:postId', (req, res) => {
    const postId = req.params.postId;
    Post.findById(postId).then((post) => {
      res.render('image-details.hbs', {
        pageTitle: 'Details',
        post
      })
    }).catch((err) => {
      console.log(err.message);
    });
  });
}
