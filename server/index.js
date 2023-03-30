import express from "express";
import dotenv from "dotenv";
import userRoutes from "./src/routes/userRoutes.js";
import markerRoutes from "./src/routes/markerRoutes.js";
import taskRoutes from "./src/routes/taskRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

import db from "./src/config/db.js";

dotenv.config();

const app = express();

db();

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "https://good-deeds-6cnn.vercel.app"
        : "http://localhost:3000",
    credentials: true,
    preflightContinue: true,
  })
);
app.options(
  "*",
  cors({
    origin: "https://good-deeds-6cnn.vercel.app",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/users", userRoutes);
app.use("/markers", markerRoutes);
app.use("/tasks", taskRoutes);

const port = process.env.PORT || 5001;
app.listen(port, () => console.log("Server is up and running at port", port));
