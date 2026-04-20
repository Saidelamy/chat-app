import express from "express";
import {
  getAllContacts,
  getChatPartners,
  getMessagesByContactId,
  sendMessage,
} from "../Controllers/messages.controller.js";
import { arcjetProtection } from "../Middlewares/arcjet.middleware.js";
import { protectRoute } from "../Middlewares/auth.middleware.js";
const route = express.Router();

//this line will be run first then continu for other lines so use protect route here insted of use in every line
route.use(arcjetProtection, protectRoute);

route.get("/contacts", getAllContacts);
route.get("/chats", getChatPartners);
route.get("/:contactId", getMessagesByContactId);
route.post("/send/:contactId", sendMessage);

export default route;
