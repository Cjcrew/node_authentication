const express     = require('express');
const bodyParser  = require('body-parser');
const mongoose    = require('mongoose');
const app         = express();
const User        = require('./models/user');

// APP CONFIG
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

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

app.get('/register', (req, res) => {
  res.render('register.ejs')
});

app.get('/dashboard', (req, res) => {
  res.render('dashboard.ejs')
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

app.listen(3000, () => console.log('App started on port 3000...'));
