import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
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

    age: Number,
    gender: {
      type: String,
    },
    languages: [],
    isHelper: Boolean,
    isHelpee: Boolean,
    isActive: Boolean,
    verified: {
      type: Boolean,
      default: false,
    },
  },

  { timeStamps: true }
);

export default mongoose.model("User", userSchema);
