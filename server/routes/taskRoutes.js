import express from "express";
import auth from "../middlewares/auth.js";
import {
  listTask,
  addTask,
  editTask,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.get("/list", auth, listTask);
router.post("/add", addTask);
router.delete("/delete", auth, deleteTask);
router.put("/edit", auth, editTask);

export default router;
