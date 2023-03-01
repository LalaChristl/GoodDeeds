import Task from "../models/Tasks.js";

export const addTask = async (req, res) => {
  try {
    console.log("🦩 ~ hello addTask", req.body);

    req.body.owner = req.user;

    const task = await (
      await Task.create(req.body)
    ).populate({ path: "owner", select: "name email image age" });

    console.log("🦩 ~ addTask ~ task", task);

    res.send({ success: true, task });
  } catch (error) {
    console.log("🦩 ~ addTask ~ error", error.message);

    res.send({ success: false, error: error.message });
  }
};

export const listTask = async (req, res) => {
  try {
    console.log("🦩 ~ hello listTask ");

    const tasks = await Task.find()
      .select("-__v")
      .populate({ path: "owner", select: "name email image" }); // post owner

    res.send({ success: true, tasks });
  } catch (error) {
    console.log("🦩 ~ listTask ~ error", error.message);

    res.send({ success: false, error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    console.log("🦩 ~ hello deleteTask ", req.body);

    const deletedTask = await Task.findByIdAndDelete({
      _id: req.body.id,
      owner: req.user,
      // Using Thunderclient change to req.body.owner
    });

    if (!deletedTask) return res.send({ success: false, errorId: 1 }); // not found

    res.send({ success: true });
  } catch (error) {
    console.log("🦩 ~ deleteTask ~ error", error.message);

    res.send({ success: false, error: error.message });
  }
};

export const editTask = async (req, res) => {
  try {
    console.log("🦩 ~ product editTask hello", req.body);

    const { _id, ...task } = req.body;
    console.log("🦩 ~ _id, task", _id, task);

    const newTask = await Task.findByIdAndUpdate(
      { _id },
      { ...task },
      { new: true }
    );
    console.log("🦩 ~ module.exports.edit= ~ newTask", newTask);

    if (!newTask) return res.send({ success: false, errorId: 1 });

    res.send({ success: true, task: newTask });
  } catch (error) {
    console.log("🦩 ~ task edit error", error.message);

    res.send({ success: false, error: error.message });
  }
};
