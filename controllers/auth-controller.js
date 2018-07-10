const shortid = require('short-id');
const Post    = require('../models/post');

module.exports = (app) => {

  app.get('/login', (req, res) => {
    res.render('login.hbs')
  });

  app.get('/signup', (req, res) => {
    res.render('signup.hbs')
  });

  // process the signup form
  // app.post('/signup', passport.authenticate('local-signup', {
  //     successRedirect : '/profile', // redirect to the secure profile section
  //     failureRedirect : '/signup', // redirect back to the signup page if there is an error
  //     failureFlash : true // allow flash messages
  // }));

  app.get('/profile', (req, res) => {
    res.send('profile /profile')
  });

  app.get('/logout', (req, res) => {
    res.redirect('/')
  });
}

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/')
}
