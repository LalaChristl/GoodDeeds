import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import markerRoutes from "./routes/markerRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

import db from "./config/db.js";

dotenv.config();

const app = express();

db();

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "https://good-deeds.vercel.app/"
        : "http://localhost:3000",
    credentials: true,
    preflightContinue: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/users", userRoutes);
app.use("/markers", markerRoutes);
app.use("/tasks", taskRoutes);

const port = process.env.PORT || 5001;
app.listen(port, () => console.log("Server is up and running at port", port));
