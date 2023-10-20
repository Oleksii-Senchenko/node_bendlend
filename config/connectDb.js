const { connect } = require("mongoose");

const connectDb = async () => {
  try {
    const db = await connect(process.env.DB_STRING);
    console.log(
      `DB is connected. Name:${db.connection.name}. Port:${db.connection.port}. Host:${db.connection.host}`
        .green.italic.bold
    );
  } catch (error) {
    console.log(error.message.red.bold);
    process.exit(1);
  }
};
module.exports = connectDb;

// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));
