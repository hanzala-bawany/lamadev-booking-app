import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required : true,
    lowercase: true,
  },
  email: {
    type: String,
    required : true,
    lowercase: true,
  },
  password : {
    type: String,
    required : true,
 },
  city: {
    type: String,
    required : true,
    lowercase: true,
  },
  isAdmin : {
    type : Boolean,
    default : false
  }
}, { timestamps: true })


export const users =  mongoose.model('user', userSchema);