import Task from "../models/Tasks.js";

export const addTask = async (req, res) => {
  try {
    console.log("🦩 ~ hello addTask", req.body);

    // req.body.owner = req.user;

    const task = await Task.create({
      owner: req.body.owner,
      task: req.body.task,
      taskDate: req.body.taskDate,
      taskTime: req.body.taskTime,
      taskDetails: req.body.taskDetails,
      location: req.body.location,
      coordinates: [req.body.lng, req.body.lat],
    });

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
      .populate({ path: "owner", select: "firstName email image" }); // post owner

    res.send({ success: true, tasks });
  } catch (error) {
    console.log("🦩 ~ listTask ~ error", error.message);

    res.send({ success: false, error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete({
      _id: req.body.id,
      owner: req.body.owner,
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

export const findOne = async (req, res) => {
  try {
    console.log("Hello from findOne", req.params);

    const task = await Task.findById(req.params._id).select("-__v");

    console.log("findOne", task);

    if (!task) return res.send({ success: false, errorId: 1 });

    res.send({ success: true, task });
  } catch (error) {
    console.log("Error findOne task", error.message);
    res.send({ success: false, error: error.message });
  }
};

export const searchTask = async (req, res) => {
  try {
    console.log("---------------------------------- ");
    console.log("🌞~ product search hello", req.body);

    const filter = {};

    if (req.body.task) {
      const regExp = new RegExp(req.body.task, "i");

      filter.task = regExp;
    }

    // if (req.body.minPrice > 0 || req.body.maxPrice > 0) {
    //   filter.price = {
    //     $gte: req.body.minPrice,
    //     $lte: req.body.maxPrice,
    //   };
    // }
    console.log("----------------------------");
    console.log("🌞 ~ module.exports.search= ~ filter", filter);

    const task = await Task.find(filter);

    console.log("🌞 ~ module.exports.search= ~ tasks", task);

    res.send({ success: true, task });
  } catch (error) {
    console.log("🌞 ~ module.exports.search= ~ tasks", tasks);
    console.log(" 🌞~ tasks search error", error.message);

    res.send({ success: false, error: error.message });
  }
};
