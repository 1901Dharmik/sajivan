import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      index: true,
    //   lowercase: true,
    //   trim: true,
    },
    slug: { type: String, unique: true, required: true, lowercase: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Brand || mongoose.model("Brand", brandSchema);
