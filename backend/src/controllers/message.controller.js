import User from "../models/user.model.js";
import Message from "../models/message.model.js";
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
        { senderId: myId, recieverId: userToChatId },
        { senderId: userToChatId, recieverId: myId },
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

export const sendMessage = async (req,res)=>{
    try{
        const {text,image} = req.body;
        const {id : recieverId} = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            recieverId,
            text,
            image:imageUrl
        })

        const savedMessage = await newMessage.save();

        // todo : realtime functionality

        res.status(200).json(savedMessage);

    }catch(err){
        console.log("Error in sendMessage",err);
        res.status(500).json({
            message:"Internal server error"
        })
    }
}
