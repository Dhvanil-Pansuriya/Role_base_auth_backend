import express from "express";
import { connect } from "mongoose";
import cors from "cors";
import { config } from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import roleRoutes from "./routes/roleRoutes.js";
import permissionRoutes from "./routes/permissionRoutes.js";

config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cors());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", roleRoutes);
app.use("/api/v1", permissionRoutes);

app.listen(PORT, () => {
  console.log("---------------------------------------------------------------");
  console.log(`| - Server running on port : http://localhost:${PORT}`);
  console.log("---------------------------------------------------------------");
});