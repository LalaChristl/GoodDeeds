import express from "express";
import {
  helperRegister,
  login,
  emailConfirm,
} from "../controllers/helperController.js";
import { helpeeRegister } from "../controllers/helpeeController.js";

const router = express.Router();

router.post("/helperregister", helperRegister);
router.post("/helperlogin", login);
router.post("/emailconfirm", emailConfirm);
router.post("/helpeeregister", helpeeRegister);

export default router;
