import { Message } from "../Models/Message.model.js";
import { User } from "../Models/User.model.js";
import cloudinary from "../lib/cloudinary.js";

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

export const getMessagesByContactId = async (req, res) => {
  try {
    const myId = req.user._id;
    const { contactId } = req.params;

    // return messages between me and match contact only
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: contactId },
        { senderId: contactId, receiverId: myId },
      ],
    });

    res.status(200).json({
      message: `messages from this id ${contactId} returned`,
      messages,
    });
  } catch (error) {
    res.status(500).json({ message: "server error", error: error });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { image, message } = req.body;
    const { contactId } = req.params;
    const senderId = req.user._id;

    let imageUrl;

    if (image) {
      const uploadResource = await cloudinary.uploader.upload(image);
      imageUrl = uploadResource.secure_url;
    }

    const newMessage = {
      senderId,
      contactId,
      message,
      image: imageUrl,
    };
    // this logic just send message to db but i need to send the message to the user who wait for it
    // it will happen by using socket.io
    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
};
