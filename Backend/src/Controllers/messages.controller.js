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

    if (!image && !message) {
      return res.status(400).json({ message: "One of fields are required!" });
    }
    if (senderId.equals(contactId)) {
      //use .equals because sender and receiver are object returend from mongoose
      return res
        .status(400)
        .json({ message: "you cann't send message to your self " });
    }
    const receiverExist = await User.exists({ _id: contactId });
    if (!receiverExist) {
      return res.status(404).json({ message: "receiver user not exist" });
    }

    let imageUrl;

    if (image) {
      const uploadResource = await cloudinary.uploader.upload(image);
      imageUrl = uploadResource.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId: contactId,
      message,
      image: imageUrl,
    });
    // this logic just send message to db but i need to send the message to the user who wait for it
    // it will happen by using socket.io
    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("sendMessage error:", error);
    res.status(500).json({ message: "server error", error: error.message });
  }
};

export const getChatPartners = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    // find all message that sender or reciever equal logged in id
    const messages = await Message.find({
      $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
    });

    // get id for another person
    // new set because messages can be dublicated
    const chatPartenerIds = [
      ...new Set(
        messages.map((msg) => {
          return msg.senderId.toString() === loggedInUserId.toString()
            ? msg.receiverId.toString()
            : msg.senderId.toString();
        }),
      ),
    ];

    // return all information about user exept password
    const partener = await User.find({ _id: { $in: chatPartenerIds } }).select(
      "-password",
    );

    res.status(200).json(partener);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
