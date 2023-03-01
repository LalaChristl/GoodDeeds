import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    coordinates: {
      type: [Number],
      required: true,
    },
    address: String,
    label: String,
  },
  { timestamps: true }
);

export default mongoose.model("Marker", userSchema);
