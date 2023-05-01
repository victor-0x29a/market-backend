import mongoose from "mongoose";

const DelStock = new mongoose.Schema({
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
  },
});
export default mongoose.model("DelStock", DelStock);
