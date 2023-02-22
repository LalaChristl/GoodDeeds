import HelperUser from "../models/HelperModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import verifyEmail from "../utilities/verifyEmail.js";

const SALT_ROUNDS = 10;

export const helperRegister = async (req, res) => {
  try {
    console.log("🦩~ Hello from Helper Register", req.body);

    const salt = await bcrypt.genSalt(SALT_ROUNDS);

    const hashedPass = await bcrypt.hash(req.body.password, salt);
    console.log("🦩~ Helper Register ~ hashedPass", hashedPass);

    req.body.password = hashedPass;

    const user = await HelperUser.create(req.body);

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT,
      { expiresIn: "1h" }
    );

    verifyEmail(token);

    console.log("🦩~ Helper Register ~ user", user);

    res.send({ success: true });
  } catch (error) {
    console.log("🦩~ Helper Register Error", error.message);

    res.send({ success: false, error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    console.log("🦩~ Hello from Helper Login", req.body);

    const user = await HelperUser.findOne({
      username: req.body.username,
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

    const user = await HelperUser.findByIdAndUpdate(
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
