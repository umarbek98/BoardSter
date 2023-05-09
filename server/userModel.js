const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide and Email!"],
    unique: [true, "Email Exists"],
  },

  password: {
    type: String,
    unique: false,
  },

  name: {
    type: String,
  },

  orders: Array,
});

UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });
const User = mongoose.model("user", UserSchema);

module.exports = { User };
