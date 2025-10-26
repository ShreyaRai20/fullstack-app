import mongoose from "mongoose";
import { DB_NAME }  from '../constants'
import { buffer } from "stream/consumers";

const MONGODB_URI = process.env.MONGODB_URI!;

if(!MONGODB_URI){
    throw new Error("Please define mongodb_uri in env variables")
}

let cached = global.mongoose

if(!cached){
    cached = global.mongoose = {
        conn: null,
        promise: null
    }
}


async function connectToDB() {
     if(cached.conn){
            return  cached.conn
        }

    if(!cached.promise){
        const opts = {
            bufferCommands: true,
            maxPoolSize: 10
        }
        mongoose
        .connect(`${MONGODB_URI}/${DB_NAME}`, opts)
        .then(()=>mongoose.connection)
        }

    try{
        cached.conn = await cached.promise
    } catch (err){
        cached.promise = null
        throw err
    }

    return cached.conn
}

export default connectToDB