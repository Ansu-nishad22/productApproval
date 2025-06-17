
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt"
import "dotenv/config"
import jwt from "jsonwebtoken"




const register = async (req, res) => {
    const { username, password ,isAdmin} = req.body;
    const existing = await User.findOne({ username })

    if (existing) {
        return res.status(400).json({ message: "user exists!!" })
    }

    const hashed = await bcrypt.hash(password, 10)
    const user = await User.create({ username, password, hashed ,isAdmin})
    console.log("user" , user);

    res.status(200).json({message : "registered"})
    
}

const login = async (req, res) => {
    const { username, password , } = req.body;
    const user = await User.findOne({ username })

    if(!user) {
        res.status(404).json({message : "invalid credentials"})
    }


    const token = jwt.sign(
        {
            id : user._id,
            isAdmin : user.isAdmin
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }

    )

    // res.status(200).json({message : "login successfull!!!"})
    res.json({token})
    
}



export {register,login}