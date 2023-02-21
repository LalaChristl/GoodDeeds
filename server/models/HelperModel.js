import mongoose from "mongoose";

const { Schema } = mongoose;

const helperSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phonenumber: {
      type: Number,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: String,
    address: String,
    age: Number,
    gender: {
      type: String,
    },
    languages: String,
  },
  { timeStamps: true }
);

export default mongoose.model("Helper", helperSchema);
