import express from "express";
import dotenv from "dotenv";
import db from "./config/db.js";

dotenv.config();

const app = express();

db();

const port = process.env.PORT || 5001;
app.listen(port, () => console.log("Server is up and running at port", port));
