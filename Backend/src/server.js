import dotenv from "dotenv";
import express from "express";
import authRoutes from "./Routes/auth.route.js";
import messagesRoutes from "./Routes/message.route.js";

dotenv.config();

const app = express();

app.use("/api/auth", authRoutes);
app.use("/api/messages", messagesRoutes);

const port = process.env.Port || 3000;
app.listen(port, () => {
  console.log(`server running in port ${port}`);
});
