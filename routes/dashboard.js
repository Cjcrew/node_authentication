const express     = require('express');
const mongoose    = require('mongoose');
const router      = express.Router();
const sessions    = require('client-sessions');
const User        = require('../models/user');

// =======================
//      DASHBOARD ROUTE
// =======================
router.get('/', (req, res, next) => {
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

module.exports = router;
