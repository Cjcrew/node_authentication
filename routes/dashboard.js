const express       = require('express');
const mongoose      = require('mongoose');
const router        = express.Router();
const sessions      = require('client-sessions');
const User          = require('../models/user');
const loginRequired = require('../middleware/login_required');

// =======================
//      DASHBOARD ROUTE
// =======================
router.get('/', loginRequired, (req, res, next) => {
  res.render('dashboard.ejs');
});

module.exports = router;
