const express     = require('express');
const bodyParser  = require('body-parser');
const mongoose    = require('mongoose');
const app         = express();
const sessions    = require('client-sessions');
const bcrypt      = require('bcryptjs');
const User        = require('./models/user');

// Requiring routes
const index             = require('./routes/index');
const dashboard         = require('./routes/dashboard');

// APP CONFIG
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// Cookie Setup
app.use(sessions({
  cookieName: 'session',
  secret: 'remaof982354zxaws',
  duration: 30 * 60 * 1000 // 30 mins
}));

// Connect to mongoDB
mongoose.connect('mongodb://localhost/auth');
mongoose.connection.once('open', () => {
  console.log('Connection to db has been made...');
}).on('error', () => {
  console.error.bind(console, 'Connection error:');
});

// Middleware _ Setup
app.use((req, res, next) => {
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

    user.password = undefined;
    req.user = user;
    // available in all templates
    res.locals.user = user;

    next();
  });
});

// Routes
app.use('/', index);
app.use('/dashboard',dashboard);

app.listen(3000, () => console.log('App started on port 3000...'));
