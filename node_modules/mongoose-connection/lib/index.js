
/*
 * Module dependencies.
 */

var mongoose = require('mongoose')
var mongodbUri = require('mongodb-uri')
var loader = require('mongoose-model-loader')
var debug = require('debug')('mongoose-connection')

/*
 * MongooseConnection loads Mongoose models from a directory and connects to a
 * MongoDB instance.
 * @api {string} opts.username - the username credentials for the database
 * @api {string} opts.password - the password credentials for the database
 * @api {Object} opts.host - the database host
 * @api {string} opts.database - the name of the database
 * @api {string} opts.modelsFilePath - the file path that contains the models
 * @api public
 */

function MongooseConnection (opts) {
  this.username = opts.username
  this.password = opts.password
  this.host = opts.host
  this.database = opts.database
  this._loadModels(opts.modelsFilePath)
}

/*
 * Loads the models from the specified file path.
 * @param {string} modelsFilePath - the file path that contains the models
 * @api private
 */
MongooseConnection.prototype._loadModels =
  function _loadModels (modelsFilePath) {
    loader(modelsFilePath)
  }

/*
 * Returns the database connection options.
 * @api private
 */
MongooseConnection.prototype._getOpts = function _getOpts () {
  return {
    username: this.username,
    password: this.password,
    hosts: [this.host],
    database: this.database
  }
}

/*
 * Connect to the MongoDB instance using Mongoose.
 * @api private
 */
MongooseConnection.prototype.connect = function connect () {
  var uri = mongodbUri.format(this._getOpts())
  debug(uri)
  mongoose.connect(uri)
}

/*
 * Module exports.
 */

module.exports = MongooseConnection
