import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required : true,
    // lowercase: true,
  },
  type: {
    type: String,
    required : true,
    // lowercase: true,
  },
  city : {
    type: String,
    required : true,
    // lowercase: true,
 },
  address: {
    type: String,
    required : true,
    // lowercase: true,
  },
  distance: {
    type: String,
    required : true,
    // lowercase: true,
  },
  photos : {
    type : [String]
  },
  title : {
    type: String,
    // lowercase: true,
  },
  discr: {
    type: String,
    // lowercase: true,
  },
  rating : {
    type : Number,
    min : 0,
    max : 5 
  },
  rooms: {
    type: [String], 
    // lowercase: true
  },
  cheapestPrice : {
    type : Number,
    require : true
  },
  featured : {
    type : Boolean,
    default : false
  }
}, { timestamps: true })


export const Hotel =  mongoose.model('hotel', hotelSchema);