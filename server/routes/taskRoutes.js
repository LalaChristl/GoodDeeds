import express from "express";
import auth from "../middlewares/auth.js";
import {
  listTask,
  addTask,
  editTask,
  deleteTask,
  findOne,
} from "../controllers/taskController.js";

const router = express.Router();

router.get("/list", listTask);
router.post("/add", addTask);
router.delete("/delete/:_id", deleteTask);
router.put("/edit", editTask);
router.get("/findone/:_id", findOne); //edit user function

export default router;
