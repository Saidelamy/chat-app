import express from "express";
import http from "http";
import { Server } from "socket.io";
import { socketAuthMiddleware } from "../Middlewares/socketAuth.middleware.js";
import { ENV } from "./env.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [ENV.CLIENT_URL],
    credentials: true,
  },
});
// middleware to handle all web socket connections ////// very important
io.use(socketAuthMiddleware);

// will use this function to check if the user is online or not
export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// sorting online user
const userSocketMap = {};

// listen for connections
io.on("connection", (socket) => {
  console.log("connected user", socket.user.fullName);

  const userId = socket.userId;
  userSocketMap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // with socket.on we listen to events from cleints
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.user.fullName);

    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap)); //after delete disconnected user return connected user
  });
});

export { app, io, server };
