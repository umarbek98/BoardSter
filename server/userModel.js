const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide and Email!"],
    unique: [true, "Email Exists"],
  },

  password: {
    type: String,
    unique: false,
  },
});

UserSchema.plugin(passportLocalMongoose);
const User = mongoose.model("user", UserSchema);

module.exports = { User };
