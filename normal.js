const container = require("./src/configureContainer");

const scope = container.createScope();

const Demo = scope.resolve('Demo');

Demo.create({
  something: 'hi'
})
.then(async ({_id}) => {
  console.log(await Demo.findOne(_id));
  process.exit(0);
})
.catch(err => {
  console.log(err)
  process.exit(1);
});