export const errorHandler = (res,statusCode,massage,error)=>{
    return res.status(statusCode).json({
        status : false,
        massage : massage,
        error : error 
    })
}

export const successHandler = (res,statusCode,massage,data) =>{
   return res.status(statusCode).json({
        status : true,
        massage : massage,
        data : data
    })
} 