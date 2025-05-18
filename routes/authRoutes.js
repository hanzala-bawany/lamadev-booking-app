import express from "express";
import {registerController,loginController } from "../controllers/authControllers.js"

const authRoutes = express.Router()

authRoutes.post('/register',registerController);
authRoutes.post('/login',loginController);



export {authRoutes}


