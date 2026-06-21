import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js"; // to read environment variables
import { app, server } from "./lib/socket.js";
import authRoutes from "./Routes/auth.route.js";
import messagesRoutes from "./Routes/message.route.js";

app.use(
  cors({
    origin: ENV.CLIENT_URL,
    credentials: true,
  }),
);

app.use(cookieParser()); // to read cookies from request headers
app.use(express.json({ limit: "5mb" })); // to read json data from request body
//limit to ignore when send image give me in backend entity too latge

app.use("/api/auth", authRoutes);
app.use("/api/messages", messagesRoutes);

const port = ENV.PORT || 3000;
server.listen(port, () => {
  console.log(`server running in port ${port}`);
  connectDB();
});
