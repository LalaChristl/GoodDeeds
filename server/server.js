import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";

import db from "./config/db.js";

dotenv.config();

const app = express();

db();
app.use(express.json());

app.use("/users", userRoutes);

const port = process.env.PORT || 5001;
app.listen(port, () => console.log("Server is up and running at port", port));
