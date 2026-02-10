import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./lib/db.js";
import authRoutes from "./Routes/auth.route.js";
import messagesRoutes from "./Routes/message.route.js";

dotenv.config(); //to read .env file and set environment variables
const app = express();

app.use(express.json()); // to read json data from request body

app.use("/api/auth", authRoutes);
app.use("/api/messages", messagesRoutes);

const port = process.env.Port || 3000;
app.listen(port, () => {
  console.log(`server running in port ${port}`);
  connectDB();
});
