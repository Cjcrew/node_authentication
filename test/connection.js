const mongoose = require('mongoose');

// ES6 Promises
mongoose.Promise = global.Promise;

// Connect to db before tests run.  <== Using a Mocha Hook function ==>
before(function(done){
  // Connect to mongoDB
  mongoose.connect('mongodb://localhost/auth');

  mongoose.connection.once('open', function(){
    console.log('Connection to the db has been made');
    done();
  }).on('error', function(error){
    console.log('Connection error:', error);
  });
});
