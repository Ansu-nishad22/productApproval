import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        username : {
            type : String,
            required : true,
            unique : true,
            lowercase : true,
        },
        password : {
            type : String,
            required : [true, "Password is required"]
        },
        isAdmin : {
            type : Boolean,
            default : false
        }
    }
)
export const User = mongoose.model("User" , userSchema)