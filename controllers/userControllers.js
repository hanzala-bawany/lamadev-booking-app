import { users } from "../models/authModel.js"
import { errorHandler, successHandler } from "../utills/resposeHandler.js";



//  update User
export const updateUser = async (req, res) => {

    const { userName, email, password, city } = req.body
    const data = { };

    if(userName)  data.userName = userName
    if(email)  data.email = email
    if(password)  data.password = password
    if(city)  data.city = city

    const { id: paramsId } = req.params

    try {
        const updateUser = await users.findByIdAndUpdate(paramsId, data, { new: true })
        successHandler(res, 200, "User data updated succesfully", updateUser)
    }
    catch (error) {
        errorHandler(res, 400, "your info have error")
    }

}


//  delete User
export const deleteUser = async (req, res) => {

    const { id } = req.params
    try {
        const deleteUser = await users.findByIdAndDelete(id)
        console.log("User data deleted succesfully");
        successHandler(res, 200, "User data deleted succesfully", deleteUser)
    }
    catch (error) {
        errorHandler(res, 400, "your info have error")
        console.log("User delete me error he : ", error);
    }

}



//  get One User
export const getUser = async (req, res) => {

    const { id } = req.params
    try {
        const getUser = await users.findById(id)
        console.log("userhotel data recieving succesfully");
        successHandler(res, 200, "userhotel data recieving succesfully", getUser)
    }
    catch (error) {
        errorHandler(res, 400, "your info have error")
        console.log("get user me error he : ", error);
    }

}


//  get All Users
export const getAllUsers = async (req, res) => {

//    if(!req.loginUser.isAdmin) errorHandler(res,400,"only admin can get all users") 

    try {
        const getUsers = await users.find({})
        console.log("Users data recieving succesfully");
        successHandler(res, 200, "all Users data recieving succesfully", getUsers)
    }
    catch (error) {
        errorHandler(res, 400, "your info have error")
        console.log("get All users me error he : ", error);
    }

} 