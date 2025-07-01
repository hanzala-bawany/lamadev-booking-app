import { Hotel } from "../models/hotelModel.js";
import { Rooms } from "../models/roomModel.js"
import { errorHandler, successHandler } from "../utills/resposeHandler.js";


// create rooms
export const createRoom = async (req, res) => {

    try {
        const hotelId = req.params.hotelId

        const { title, price, maxPeople, descr, roomNumbers } = req.body
        const data = {}

        if (title) data.title = title
        if (price) data.price = price
        if (maxPeople) data.maxPeople = maxPeople
        if (descr) data.descr = descr
        if (roomNumbers) data.roomNumbers = roomNumbers

        const newRooms = await new Rooms(data)  // newRooms ke  object me mujhe schema se hokar data save hua he 

        const savedRooms = await newRooms.save()
        await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRooms._id } })

        console.log(savedRooms, "---> room created succesfully");
        successHandler(res, 200, `room created successfully`, savedRooms)
    }
    catch (error) {
        console.log(error, "created room me error he");
        errorHandler(res, 500, "Unkown error in created room", error)
    }

}


//  update Room 
export const updateRoom = async (req, res) => {

    console.log(req.body, "--> req.body console");
    const { id } = req.params

    try {
        const updateRoom = await Rooms.findByIdAndUpdate(id, { $set: req.body }, { new: true, runValidators: true })
        console.log("room data update succesfully");
        successHandler(res, 200, "room data updated succesfully", updateRoom)
    }
    catch (error) {
        errorHandler(res, 400, "your info have error")
        console.log("room update me error he : ", error);
    }

}

//  update Room availability 
export const updateRoomAvailability = async (req, res) => {

    const { id: roomId } = req.params

    try {
        const availabilityUpdate = await Rooms.updateOne({ "roomNumbers._id": roomId },
            {
                $push: {
                    "roomNumbers.$.unavailableDates": req.body.date
                }
            })
        console.log("room availability updated succesfully");
        successHandler(res, 200, "room availabiliyt updated succesfully", availabilityUpdate)
    }
    catch (error) {
        errorHandler(res, 400, "your info have error", error)
        console.log("room availability update me error he : ", error);
    }

}

//  delete room
export const deleteRoom = async (req, res) => {
    try {

        const { id } = req.params
        const hotelId = req.params.hotelId
        console.log(hotelId, "---> hotel ki id para,ms se mile");

        const deletedRoom = await Rooms.findByIdAndDelete(id)
        await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: id } })

        console.log("room data deleted succesfully");
        successHandler(res, 200, "room data deleted succesfully", deletedRoom)
    }
    catch (error) {
        errorHandler(res, 400, "your info have error")
        console.log("room delete me error he : ", error);
    }

}


//  get One room
export const getRoom = async (req, res) => {

    const { id } = req.params
    try {
        const getRoom = await Rooms.findById(id)
        console.log("room data recieving succesfully");
        successHandler(res, 200, "room data recieving succesfully", getRoom)
    }
    catch (error) {
        errorHandler(res, 400, "your info have error")
        console.log("get room me error he : ", error);
    }

}


//  get All rooms
export const getAllRooms = async (req, res) => {

    try {
        const getRooms = await Rooms.find({})
        console.log("rooms data recieving succesfully");
        successHandler(res, 200, "all rooms data recieving succesfully", getRooms)
    }
    catch (error) {
        errorHandler(res, 400, "your info have error")
        console.log("get All rooms me error he : ", error);
    }

} 
