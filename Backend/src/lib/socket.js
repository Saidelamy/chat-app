import express from "express";
import http from "http";
import { Server } from "socket.io";
import { socketAuthMiddleware } from "../Middlewares/socketAuth.middleware";
import { ENV } from "./env";

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

// sorting online user
const userSocketMap = {};

// listen for connections
io.on("connection", (socket) => {
  console.log("connected user", socket.user.fullName);

  const userId = socket.userId;
  userSocketMap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // with socket.on we listen to events from cleints
  socket.on("disconnected", () => {
    console.log("user desconnected", socket.user.fullName);

    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap)); //after delete disconnected user return connected user
  });
});

export { app, io, server };
