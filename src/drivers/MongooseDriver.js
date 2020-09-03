'use strict';

const { Mongoose } = require('mongoose');

class MongooseDriver {
  constructor({ debug, uri, name }) {
    this.debug = debug;
    this.uri = uri;
    this.name = name;
    this.mongoose = new Mongoose();
  }

  getClient() {
    this.mongoose.set('debug', this.debug);

    this.mongoose.connection.on('error', (err) => {
      console.log(err, 'Mongo connection error')
      throw err;
    });

    this.mongoose.connect(this.uri, {
      keepAlive: true,
      dbName: this.name,
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      autoIndex: true,
      useUnifiedTopology: true,
      maxPoolSize: 5,
    });

    return this.mongoose;
  }
}

module.exports = MongooseDriver;
