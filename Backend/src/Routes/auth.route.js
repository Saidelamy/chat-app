import express from "express";
import {
  login,
  logout,
  signup,
  updateProfile,
} from "../Controllers/auth.controller.js";
import { arcjetProtection } from "../Middlewares/arcjet.middleware.js";
import { protectRoute } from "./../Middlewares/auth.middleware.js";

const router = express.Router();

router.use(arcjetProtection); // extend the arcjet protection to all routes in this router

router.get("/test", (req, res) => {
  res.status(200).json({ message: "test" }); // for test logic only
});

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.put("/update-profile", protectRoute, updateProfile);

router.put("/check", protectRoute, (req, res) => {
  // make this route to check if the user is authenticated or not by sending a request to it from the frontend when the app loads
  res.status(200).json({ message: "User is authenticated", user: req.user });
});

export default router;
