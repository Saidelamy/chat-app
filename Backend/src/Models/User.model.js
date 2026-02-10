import { mongoose } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      minLength: 6,
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profilePicture: {
      type: String,
    },
  },
  { timestamps: true }, //createdAt - updatedAt
);

export const User = mongoose.model("User", userSchema);
