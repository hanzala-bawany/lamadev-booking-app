import { Hotel } from "../models/hotelModel.js"
import { errorHandler, successHandler } from "../utills/resposeHandler.js";

//  create hotel
export const createHotel = async (req, res) => {

    console.log(req.body, "--> req.body console");
    const hotel = new Hotel(req.body);
    console.log(hotel, "--> hotel console");

    try {
        const savedHotel = await hotel.save()
        console.log("hotel data save succesfully");
        successHandler(res, 200, "hotel data save succesfully", savedHotel)
    }
    catch (error) {
        errorHandler(res, 400, "your info have error")
        console.log("hotel create me error he : ", error);
    }

}


//  update hotel
export const updateHotel = async (req, res) => {

    console.log(req.body, "--> req.body console");
    const { id } = req.params
    // const { name,type,city,address,distance,photos ,title ,discr,rating,rooms,cheapestPrice ,featured } = req.body
    // const data = { name,type,city,address,distance,photos,title ,discr,rating,rooms,cheapestPrice ,featured }; 

    // if(name) data.name = name
    // if(type) data.type = type
    // if(city) data.city = city
    // if(address) data.address = address
    // if(distance) data.distance = distance
    // if(photos) data.photos = photos
    // if(title) data.title = title
    // if(discr) data.discr = discr
    // if(rating) data.rating = rating
    // if(rating) data.rating = rating

    try {
        const updateHotel = await Hotel.findByIdAndUpdate(id, req.body, { new: true })
        console.log("hotel data update succesfully");
        successHandler(res, 200, "hotel data updated succesfully", updateHotel)
    }
    catch (error) {
        errorHandler(res, 400, "your info have error")
        console.log("hotel update me error he : ", error);
    }

}


//  delete hotel
export const deleteHotel = async (req, res) => {

    const { id } = req.params
    try {
        const deleteHotel = await Hotel.findByIdAndDelete(id)
        console.log("hotel data deleted succesfully");
        successHandler(res, 200, "hotel data deleted succesfully", deleteHotel)
    }
    catch (error) {
        errorHandler(res, 400, "your info have error")
        console.log("hotel delete me error he : ", error);
    }

}



//  get One hotel
export const getHotel = async (req, res) => {

    const { id } = req.params
    try {
        const getHotel = await Hotel.findById(id)
        console.log("hotel data recieving succesfully");
        successHandler(res, 200, "hotel data recieving succesfully", getHotel)
    }
    catch (error) {
        errorHandler(res, 400, "your info have error")
        console.log("get Hotel me error he : ", error);
    }

}


//  get All hotels
export const getAllHotels = async (req, res) => {

    try {
        // const getHotels = await Hotel.find({name : {$exists : true}})
        const getHotels = await Hotel.find({})
        console.log("hotels data recieving succesfully");
        successHandler(res, 200, "all hotels data recieving succesfully", getHotels)
    }
    catch (error) {
        errorHandler(res, 400, "your info have error")
        console.log("get All Hotels me error he : ", error);
    }

}


//  get property count by city
export const propertyCountByCity = async (req, res) => {

    const cities = await req.query.cities.split(",")

    try {
        const propertyCountByCity = await Promise.all(
            cities.map( (city) => Hotel.countDocuments({ city: city }) )
        )
        console.log("hotels data recieving succesfully");
        successHandler(res, 200, "property count by city data recieving succesfully", propertyCountByCity)
    }
    catch (error) {
        errorHandler(res, 400, "your info have error")
        console.log("property count by city me error he : ", error);
    }

} 


//  get property count by type
export const propertyCountByType = async (req, res) => {

    const types = await req.query.types.split(",")

    // const hotelsCount = Hotel.countDocuments({ type: "hotel" })
    // const apartment = Hotel.countDocuments({ type: "apartment" })
    // const villa = Hotel.countDocuments({ type: "villa" })

    // const propertyCountByType = [  {count : hotelsCount }  ] 
    try {
        const propertyCountByType = await Promise.all(
            types.map( async (type) => {  
                const count = await  Hotel.countDocuments({ type: type }) 
                return {
                    type ,
                    count
                }
        })
            
        )
        console.log("hotels data recieving succesfully");
        successHandler(res, 200, "property count by Type data recieving succesfully", propertyCountByType)
    }
    catch (error) {
        errorHandler(res, 400, "your info have error")
        console.log("property count by Type me error he : ", error);
    }

} 