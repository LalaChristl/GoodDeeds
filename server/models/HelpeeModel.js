import mongoose from "mongoose";

const { Schema } = mongoose;

const helpeeSchema = new Schema(
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

    password: {
      type: String,
      required: true,
    },
    image: String,

    gender: String,
  },
  { timeStamps: true }
);

export default mongoose.model("Helper", helpeeSchema);
