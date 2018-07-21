const express     = require('express');
const mongoose    = require('mongoose');
const sessions    = require('client-sessions');
const User        = require('../models/user');

// Middleware _ Setup
function userInfo(req, res, next) {
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
}

module.exports = userInfo;
