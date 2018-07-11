// MOCHA JS TESTING
const assert      = require('assert');
const User        = require('../models/user');

describe('Saving records', function() {
// this.timeout(15000);

  // Create tests
    it('Saves a user to the database', function(done) {

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
});
