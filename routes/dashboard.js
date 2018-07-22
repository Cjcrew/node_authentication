// ===================================================
const express       = require('express');
const mongoose      = require('mongoose');
const router        = express.Router();
const sessions      = require('client-sessions');
const User          = require('../models/user');
const middleware    = require('../middleware/middleware');
// ===================================================


// =======================
// DASHBOARD
// =======================
router.get('/', middleware.loginRequired, (req, res, next) => {
  res.render('dashboard.ejs', { csrfToken: req.csrfToken() });
});

module.exports = router;
