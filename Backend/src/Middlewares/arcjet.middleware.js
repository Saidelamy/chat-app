import { isSpoofedBot } from "@arcjet/inspect";
import aj from "../lib/arcjet.js";

export const arcjetProtection = async (req, res, next) => {
  try {
    const decision = await aj.protect(req);

    // to pass pot middleware postman act like pots
    if (process.env.ARCJET_ENV === "development") {
      return next();
    }

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res
          .status(429) //429 for many requests
          .json({ message: "Too many requests. Please try again later." });
      } else if (decision.reason.isBot()) {
        return res
          .status(403)
          .json({ message: "Access denied. Bots are not allowed." });
      } else {
        return res.status(403).json({ message: "Access denied." });
      }
    }

    // check for spoofed bots act like humans
    if (decision.results.some(isSpoofedBot)) {
      return res
        .status(403)
        .json({ message: "Access denied. spoofed bots detected." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
    next();
  }
};
