import { upsertStreamUser } from "../lib/stream.js";
import User from "../models/user.model.js";
import jwt from 'jsonwebtoken';


export const signup = async (req, res) => {
    const {email, name, password} =  req.body
    try {
        if(!email || !name || !password){
            return res.status(400).json({ message: 'all fields are required.'});
        }
        if(password.length < 6){
            return res.status(400).json({message : 'pssword must be at least of 6 charecters.'});
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({ message : 'invalid email format'});
        }
        const existingUser =  await User.findOne({email});
        if(existingUser){
            return res.status(400).json({ message : 'user already exists, please use a different email'});
        }

        const idx =  Math.floor(Math.random()*100) + 1; //generate a random number between 1-100.
        const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`

        const newUSer = await User.create({
            email,
            name,
            password,
            profilePic: randomAvatar 
        })

        try {
            await upsertStreamUser({
                id: newUSer._id.toString(),
                name: newUSer.name,
                image: newUSer.profilePic || ""
            });
            console.log("Stream user created successfullly");   
        } catch (error) {
            console.log("Error in creating stream user", error)
        }

        const token = jwt.sign({userId : newUSer._id}, process.env.JWT_SECRET_KEY, {
            expiresIn: "7d"
        })
        res.cookie("jwt", token, {
            maxAge: 7*24*60*60*1000,  //7 days in milisecond
            httpOnly: true, //prevent XXS attacks,
            sameSite: "strict", // prevent CSRF attack,
            secure: process.env.NODE_ENV === "production"
        })

        res.status(201).json({success: true, User: newUSer })
    } catch (error) {
        console.log("Error in signup controller", error);
        res.status(500).json({message: "something went wrong"})
    }
};
export const login =  async (req, res)=>{
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({ message : "All fields are required"});
        }
        const user = await User.findOne({ email });
        if(!user){
            return res.status(401).json({ message : "Invalid Email"});
        }

        const isPaswordValid = await user.comparePassword(password);
        if(!isPaswordValid){
            return res.status(401).json({ message : "Invalid password"});
        }
        const token = jwt.sign({userId : user._id}, process.env.JWT_SECRET_KEY, {
            expiresIn: "7d"
        })
        res.cookie("jwt", token, {
            maxAge: 7*24*60*60*1000,  //7 days in milisecond
            httpOnly: true, //prevent XXS attacks,
            sameSite: "strict", // prevent CSRF attack,
            secure: process.env.NODE_ENV === "production"
        })
        res.status(201).json({success: true, User: user});
    } catch (error) {
        console.log("Error in login controller", error);
        res.status(500).json({message: "something went wrong"});

    }
};
export const logout =  (req, res)=>{
    res.clearCookie("jwt");
    res.status(200).json({ success: true, message : "logout successfully"});
};

export const onboard = async (req, res)=>{
    try {
        const userId = req.user._id;
        const {name, bio, nativeLanguage, learningLanguage, location} = req.body;
        if (
            !name?.trim() ||
            !bio?.trim() ||
            !nativeLanguage?.trim() ||
            !learningLanguage?.trim() ||
            !location?.trim()
          ) {          
            return res.status(400).json({message: "All fields are required",
                missingFields: [
                    !name?.trim() && 'name',
                    !bio?.trim() && 'bio',
                    !nativeLanguage && 'nativeLanguages',
                    !learningLanguage && 'learningLanguages',
                    !location?.trim() && 'location',
                ].filter(Boolean),
            });
        }

        //update user info in stream
        try {
            await upsertStreamUser({
                id: updatedUser._id.toString(),
                name: updatedUser.name,
                profilePic: updatedUser.profilePic || "",
           })
            console.log("Stream user updated successfully");
        } catch (stemError) {
            console.log("Error in updating stream user", stemError);
        }
        


        const updatedUser = await User.findByIdAndUpdate(userId, {
            name,
            bio,
            nativeLanguage,
            learningLanguage,
            location,
            isOnboarded: true,
        }, {new: true}); // this will give instant updated user Data
        res.status(200).json({success: true, User: updatedUser});

    }catch(error){
        console.log("Error in onboard controller", error);
        res.status(500).json({message: "something went wrong"});
    }
}