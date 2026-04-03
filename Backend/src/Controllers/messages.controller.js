import { User } from "../Models/User.model.js";
export const getAllContacts = async (req, res) => {
  try {
    const loggedInUser = req.user._id;

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUser }, // return all users except the logged in user
    }).select("-password"); // return all users data except the password

    res.status(200).json({ contacts: filteredUsers });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
