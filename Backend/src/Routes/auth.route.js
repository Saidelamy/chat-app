import express from "express";
import multer from "multer";
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

// multer and update profile end point
const upload = multer({ dest: "uploads/" });
router.put(
  "/update-profile",
  protectRoute,
  upload.single("profilePicture"),
  updateProfile,
);
// router.put("/update-profile", protectRoute, updateProfile);

router.get("/check", protectRoute, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    fullName: req.user.fullName,
    email: req.user.email,
    profilePicture: req.user.profilePicture,
  });
});

export default router;
