import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const POSchema = new mongoose.Schema(
  {
    company_name: {
      type: String,
      required: [true, "Please provide your entreprise name"],
      minlength: 3,
      maxlength: 20,
      trim: true,
    },
    professional_email: {
      type: String,
      required: [true, "Please provide your professional email"],
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
    logo_url: {
      type: String,
      required: [true, "Please provide your logo url"],
    },
    country: {
      type: String,
      maxlength: 20,
      trim: true,
      default: "country",
    },
    city: {
      type: String,
      maxlength: 20,
      trim: true,
      default: "city",
    },
    state: {
      type: String,
      maxlength: 20,
      trim: true,
      default: "state",
    },
    zip_code: {
      type: Number,
      validate: {
        validator: (val) => validator.isLength(val.toString(), 4, 4),
        message: "zip code has to be 4 digits",
      },
      default: 0000,
    },
    address: {
      type: String,
      maxlength: 30,
      trim: true,
      default: "address",
    },
    professional_phone_number: {
      type: Number,
      validate: {
        validator: (val) => validator.isLength(val.toString(), 8, 8),
        message: "phone number has to be 8 digits",
      },
      required: [true, "Please provide your professional phone number"],
      unique: true,
    },
    verification: {
      // 0: not verified, 1: verified/not approved by the admin, 2: verified and approved, 3: blocked, 4: deleted
      type: Number,
      min: 0,
      max: 4,
      default: 0,
    },
    creation_date: {
      type: date,
      default: Date.now(),
    },
    tax_ID_number: {
      type: String,
      minlength: 20,
      maxlength: 20,
      required: [true, "Please provide your tax ID number"],
    },
    tax_ID_card: {
      type: String,
      minlength: 20,
      required: [true, "Please provide your tax ID card URL"],
    },
    owner_ID_type: {
      type: String,
      required: [true, "Please provide your owner_ID_type ( Passport or CIN )"],
    },
    owner_ID: {
      type: String,
      minlength: 20,
      required: [true, "Please provide your owner ID URL"],
    },
    RNE_number: {
      type: Number,
      required: [true, "Please provide your RNE number"],
    },
  },
  { timestamps: true }
);

POSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

POSchema.methods.createJWT = function () {
  return jwt.sign({ POId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

POSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

export default mongoose.model("PO", POSchema);
