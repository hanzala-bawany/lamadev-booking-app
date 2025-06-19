import express from "express";
import { createHotel, updateHotel, deleteHotel, getHotel, getAllHotels , propertyCountByCity , propertyCountByType } from "../controllers/hotelController.js"
import { verifyToken, verifyUser, verifyAdmin } from "../middleWare/verifyToken.js";

const hotelsRoutes = express.Router()


// create
hotelsRoutes.post('/', verifyToken, verifyAdmin, createHotel);

// update
hotelsRoutes.patch('/:id', verifyToken, verifyAdmin, updateHotel);

// delete
hotelsRoutes.delete('/:id', verifyToken, verifyAdmin, deleteHotel);

// get all
hotelsRoutes.get('/', getAllHotels);

// countByCity
hotelsRoutes.get('/countByCity', propertyCountByCity);

// countByType
hotelsRoutes.get('/countByType', propertyCountByType);

// get one
hotelsRoutes.get('/:id', getHotel);




export { hotelsRoutes }


