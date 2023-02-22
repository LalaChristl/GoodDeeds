import express from "express";
const router = express.Router();

import {
  addMarker,
  deleteMarker,
  editMarker,
  listMarker,
  searchMarker,
} from "../controllers/markerController.js";

router.post("/addmarker", addMarker);
router.get("/listmarker", listMarker);

router.get("/editmarker/:_id", editMarker); //edit map function
router.delete("/deletemarker/:_id", deleteMarker); //delete map function

router.post("/searchmarker", searchMarker);
export default router;
