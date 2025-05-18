import { users } from "../models/authModel.js"
import { errorHandler, successHandler } from "../utills/resposeHandler.js"
import pkg from "jsonwebtoken"
import bcrypt from "bcryptjs";
import cookieParser from "cookie-parser";

const { sign } = pkg;
const { hash, compare } = bcrypt

//  register controller
export const registerController = async (req, res) => {

    console.log("💡 RegisterController chal gaya");
    const { userName, email, password, city, isAdmin } = req.body

    if (!userName || !email || !password || !city) {
        return errorHandler(res, 400, "missing Fields");
    }
    if (!email.endsWith("@gmail.com")) {
        return errorHandler(res, 400, "email is in valid");
    }
    if (password.length < 6 || password.length > 12) {
        return errorHandler(res, 400, "password must greater then 7 and smaller then 13");
    }

    const isExist = await users.findOne({ email: email })
    if (isExist) return errorHandler(res, 402, "user already exist");


    try {
        const hashedPass = await hash(password, 10);
        console.log(hashedPass, "--> hashed passsword");

        const newUser = await users.create({
            userName,
            email,
            password: hashedPass,
            city
        })
        console.log(newUser, "---> is user ne signup kia he");

        return successHandler(res, 200, `user register succefully`, { signupUser: newUser })
    }
    catch (error) {
        console.log(error, "---> registration me error he");
    }
}



// login controller

export const loginController = async (req, res) => {
    console.log(req.body, "--> login me req.body");

    try {
        const { email, password : paramsPassword } = req.body
        if( !email || !paramsPassword  ) errorHandler(res,404,"missing fields")

        const isExist = await users.findOne({ email: email })
        if (!isExist) return errorHandler(res, 402, "user not exist");

        const {isAdmin , password , ...otherUserDetail} = isExist

        const comparePass = await compare(paramsPassword, isExist.password);
        if (!comparePass) return errorHandler(res, 404, "invalid password");

        const token = await sign({
            userId: isExist._id,
            userEmail: email,
            isAdmin: isAdmin
        }, process.env.JWT_secretKey, { expiresIn: "1h" })

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 1000, // 1 hour
        });



        return successHandler(res, 200, `user login succefully`, { loginUser: otherUserDetail })
    }
    catch (error) {
        console.log(error, "---> login me error he");
        errorHandler(res, 500, "Unexpected Error", error)
    }
}



