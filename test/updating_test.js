// MORE MOCHA JS TESTING
const assert      = require('assert');
const User        = require('../models/user');

describe('Updating records', function() {

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
    it('Updates one user from the db', function(done) {

      User.findOneAndUpdate({name: 'Test'}, {name: 'UpdatedTest'}).then(function() {
        User.findOne({_id: user._id}).then(function(result) {
          assert(result.name === 'UpdatedTest');
        });
      });
      done();
    });
});
