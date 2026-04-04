import express from "express";
import {
  getAllContacts,
  getMessagesByContactId,
  sendMessage,
} from "../Controllers/messages.controller.js";
import { protectRoute } from "../Middlewares/auth.middleware.js";
const route = express.Router();

route.get("/contacts", protectRoute, getAllContacts);
// route.get("/chats", getChatPartners);
route.get("/:contactId", protectRoute, getMessagesByContactId);
route.post("/send/:contactId", sendMessage);

export default route;
