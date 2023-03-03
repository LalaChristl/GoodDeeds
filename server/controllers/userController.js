import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import verifyEmail from "../utilities/verifyEmail.js";
import changePassEmail from "../utilities/changePassEmail.js";

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
      username: req.body.email,
    }).select("-__v");
    console.log("user", user);

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
