const express     = require('express');
const bodyParser  = require('body-parser');
const mongoose    = require('mongoose');
const app         = express();
const sessions    = require('client-sessions');
const bcrypt       = require('bcryptjs');
const User        = require('./models/user');

// APP CONFIG
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// Cookie Setup
app.use(sessions({
  cookieName: 'session',
  secret: 'remaof982354zxaws',
  duration: 30 * 60 * 1000
}));

// Connect to mongoDB
mongoose.connect('mongodb://localhost/auth');
mongoose.connection.once('open', () => {
  console.log('Connection to db has been made...');
}).on('error', () => {
  console.error.bind(console, 'Connection error:');
});


// Routes
app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.get('/login', (req, res) => {
  res.render('login.ejs');
});

app.post('/login', (req, res) => {
  User.findOne({email: req.body.email}, (err, user) => {
    if (err || !user || req.body.password !== user.password) {
      return res.render('login', {
        error: 'Incorrect email or password.'
      });
    } else {

    req.session.userId = user._id;
    res.redirect('/dashboard');
    }
  });
});

app.get('/register', (req, res) => {
  res.render('register.ejs')
});


app.post('/register', (req, res) => {
  let user = new User(req.body);

  user.save((err) => {
    if (err) {
      let error = "Something bad happened! Please try again.";
      if (err.code === 11000) {
        error = "That email is already taken, please try another.";
      }

      return res.render('register', {error: error});
    }

    res.redirect('/dashboard');
  });
});

app.get('/dashboard', (req, res, next) => {
  if (!(req.session && req.session.userId)) {
    return res.redirect('/login');
  }

  User.findById(req.session.userId, (err, user) => {
    if (err) {
      return next(err);
    }

    else if (!user) {
      return res.redirect('/login');
    }

    res.render('dashboard.ejs');
  });
});

app.listen(3000, () => console.log('App started on port 3000...'));
