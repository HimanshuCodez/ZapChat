import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/utils.js";
<<<<<<< HEAD
=======
import { protectRoute } from "../middlewares/auth.middleware.js";
>>>>>>> 94fc8cefe4b2ad9b0726d12939384f9c11666515
import cloudinary from "../utils/cloudinary.js";
export const signup = async (req, res) => {
    const { fullname, email, password } = req.body;

    try {
        // Validate input
        if (!fullname || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password should be at least 6 characters long" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new User({ fullname, email, password: hashedPassword });
        await newUser.save();

        // Generate token and send response
        generateToken(newUser._id, res);
        res.status(201).json({
            message: "User created successfully",
            _id: newUser._id,
            fullname: newUser.fullname,
            email: newUser.email,
            profilePic: newUser.profilePic,
        });
    } catch (error) {
        console.error("Error in signup controller:", error.message);
        res.status(500).json({ message: "An error occurred while signing up" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
<<<<<<< HEAD
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const isPassMatch = await bcrypt.compare(password, user.password);
        if (!isPassMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        } else {
=======
        const user =await  User.findOne({ email})
        if(!user){
            return res.status(400).json({ message: "User not found" });
        }
        const isPassMatch = await bcrypt.compare(password, user.password);
        if(!isPassMatch){
            return res.status(400).json({ message: "Invalid credentials" });
        }else {
>>>>>>> 94fc8cefe4b2ad9b0726d12939384f9c11666515
            generateToken(user._id, res);
            res.status(200).json({
                message: "Logged in successfully",
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                profilePic: user.profilePic,
            });
        }
    } catch (error) {
<<<<<<< HEAD
        console.log("login error", error)
=======
        console.log("login error",error)
>>>>>>> 94fc8cefe4b2ad9b0726d12939384f9c11666515
        res.status(500).json({ message: "An error occurred while logging in" });
    }
};

export const logout = async (req, res) => {
<<<<<<< HEAD
    try {
        res.cookie("jwttoken", "", { maxAge: 0 })
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("logout error", error);
        res.status(500).json({ message: "An error occurred while logging out" });

    }
=======
   try {
    res.cookie("jwttoken","",{maxAge:0})
    res.status(200).json({ message: "Logged out successfully" });
   } catch (error) {
    console.log("logout error",error);
    res.status(500).json({ message: "An error occurred while logging out" });
    
   }
>>>>>>> 94fc8cefe4b2ad9b0726d12939384f9c11666515
};

export const updateProfile = async (req, res) => {
    try {
<<<<<<< HEAD
        const { profilePic } = req.body
        //getting decoded token user profile
        const userId = req.user._id
        if (!profilePic) {
            return res.status(400).json({ message: "profile pic is required" })
        }
        const uploadResponse = await cloudinary.uploader.upload(profilePic)
        const updatedUser = await User.findOneAndUpdate(userId, { profilePic: uploadResponse.secure_url }, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        console.log("update profile error", error);
        res.status(500).json({ message: "An error occurred while updating profile" });
    }
}

export const checkAuth = async (req, res) =>{
    try {
        
        res.status(200).json(req.user)
    } catch (error) {
        console.log("checkAuth  controller error", error);
        res.status(500).json({ message: "An error occurred while checking authentication" });
    }
}
=======
        const {profilePic} = req.body
        //getting decoded token user profile
const userId= req.user._id
if (!profilePic) {
    return res.status(400).json({message:"profile pic is required"})
}
const uploadResponse = await cloudinary.uploader.upload(profilePic)
    } catch (error) {
        
    }
}
>>>>>>> 94fc8cefe4b2ad9b0726d12939384f9c11666515
