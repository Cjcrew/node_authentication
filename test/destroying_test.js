// MORE MOCHA JS TESTING
const assert      = require('assert');
const User        = require('../models/user');

describe('Deleting records', function() {

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
      // Checking if the user is no longer in memory and has been saved to the db.
      assert(user.isNew === false);
    });
    done();
  });

  // Create tests
    it('Deletes one user from the db', function(done) {
      User.findOneAndRemove({name: 'Test'}).then(function() {
        User.findOne({name: 'Test'}).then(function(result) {
          assert(result === null);
        });
      });
      done();
    });
});
