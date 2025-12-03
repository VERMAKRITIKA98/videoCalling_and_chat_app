import User from "../models/user.model.js";

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
            returnres.status(400).json({ message : 'user already exists, please use a different email'});
        }

        const idx =  Math.floor(Math.random()*100) + 1; //generate a random number between 1-100.
        const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`

        const newUSer = new User.create({
            email,
            name,
            password,
            profilePic: randomAvatar 
        })
        const token = jwt.sign({userId : newUSer._id}, process.env.JWT_SECRET_KEY, {
            expiresInn: "7d"
        })
        res.cookies("jwt", token, {
            maxAge: 
        })
    } catch (error) {
        
    }
};
export const login =  (req, res)=>{
    res.send('signup route')
};
export const logout =  (req, res)=>{
    res.send('signup route')
};
