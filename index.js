import express from "express"
import { connectDB } from "./utills/connectDB.js"
import { authRoutes } from "./routes/authRoutes.js"
import { hotelsRoutes } from "./routes/hotelRoutes.js"
import { userRoutes } from "./routes/userRoutes.js"
import { roomsRoutes } from "./routes/roomRoutes.js"
import cookieParser from "cookie-parser"
import cors from "cors"

connectDB()

const app = express(); 

app.use(cors({
  origin :  ["http://localhost:5173", "http://localhost:5174", "http://localhost:3000"] ,
  credentials : true
 }));
app.use(express.json());
app.use(cookieParser());

app.use('/auth',authRoutes)
app.use('/hotel',hotelsRoutes)
app.use('/user',userRoutes)
app.use('/room',roomsRoutes)


app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})
