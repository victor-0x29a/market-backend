import mongoose from "mongoose";

const NormalStock = new mongoose.Schema({
  product: {
    type: Number,
    required: true,
  },
  user: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  data: {
    type: Date,
    default: Date.now,
  }
}, { timestamps: true });

export default mongoose.model("NormalStock", NormalStock);
