import express from "express";
import { createHotel, updateHotel, deleteHotel, getHotel, getAllHotels } from "../controllers/hotelController.js"
import { verifyToken, verifyUser, verifyAdmin } from "../middleWare/verifyToken.js";

const hotelsRoutes = express.Router()


// create
hotelsRoutes.post('/', verifyToken, verifyAdmin, createHotel);

// update
hotelsRoutes.patch('/:id', verifyToken, verifyAdmin, updateHotel);

// delete
hotelsRoutes.delete('/:id', verifyToken, verifyAdmin, deleteHotel);

// get one
hotelsRoutes.get('/:id', getHotel);

// get all
hotelsRoutes.get('/', getAllHotels);


export { hotelsRoutes }


