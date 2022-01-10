//require maongoose
const mongoose = require("mongoose");

//require bcrypt
const bcrypt = require("bcrypt");

//dotenv
require("dotenv").config();

const userSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: mongoose.Types.ObjectId, ref: "Role" },
});
//declare salt value
const salt = 5;
// //this function is premiddleware for hashing the password
userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, salt);
});

//this function is premiddleware for lower case
userSchema.pre("save", async function () {
  this.email = this.email.toLowerCase();
});

module.exports = mongoose.model("User", userSchema);
