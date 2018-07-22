// ===================================================
const express     = require('express');
const middlewareObj = {};
// ===================================================


middlewareObj.loginRequired = (req, res, next) => {
  if (!req.user) {
    return res.redirect('/login');
  } else {
    next();
  }
}

middlewareObj.ifLoggedIn = (req, res, next) => {
  if (!req.user) {
    next();
  } else {
    return res.redirect('/dashboard');
  }
}

module.exports = middlewareObj;
