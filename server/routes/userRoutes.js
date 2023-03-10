import express from "express";
import {
  register,
  login,
  logout,
  emailConfirm,
  forgotPass,
  changePass,
  getUser,
  getUser2,
  editUser,
  editUser2,
} from "../controllers/userController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

router.post("/emailconfirm", emailConfirm);
router.post("/forgotpass", forgotPass);
router.post("/changepass", changePass);
router.get("/getuser/:_id", getUser);
router.get("/getuser2/:_id", getUser2);
router.put("/edituser", auth, editUser);
router.put("/edituser2", auth, editUser2);


export default router;
