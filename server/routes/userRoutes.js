import express from "express";
import {
  register,
  login,
  emailConfirm,
  forgotPass,
  changePass,
  getUser,
  getUser2,
  edit
} from "../controllers/userController.js";
// import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/emailconfirm", emailConfirm);
router.post("/forgotpass", forgotPass);
router.post("/changepass", changePass);
router.get('/getuser/:_id', getUser);
router.get('/getuser2/:_id', getUser2);
router.patch('/editProfile', edit);
export default router;
