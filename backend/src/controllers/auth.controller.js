import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import cloudinary from "../lib/cloudinary.js";
export const signup = async(req,res)=>{
    const {fullName,email,password}=req.body;  
    try{
       if(!fullName || !email || !password){
        return res.status(400).json({message:"All fields are Required !"})
       }

       if(password.length<6){
        return res.status(400).json({message:"Password must be at least 6 characters"});
       }
       const user = await User.findOne({email});
       if(user){
        return res.status(400).json({message:"Email already exist"});
       }
       
       const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(password,salt);
       const newUser = new User({
        fullName,
        email,
        password:hashedPassword
       });

       if(newUser){
        // Generate JWT token
        generateToken(newUser,res);
        await newUser.save();
        res.status(201).json({
            _id : newUser._id,
            fullName : newUser.fullName,
            email : newUser.email
        });
       }
       else{
        return res.status(400).json({message:"Invalid User data"});
       }
    } catch(error){
        console.log("Error in Signup Controller ", error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
};

export const login = async(req,res)=>{
    const {email,password} = req.body;
    try{
        if(!email || !password){
            return res.status(400).json({message:"All fields are Required !"});
        }
        if(password.length<6){
            return res.status(400).json({messsage:"Password must be at least 6 characters"});
        }
        const user = await User.findOne({email});
        if(!user){
            // Redirect to signup page
            return res.status(400).json({messsage:"Invalid Credential"});
        }
        // if(password!=user.password) Password was hashed and stored 
        const isPasswordCorrect = await  bcrypt.compare(password,user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({messsage:"Invalid Credential"});
        }
        generateToken(user._id,res);
        res.status(200).json({
            _id : user._id,
            fullName:user.fullName,
            email:user.email,
            profilePic : user.profilePic
        })
        
    }catch(error){
        console.log("Error in Login Controller ", error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export const logout = (req,res)=>{
    // If loggedOut,  Clear the cookies
    try{
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"Logged Out Successfully"});
    }catch(error){
        console.log("Error in Logout Controller ", error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export const updateProfile = async(req,res)=>{
    try{
        const {profilePic} = req.body;
        const userId = req.user._id;

        if(!profilePic){
            return res.status(400).json({message:"Profile Pic is required"});
        }

        const uploadedResponse = cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(userId,{profilePic:uploadedResponse.secure_url},{new:true});

        res.status(200).json(updatedUser);

    } catch(error){
        console.log("Error in Updating profile Pic");
        res.status(500).json({message:"Internal server Error"});
    }
}

export const checkAuth =(req,res)=>{
    try{
        res.status(200).json(req.user);
    } catch(error){
        console.log("Error in checkAuth controller : ",error);
        res.status(500).json({message:"Internal Server Error"});
    }
}