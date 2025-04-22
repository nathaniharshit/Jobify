import mongoose from 'mongoose'
import dotenv  from "dotenv"
// import { returnToken } from '../controllers/authController'

const connectDb=async ()=>{
    // const myToken=returnToken()
    dotenv.config()
    try {
        const conn=await mongoose.connect("mongodb://0.0.0.0:27017/newUser")
        console.log("Successfully connected to database")
        // console.log(myToken)
        
    } catch (error) {
        console.log(`Error in Mongodb ${error}`)        
    }
}
connectDb();
export default connectDb