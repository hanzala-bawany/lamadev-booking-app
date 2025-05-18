import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    maxPeople: {
        type: Number,
        required: true
    },
    descr: {
        type: String,
        required: true
    },
    roomNumbers: [{
        number: Number,
        unavailableDates: {
            type: [Date]
        }
    }]
    //  OR   roomNumbers : [{ number : {type :  Number}  , unavailableDates : {type : [String]} }]
}, { timestamps: true , strict : true })


export const Rooms = mongoose.model('room', roomSchema);