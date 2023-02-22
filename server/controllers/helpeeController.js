import HelpeeUser from "../models/HelpeeModel.js";
import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import verifyEmail from "../utilities/verifyEmail.js";

const SALT_ROUNDS = 10;

export const helpeeRegister = async (req, res) => {
  try {
    console.log("🦩~ Hello from Helpee Register", req.body);

    const salt = await bcrypt.genSalt(SALT_ROUNDS);

    const hashedPass = await bcrypt.hash(req.body.password, salt);
    console.log("🦩~ Helpee Register ~ hashedPass", hashedPass);

    req.body.password = hashedPass;

    const user = await HelpeeUser.create(req.body);

    // const token = jwt.sign(
    //   {
    //     id: user._id,
    //   },
    //   process.env.JWT,
    //   { expiresIn: "1h" }
    // );

    // verifyEmail(token);

    console.log("🦩~ Helpee Register ~ user", user);

    res.send({ success: true });
  } catch (error) {
    console.log("🦩~ Helpee Register Error", error.message);

    res.send({ success: false, error: error.message });
  }
};
