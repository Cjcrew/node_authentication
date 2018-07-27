require('dotenv').config()

// ===================================================
const express     = require('express');
const bodyParser  = require('body-parser');
const mongoose    = require('mongoose');
const app         = express();
const sessions    = require('client-sessions');
const bcrypt      = require('bcryptjs');
const User        = require('./models/user');
// const userInfo    = require('./middleware/user_info');
const csurf       = require('csurf');
const helmet      = require('helmet');
const middleware  = require('./middleware/middleware');
// ===================================================

// Require routes
const index             = require('./routes/index');
const dashboard         = require('./routes/dashboard');

// Connect to mongoDB
mongoose.connect('mongodb://localhost/auth');
mongoose.connection.once('open', () => {
  console.log('Connection to db has been made...');
}).on('error', () => {
  console.error.bind(console, 'Connection error:');
});

//  =====================
//  APP CONFIG
//  =====================
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(helmet());

// Cookie Setup
app.use(sessions({
  cookieName: 'session',
  secret: process.env.COOKIE_SECRET,
  duration: 60 * 60 * 1000, // 1hr
  httpOnly: true,
  secure: false // set to false for development purposes
}));

// CSRF Protection
app.use(csurf());

// Easily accesible user info middleware
app.use((req, res, next) => {
  res.locals.user = false;
  if(!(req.session && req.session.userId)) {
    return next();
  }

  User.findById(req.session.userId, (err, user) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return next();
    }

    user.password = null;
    req.user = user;
    // available in all templates
    res.locals.user = user;

    next();
  });
});

// Setup Routes
app.use('/', index);
app.use('/dashboard', dashboard);

// Error Handler middleware
app.use(function (req, res, next) {
    let err = new Error('404: Not Found ' + req.originalUrl);
    err.status = 404;
    next(err);
    res.render('errorPage');
});

app.listen(3000, () => console.log('App started on port 3000...'));
