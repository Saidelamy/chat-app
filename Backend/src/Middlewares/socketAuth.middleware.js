import jwt from "jsonwebtoken";
import { ENV } from "../lib/env.js";
import { User } from "../Models/User.model.js";

export const socketAuthMiddleware = async (socket, next) => {
  try {
    const token = socket.handshake.headers.cookie
      ?.split("; ")
      .find((row) => row.startsWith("jwt="))
      .split("=")[1];

    if (!token) {
      return next(new Error("Unauthorized - no token provided"));
    }

    const decoded = jwt.verify(token, ENV.JWT_SECRTET_KEY);
    if (!decoded) {
      return next(new Error("Unauthrized - invalid token"));
    }

    // find userin db
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return next(new Error("User not exist"));
    }

    // attach user info to socket server
    socket.user = user;
    socket.userId = user._id.toString();

    console.log(
      `Socket authenticated for user: ${user.fullName} (${user._id})`,
    );

    next();
  } catch (error) {
    console.log("error in socket", error.message);
    next(new Error("Unauthorized - auth failed"));
  }
};
