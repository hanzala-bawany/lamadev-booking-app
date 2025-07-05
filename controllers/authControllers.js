import { users } from "../models/authModel.js"
import { errorHandler, successHandler } from "../utills/resposeHandler.js"
import pkg from "jsonwebtoken"
import bcrypt from "bcryptjs";
// import cookieParser from "cookie-parser";

const { sign } = pkg;
const { hash, compare } = bcrypt

//  register controller 
export const registerController = async (req, res) => {

    console.log("💡 RegisterController chal gaya");
    const { userName, email, password, city, country, phone, img } = req.body

    if (!userName || !email || !password || !city) {
        return errorHandler(res, 400, "missing Fields");
    }
    if (!email.endsWith("@gmail.com")) {
        return errorHandler(res, 400, "email is in valid");
    }
    if (password.length < 6 || password.length > 12) {
        return errorHandler(res, 400, "password must greater then 6 and smaller then 12");
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
            city,
            country,
            phone,
            img
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
        const { email, password: paramsPassword } = req.body
        if (!email || !paramsPassword) errorHandler(res, 404, "missing fields")

        const isExist = await users.findOne({ email: email })
        if (!isExist) return errorHandler(res, 402, "user not exist");

        const { isAdmin, password, ...otherUserDetail } = isExist

        const comparePass = await compare(paramsPassword, isExist.password);
        if (!comparePass) return errorHandler(res, 404, "invalid password");

        const token = await sign({
            userId: isExist._id,
            userEmail: email,
            isAdmin: isAdmin
        }, process.env.JWT_secretKey, { expiresIn: "6h" })

        res.cookie("token", token, {
            httpOnly: true,   //  < --- matlab sirf server side yani backend se hi cookie ko access/handle kia ja sakta he 
            sameSite: "Lax",  //  < --- yani diff origin/port sen req aengi un me cookie ko save nahui kia jae ga browser me siwae get and post samoeTime
            secure: false     // ⚠️ <-- alllow for only http
        });


        // sameSite: "None",   // <- ⚠️ Use for prfeional level <--- yani backend and frontend ek port/origin per hona zaruri nahi
        // secure: true   // <- ⚠️ use for profresional level  <--  sirf https req per hi cookie browser me save ho gi 

        // sameSite: "strict", // <--- sirf same port/origin per hi req hoine per cookie broser me save ho ga

        // maxAge: 60 * 60 * 1000, // <---  1 hour me cookie browser se delete    

        // .status(200)
        // .json( { loginUser: {...otherUserDetail} , isAdmin   } ) 


        return successHandler(res, 200, `user login succefully`, { loginUser: { ...otherUserDetail }, isAdmin })

    }
    catch (error) {
        console.log(error, "---> login me error he");
        errorHandler(res, 500, "Unexpected Error", error)
    }
}



