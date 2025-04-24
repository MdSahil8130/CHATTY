import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import mongoose from "mongoose";
import cloudinary from "../lib/cloudinary.js";

import { getReceiverSocketId,io } from "../lib/socket.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const fillteredUsers = await User.find({
      _id: { $ne: loggedInUser },
    }).select("-password");

    res.status(200).json(fillteredUsers);
  } catch (err) {
    console.log("Error in getUsersForSidebar", err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (err) {
    console.log("Error in getMessages", err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
 
export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(receiverId)) {
      return res.status(400).json({ message: "Invalid receiver ID" });
    }

    if (!text && !image) {
      return res
        .status(400)
        .json({ message: "Message must contain text or image" });
    }

    let imageUrl;
    if (image) {
      try {
        const uploadResponse = await cloudinary.uploader.upload(image);
        imageUrl = uploadResponse.secure_url;
      } catch (uploadError) {
        console.error("Cloudinary upload error:", uploadError);
        return res.status(500).json({ message: "Image upload failed" });
      }
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    const savedMessage = await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiverId);

    if(receiverSocketId){
      io.to(receiverSocketId).emit("newMessage",newMessage);
    }

    res.status(200).json(savedMessage);
  } catch (err) {
    console.error("Error in sendMessage", err);
    res.status(500).json({ message: "Internal server error messages" });
  }
};
