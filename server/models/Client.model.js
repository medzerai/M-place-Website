import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const ClientSchema = new mongoose.Schema(
  {
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
      select: false,
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
      validate: {
        validator: (val) => validator.isLength(val.toString(), 8, 8),
        message: "numTel has to be 8 digits",
      },
      required: [true, "Please provide your Tel number"],
      unique: true,
    },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

ClientSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

ClientSchema.methods.createJWT = function () {
  return jwt.sign({ clientId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

ClientSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

export default mongoose.model("Client", ClientSchema);
