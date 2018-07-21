const express     = require('express');
const mongoose    = require('mongoose');
const router      = express.Router();
const bodyParser  = require('body-parser');
const bcrypt      = require('bcryptjs');
const sessions    = require('client-sessions');
const User        = require('../models/user');

// =======================
//      INDEX ROUTE
// =======================
router.get('/', (req, res) => {
  res.render('index.ejs', { csrfToken: req.csrfToken() });
});

// =======================
//      LOGIN ROUTE
// =======================
router.get('/login', (req, res) => {
  res.render('login.ejs', { csrfToken: req.csrfToken() });
});


// =======================
//    POST LOGIN ROUTE
// =======================
router.post('/login', (req, res) => {
  User.findOne({email: req.body.email}, (err, user) => {
    if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
      return res.render('login', {
        error: 'Incorrect email or password.'
      });
    } else {

    req.session.userId = user._id;
    res.redirect('/dashboard');
    }
  });
});


// =======================
//      REGISTER ROUTE
// =======================
router.get('/register', (req, res) => {
  res.render('register.ejs', { csrfToken: req.csrfToken() });
});


// =======================
//   POST REGISTER ROUTE
// =======================
router.post('/register', (req, res) => {
  let hash = bcrypt.hashSync(req.body.password, 14);
  req.body.password = hash;
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

module.exports = router;
