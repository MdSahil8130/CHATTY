import User from "../models/user.model.js";
import { generateToken } from "../lib/utils.js";
import bcrypt from "bcryptjs";
export const signup = async (req, res) => {
  const {fullName, email, password} = req.body;
  try {
    if(!fullName || !email || !password){
      return res.status(400).json({message:"Please fill all fields"});
    }
    //hash password
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName: fullName,
      email: email,
      password: hashedPassword,
    });

    if (newUser) {
      // generate jwt token
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid User Data" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "error in signup controller" });
  }
};

export const signin = (req, res) => {
  res.send("signin route");
};

export const logout = (req, res) => {
  res.send("logout route");
};
