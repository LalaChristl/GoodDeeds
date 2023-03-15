import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import verifyEmail from "../utilities/verifyEmail.js";
import changePassEmail from "../utilities/changePassEmail.js";
import express from "express";
const router = express.Router();

const SALT_ROUNDS = 10;

export const register = async (req, res) => {
  try {
    console.log("🦩~ Hello from Register", req.body);

    const salt = await bcrypt.genSalt(SALT_ROUNDS);

    const hashedPass = await bcrypt.hash(req.body.password, salt);
    console.log("🦩~ Register ~ hashedPass", hashedPass);

    req.body.password = hashedPass;

    const user = await User.create(req.body);

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT,
      { expiresIn: "1h" }
    );

    verifyEmail(token);

    console.log("🦩~ Register ~ user", user);

    res.send({ success: true });
  } catch (error) {
    console.log("🦩~ Register Error", error.message);

    res.send({ success: false, error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    console.log("🦩~ Hello from Login", req.body);

    const user = await User.findOne({
      email: req.body.email,
    }).select("-__v");
    console.log("🦩~ login user", user);

    if (!user) return res.send({ success: false, errorId: 1 });

    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    console.log("Password Match", passwordMatch);

    if (passwordMatch) {
      const newUser = user.toObject();

      delete newUser.password;

      const token = jwt.sign({ id: user._id }, process.env.JWT, {
        expiresIn: "1h",
      });

      res.cookie("volunteer", token);

      res.send({ success: true, user: newUser });
    } else {
      return res.send({ success: false, errorId: 1 });
    }
  } catch (error) {
    console.log("Login error", error.message);
    res.send({ success: false, error: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    console.log("🦩 ~ hello logout ");

    res.clearCookie("volunteer");

    res.send({ success: true });
  } catch (error) {
    console.log("🦩 ~ logout ~ error", error.message);

    res.send({ success: false, error: error.message });
  }
};

export const emailConfirm = async (req, res) => {
  try {
    console.log("🦩 ~ hello emailConfirm ", req.body);

    const token = req.body.token;

    const decoded = jwt.verify(token, process.env.JWT);
    console.log("🦩 ~ emailConfirm ~ decoded", decoded);

    const user = await User.findByIdAndUpdate(
      { _id: decoded.id },
      { verified: true },
      { new: true }
    );
    console.log("🦩 ~ emailConfirm ~ user", user);

    res.send({ success: true });
  } catch (error) {
    console.log("🦩 ~ emailConfirm ~ error", error.message);

    res.send({ success: false, error: error.message });
  }
};

export const forgotPass = async (req, res) => {
  try {
    console.log("🦩 ~ hello forgotPass ", req.body);

    const user = await User.findOne({
      email: req.body.email,
    });
    console.log("🦩 ~ forgotPass ~ user", user);

    const token = jwt.sign({ id: user._id }, process.env.JWT, {
      expiresIn: "1h",
    });

    changePassEmail(token);

    res.send({ success: true });
  } catch (error) {
    console.log("🦩 ~ forgotPass ~ error", error.message);

    res.send({ success: false, error: error.message });
  }
};

export const changePass = async (req, res) => {
  try {
    console.log("🦩 ~ hello changePass ", req.body);

    const decoded = jwt.verify(req.body.token, process.env.JWT);
    console.log("🦩 ~ changePass= ~ decoded", decoded);

    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    console.log("🦩 ~ changePass= ~ hashedPass", hashedPass);

    const updatedPass = await User.findByIdAndUpdate(
      decoded.id,
      { password: hashedPass },
      { new: true }
    );
    console.log("🦩 ~ changePass= ~ updatedPass", updatedPass);

    res.send({ success: true });
  } catch (error) {
    console.log("🦩 ~ changePass ~ error", error.message);

    res.send({ success: false, error: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params._id).select("-password -__v");
    if (!user) return res.status(404).send("User not found");

    res.send({ success: true, user });
  } catch (error) {
    console.log("Get user error", error.message);
    res.send({ success: false, error: error.message });
  }
};

export const getUser2 = async (req, res) => {
  try {
    const user = await User.findById(req.params._id).select("-password -__v");
    if (!user) return res.status(404).send("User not found");

    res.send({ success: true, user });
  } catch (error) {
    console.log("Get user error", error.message);
    res.send({ success: false, error: error.message });
  }
};

export const editUser = async (req, res) => {
  try {
    console.log("Hello from user edit", req.body);
    if (!req.body.firstName || !req.body.lastName || !req.body.email)
      return res.send({ success: false, errorId: 3 });
    const { _id, ...user } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { ...user },
      { new: true }
    );
    console.log("=updatedUser", updatedUser);
    if (!updatedUser) return res.send({ success: false, errorId: 1 });
    res.send({ success: true });
  } catch (error) {
    console.log("edit user error", error.message);
    res.send({ success: false, error: error.message });
  }
};

export const editUser2 = async (req, res) => {
  try {
    console.log("Hello from user edit", req.body);
    if (!req.body.firstName || !req.body.lastName || !req.body.email)
      return res.send({ success: false, errorId: 3 });
    const { _id, ...user } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { ...user },
      { new: true }
    );
    console.log("=updatedUser", updatedUser);
    if (!updatedUser) return res.send({ success: false, errorId: 1 });
    res.send({ success: true });
  } catch (error) {
    console.log("edit user error", error.message);
    res.send({ success: false, error: error.message });
  }
};

export const taskConfirm = async (req, res) => {
  try {
    console.log("Hello from taskConfirm", req.body);

    const user = await User.findByIdAndUpdate(
      { _id: req.body.user }, // filter
      {
        // updating
        $push: {
          taskList: req.body.task,
        },
      },
      { new: true } // options
    );
    console.log("taskConfirm user", user);

    res.send({ success: true });
  } catch (error) {
    console.log(" taskCofrirm error", error.message);

    res.send({ success: false, error: error.message });
  }
};

export const removeFromConfirm = async (req, res) => {
  try {
    console.log("Hello from remove from Confirm", req.body);

    const user = await User.findById(req.body.user); // step 1 find the user

    const tasklist = user.taskList.filter((item) => {
      // step 2 filter the wishlist array
      return item.toString() !== req.body.task;
    });

    console.log(" module.exports.removeFromtasklist= ~ tasklist", tasklist);

    // step 3 update the user in the db

    const updatedUser = await User.findByIdAndUpdate(
      { _id: req.body.user },
      { tasklist },
      { new: true }
    );
    console.log(
      " module.exports.removeFromWishlist= ~ updatedUser",
      updatedUser
    );

    res.send({ success: true, tasklist });
  } catch (error) {
    console.log("🚀 ~ remove from wishlist error", error.message);

    res.send({ success: false, error: error.message });
  }
};

export const listTaskConfirm = async (req, res) => {
  try {
    console.log("Hello from list wishlist", req.params);

    const user = await User.findById(req.params.user).populate({
      path: "taskList",
      select: "-__v",
    });

    console.log("🚀 ~ module.exports.listWishlist= ~ user", user);

    res.send({ success: true, tasks: user.taskList });
  } catch (error) {
    console.log("🚀 ~ list wishlist error", error.message);

    res.send({ success: false, error: error.message });
  }
};
