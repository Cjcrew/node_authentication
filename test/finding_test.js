// MORE MOCHA JS TESTING
const assert      = require('assert');
const User        = require('../models/user');

describe('Finding records', function() {

// <== Using a Mocha Hook function ==>
  beforeEach(function(done){
    var user = new User({
      username:   "Test",
      firstName:  "John",
      lastName:   "Doe",
      email:      "something@dev.com",
      password:   "12345"
    });

    user.save().then(function(){
      // Checking if the user is no longer in memory and has been saved to the db.
      assert(user.isNew === false);
    });

    done();
  });

  // Create tests
    it('Finds one user from the db', function(done) {

      User.findOne({username: 'Test'}).then(function(result){
        assert(result.name === 'Test');
      });

    done();
    });
});
