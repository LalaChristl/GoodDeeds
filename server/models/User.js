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
    userName: {
      type: String,
      // default: "defaultUserName", // set a default value for userName
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
    skills: String,

    about: String,
    isHelper: Boolean,
    isHelpee: Boolean,
    isActive: Boolean,
    verified: {
      type: Boolean,
      default: false,
    },
    taskList: [
      {
        type: Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
  },

  { timeStamps: true }
);

export default mongoose.model("User", userSchema);
