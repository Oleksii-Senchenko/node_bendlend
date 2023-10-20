const { Schema, model } = require("mongoose");

const drinkSchema = new Schema({
  title: { type: String, required: [true, "db:title is required"] },
  value: { type: Number, default: 0.5 },
  price: { type: Number, default: 130 },
  adult: { type: Boolean, required: [true, "db:adult is required"] },
});
module.exports = model("drink", drinkSchema);
