import { errorHandler, successHandler } from "../utills/resposeHandler.js";
import pkg from "jsonwebtoken"
const { verify } = pkg

export const verifyToken = async (req, res, next) => {

    try {

        const token = req?.cookies?.token
        console.log(req, "<------ console req");
        if (!token) errorHandler(res, 404, "token not found")

        // const fullToken = req?.headers?.authorization
        // if (!fullToken) errorHandler(res, 404, "token not found")

        // const Bearer = fullToken.split(" ")[0]
        // if (Bearer !== "Bearer") errorHandler(res, 404, "token is invalid")

        // const token = fullToken.split(" ")[1]
        // if (!token) errorHandler(res, 404, "token not found")

        const isTokenValid = await verify(token, process.env.JWT_secretKey);
        console.log(isTokenValid, "----> login wale user ka token wala data");

        req.loginUser = { ...isTokenValid }
        console.log(req.loginUser, "---> token ke waqt dia hua data");
        next()

    }
    catch (error) {
        console.log(error, "---> token verification me error he");

        if (error?.name === "TokenExpiredError" || error?.name === "JsonWebTokenError") {
            res.clearCookie("token", {
                httpOnly: true,
                sameSite: "lax",
                secure: false
            })

        }

        errorHandler(res, 402, `token error`, error.message);
    }

}

export const verifyUser = async (req, res, next) => {
    try {

        const { userId: loginUserId, isAdmin } = req.loginUser
        const { id: paramsId } = req.params
        if (loginUserId !== paramsId && !isAdmin) errorHandler(res, 404, "you are not able to update others data")
        next()

    }
    catch (error) {
        console.log(error, "---> verify user me error he");
        errorHandler(res, 500, "uknown error in verify user", error)
    }
}

export const verifyAdmin = async (req, res, next) => {
    try {

        const { isAdmin } = req.loginUser
        if (!isAdmin) errorHandler(res, 404, "you are not able to req this . only admin can do this")
        next()

    }
    catch (error) {
        console.log(error, "---> verify admin me error he");
        errorHandler(res, 500, "uknown error in verify admin")
    }
}

