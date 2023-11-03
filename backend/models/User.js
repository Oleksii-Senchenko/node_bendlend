const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: { type: String, required: [true, "db:email is required"] },
  password: { type: String, required: [true, "db:password is required"] },
  name: { type: String, default: "Arnold Shw" },
  token: { type: String, default: null },
  roles: [{ type: String, ref: "role" }],
});
module.exports = model("user", userSchema);
