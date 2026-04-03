import express from "express";
import { getAllContacts } from "../Controllers/messages.controller.js";
import { protectRoute } from "../Middlewares/auth.middleware.js";
const route = express.Router();

route.get("/contacts", protectRoute, getAllContacts);
// route.get("/chats", getChatPartners);
// route.get("/:id", getMessagesByContactId);
// route.post("/send/:contactId", sendMessage);

export default route;
