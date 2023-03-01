import express from "express";
import {
  register,
  login,
  emailConfirm,
  forgotPass,
  changePass,
} from "../controllers/userController.js";
// import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/emailconfirm", emailConfirm);
router.post("/forgotpass", forgotPass);
router.post("/changepass", changePass);

export default router;
