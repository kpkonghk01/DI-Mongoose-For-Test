const { asValue, Lifetime } = require('awilix');
const {
  MongoMemoryServer,
} = require('mongodb-memory-server');
const container = require("./src/configureContainer");
const MongooseDriver = require("./src/drivers/MongooseDriver");

const db = new MongoMemoryServer({
  binary: { version: '4.0.19' },
  autoStart: false,
});

let Demo;

(async () => {
  const uri = await db.getUri();
  container
    .register({
      mongoose: asValue(
        new MongooseDriver({
          debug: false,
          uri,
          name: 'replace-test',
        }).getClient(),
        { lifetime: Lifetime.SINGLETON }
      ),
    })

  const scope = container.createScope();

  Demo = scope.resolve('Demo');

  return Demo.create({
    something: 'hi'
  });
})()
  .then(async ({ _id }) => {
    console.log(await Demo.findOne(_id));
    process.exit(0);
  })
  .catch(err => {
    console.log(err)
    process.exit(1);
  });