import { config } from "dotenv";
import mongoose from "mongoose";
config();

export default async function connectDb(){
    try {
       
        await mongoose.connect(process.env.MONGO_URL)
        console.log('database connected successfully')
    } catch (error) {
        console.log('Internal error',error.message)
        process.exit(1);
    }
}