import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import markerRoutes from "./routes/markerRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import cookieParser from "cookie-parser";

// import helpeeRoutes from "./routes/helpeeRoutes.js";

import db from "./config/db.js";

dotenv.config();

const app = express();

db();
app.use(express.json());
app.use(cookieParser());

app.use("/users", userRoutes);
app.use("/markers", markerRoutes);
app.use("/tasks", taskRoutes);

// app.use("/helpees", helpeeRoutes);

const port = process.env.PORT || 5001;
app.listen(port, () => console.log("Server is up and running at port", port));
