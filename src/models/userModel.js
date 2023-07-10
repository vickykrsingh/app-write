import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please provide a email"],
    },
    email:{
        type:String,
        required:[true,"Please provide an email"],
        unique:[true,"User already registered"]
    },
    password:{
        type:String,
        required:[true,"Please provide a password"]
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken:String,
    forgotPasswordTokenExpiry:Date,
    verifyToken:String,
    verifyTokenExpiry:Date,
})

const User = mongoose.models.users || mongoose.model("users",userSchema)

export default User;

