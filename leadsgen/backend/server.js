import express from "express";
import dotenv from "dotenv";
import routes from "./Routes/Routes.js";
import { connectDB } from "./Utils/dbConnection.js";

import cors from "cors"
const app = express()
dotenv.config();
app.use(cors({
  origin: process.env.FRONTEND_URL, // or your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

// ✅ Connect DB first
connectDB();

// ✅ Always use express.json() BEFORE routes
app.use(express.json());

// ✅ Mount routes
app.use("/api/v1", routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
