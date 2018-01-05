
/* global describe it */

/*
 * Module dependencies.
 */

var mongoose = require('mongoose')
var MongooseConnection = require('../lib')
var config = require('./fixtures/config')
var should = require('should')

/*
 * Tests.
 */

// Running the test requires a local MongoDB instance with the specified
// configuration in config.js
describe('mongoose-connection', function () {
  it('should connect to the MongoDb instance', function (done) {
    // Test to see if we could connect to the database
    var mc = new MongooseConnection(config)

    mc.connect()

    // Test to see if the model was properly loaded
    var User = mongoose.model('User')
    var user = new User({firstName: 'John', lastName: 'Smith'})

    // Test to see if it saved the user object properly
    user.save(function (err, user) {
      should.not.exist(err)
      should.exist(user)
      done()
    })
  })
})
