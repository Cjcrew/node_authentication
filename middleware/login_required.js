const express     = require('express');

function loginRequired(req, res, next) {
  if (!req.user) {
    return res.redirect('/login');
  }
  next();
}

module.exports = loginRequired;
