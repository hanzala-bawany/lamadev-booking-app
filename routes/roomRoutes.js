import express from "express";
import { createRoom, updateRoom, deleteRoom, getRoom, getAllRooms , updateRoomAvailability } from "../controllers/roomControllers.js"
import { verifyToken, verifyUser, verifyAdmin } from "../middleWare/verifyToken.js";

const roomsRoutes = express.Router()


// create
roomsRoutes.post('/:hotelId', verifyToken, verifyAdmin, createRoom);

// update
roomsRoutes.patch('/:id', verifyToken, verifyAdmin, updateRoom);

// update room availability
roomsRoutes.patch('/availability/:id' , updateRoomAvailability);

// delete
roomsRoutes.delete('/:hotelId/:id', verifyToken, verifyAdmin, deleteRoom);

// get one
roomsRoutes.get('/:id', getRoom);

// get all
roomsRoutes.get('/', getAllRooms);


export { roomsRoutes }

