import mongoose from "mongoose";

const pdfFileSchema = new mongoose.Schema(
  {
    pdfFileName: {
      type: String,
      required: true,
    },
    pdfFileId: {
      type: String,
    },
    pdfFileUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("PDFfile", pdfFileSchema);
