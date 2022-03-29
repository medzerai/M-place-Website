import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const ClientSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "Please provide your firstname"],
      minlength: 3,
      maxlength: 20,
      trim: true,
    },
    lastname: {
      type: String,
      required: [true, "Please provide your lastname"],
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
    profile_img: {
      type: String,
      minlength: 20,
      default:
        "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0=",
    },
    password: {
      type: String,
      required: [true, "Please provide your password"],
      minlength: 6,
      select: false,
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
      default: "22666333",
      // unique: true,
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

ClientSchema.methods.createVerJWT = function () {
  return jwt.sign({ clientId: this._id }, process.env.VER_JWT_SECRET, {
    expiresIn: process.env.VER_JWT_LIFETIME,
  });
};

ClientSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

export default mongoose.model("Client", ClientSchema);
