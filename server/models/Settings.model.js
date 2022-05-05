import mongoose from "mongoose";

const SettingsSchema = new mongoose.Schema(
  {
    carousel: {
      type: [String],
      minlength: 4,
    },
    categories: {
      type: [String],
      minlength: 4,
    },
    featuredProduct: {
      type: [String],
      minlength: 4,
    },
    recommendedProduct: {
      type: [String],
      minlength: 4,
    },
    partner: {
      type: [String],
      minlength: 4,
    },
    terms_conditions: {
      type: String,
      required: [true, "Please provide your terms and conditions"],
    },
    Privacy_Policy: {
      type: String,
      required: [true, "Please provide your Privacy and Policy"],
    },

    AboutUs: {
      type: String,
      required: [true, "Please provide your About Us description"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Settings", SettingsSchema);
