import mongoose from "mongoose";
import validator from "validator";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your name"],
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email",
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide your password"],
    minlength: 6,
  },
  lastName: {
    type: String,
    maxlength: 20,
    trim: true,
    default: "lastName",
  },
  location: {
    type: String,
    maxlength: 20,
    trim: true,
    default: "my city",
  },
  numTel: {
    type: Number,
    maxlength: 8,
    minlength: 8,
    trim: true,
  },
});

module.exports.User = mongoose.model("User", UserSchema);
