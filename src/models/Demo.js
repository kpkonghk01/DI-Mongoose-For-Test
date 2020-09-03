module.exports = ({ mongoose }) => {
  const { Schema } = mongoose;
  
  const demoSchema = new Schema(
    {
      something: {
        type: String,
      },
    },
  );

  return mongoose.model('Demo', demoSchema, 'demos');
};
