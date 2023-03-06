import express from "express";
import auth from "../middlewares/auth.js";
import {
  listTask,
  addTask,
  editTask,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.get("/list", listTask);
router.post("/add", addTask);
router.delete("/delete", deleteTask);
router.put("/edit", editTask);

export default router;
