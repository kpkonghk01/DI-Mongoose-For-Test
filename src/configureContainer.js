const { asValue, asFunction, createContainer, Lifetime } = require('awilix');
const MongooseDriver = require('./drivers/MongooseDriver');

const container = createContainer();

container
  // drivers
  .register({
    mongoose: asValue(
      new MongooseDriver({
        debug: false,
        uri: 'mongodb://localhost:27018',
        name: 'replace-test',
      }).getClient(),
      { lifetime: Lifetime.SINGLETON }
    ),
    // Demo: asFunction(Demo, { lifetime: Lifetime.SINGLETON }),
  })
  .loadModules(
    [
      'src/models/**/*.js',
    ], 
    {
      resolverOptions: {
        register: asFunction,
        lifetime: Lifetime.SINGLETON,
      }
    }
  );

module.exports = container;