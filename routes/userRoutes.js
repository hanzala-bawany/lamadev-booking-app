import express from "express";
import { updateUser,deleteUser, getUser, getAllUsers } from "../controllers/userControllers.js"
import { verifyToken , verifyUser,verifyAdmin } from "../middleWare/verifyToken.js";

const userRoutes = express.Router()


// userRoutes.get('/:id',verifyToken,(req,res)=>{
//     res.status(200).json({
//         massage : "user loged in succeffuly"
//     })
// })

userRoutes.patch('/:id',verifyToken,verifyUser,updateUser); // update user
userRoutes.delete('/:id',verifyToken,verifyUser,deleteUser); // delete user
userRoutes.get('/',verifyToken,verifyAdmin,getAllUsers); // get all users
userRoutes.get('/:id',verifyToken,verifyUser,getUser); // get 1 user


export {userRoutes}


