import mongoose from "mongoose";

const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    task: {
      type: String,
      required: true,
    },
    taskDetails: {
      type: String,
      required: true,
    },
    // Check this DATE/TIME input how it's working!
    taskTime: String,
    taskDate: String,
    // Difficulty level
    // taskCategory: {
    //   type: String,
    //   required: true,
    // },
    location: String,
    coordinates: {
      type: [Number],
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },

  { timeStamps: true }
);

export default mongoose.model("Task", taskSchema);
