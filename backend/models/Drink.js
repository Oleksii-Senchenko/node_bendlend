const { Schema, model } = require("mongoose");

const drinkSchema = new Schema({
  title: { type: String, required: [true, "db:title is required"] },
  value: { type: Number, default: 0.5 },
  price: { type: Number, default: 130 },
  adault: { type: Boolean, required: [true, "db:adault is required"] },
  owner: {
    type: Schema.Types.ObjectId,
  },
});
module.exports = model("drink", drinkSchema);
