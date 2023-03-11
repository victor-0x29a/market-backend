import mongoose from "mongoose";

const BreakDownStock = new mongoose.Schema({
  product: {
    type: Number,
    required: true,
  },
  user: {
    type: Number,
    required: true,
  },
  data: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("BreakDownStock", BreakDownStock);
