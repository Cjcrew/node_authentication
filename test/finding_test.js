// MORE MOCHA JS TESTING
const assert      = require('assert');
const User        = require('../models/user');

describe('Finding records', function() {

  var user;

// <== Using a Mocha Hook function ==>
  beforeEach(function(done){
    user = new User({
      username:   "Test",
      firstName:  "John",
      lastName:   "Doe",
      email:      "something@dev.com",
      password:   "54321"
    });

    user.save().then(function(){
      done();
    });
  });

  // Create tests
    it('Finds one user from the db', function(done) {

      User.findOne({username: 'Test'}).then(function(result){
        assert(result.name === 'Test');
      });

      done();
    });

    it('Finds one user by id from the db', function(done){

      User.findOne({_id: user._id}).then(function(result) {
        assert(result._id.toString() === user._id.toString());
      });
      done();
    });
});
