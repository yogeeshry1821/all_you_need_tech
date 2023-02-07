import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export async function initMongoose(){
    if(mongoose.connection.readyState === 1){
    
        return mongoose.connection.asPromise(); 
    }
    mongoose.set("strictQuery", false);
    return await mongoose.connect(process.env.MONGODB_URL);
}