# mongoose-connection
MongooseConnection loads Mongoose models from a directory and connects to a MongoDB instance.


## Installation

	$ npm install mongoose-connection

## Usage

```js
var mongoose = require('mongoose')
var MongooseConnection = require('mongoose-connection')

// Define database connection options
var opts = {
	username: 'user',
	password: 'pass',
	host: 'localhost',
	port: 27107,
	database: 'db',
	modelsFilePath: __dirname + '/models'
}

// Create the MongooseConnection object
var mc = new MongooseConnection(opts);

// Connect to your database
mc.connect()

// Access your models
var User = mongoose.models('User')

```

## License
MIT
