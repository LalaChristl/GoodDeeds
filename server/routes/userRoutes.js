import express from "express";
import { register, login } from "../controllers/helperController.js";

const router = express.Router();

router.post("/helperregister", register);
router.post("/helperlogin", login);

export default router;
