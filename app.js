// =================================================
// Style guide: https://github.com/airbnb/javascript
// =================================================

// =================================================

// Import All npm packages at the top.

const express       = require('express');
const exphbs        = require('express-handlebars');
const mongoose      = require('mongoose');
const bodyParser    = require('body-parser');
const shortid       = require('short-id');
const fileUpload    = require('express-fileupload');
const path          = require('path');
const passport      = require('passport');
const flash         = require('connect-flash')
const morgan        = require('morgan')
const cookieParser  = require('cookie-parser')
const session       = require('express-session')


// Import local files
const Post = require('./models/post');

// ====================================================

// Connect to mongoose

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/postimage', { useMongoClient: true });
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection Error:'))


// Define top level actions
const app = express()

// initialize middleware.
// Note! Middleware is applied in the order it is initialized order matters!
app.use(express.static('public'))
app.use(express.static('uploads'))
app.use(morgan('dev'))
app.use(cookieParser())

// app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload())

app.use(session({
  secret: "cookie_secret",
  name: "cookie_name",
  // store: sessionStore, // connect-mongo session store
  proxy: true,
  resave: true,
  saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())


// Set up template engine
app.engine('.hbs', exphbs({
  extname: '.hbs',
  defaultLayout: 'main'
}));
app.set('view engine', '.hbs');

// Controllers
require('./controllers/post-controller')(app);
require('./controllers/auth-controller')(app);

// ==========================================================
// Must be last in the middleware stack!
// Handle 400 and 500 errors
app.use(function(req, res) {
  res.status(400)
  res.render('404.hbs', { error: "Oopsy couldn't find that" })
  // res.send('404: Page not found', 404)
});

app.use(function(error, req, res, next) {
  res.status(500)
  res.render('500.hbs', { error: "Whoa that didn't work" })
  // res.send('500: Internal Server Error', 500)
})
// ==========================================================

// Start the App!
const listener = app.listen(3001, () => {
  console.log(`Server running on port: ${listener.address().port}`);
});

module.exports.app = app;
