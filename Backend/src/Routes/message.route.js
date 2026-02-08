import express from "express";
const route = express.Router();

route.get("/send", (req, res) => {
  res.send("get messages");
});
route.get("/receive", (req, res) => {
  res.send("receive messages");
});

export default route;
