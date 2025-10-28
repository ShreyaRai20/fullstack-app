import mongoose from "mongoose";
import { DB_NAME }  from '../constants'

const MONGODB_URI = process.env.MONGODB_URI!;

console.log(MONGODB_URI)

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


export async function connectToDB() {
     if(cached.conn){
            return  cached.conn
        }

    if(!cached.promise){
        const opts = {
            dbName: DB_NAME,
            bufferCommands: true,
            maxPoolSize: 10
        }
        mongoose
        .connect(MONGODB_URI, opts)
        .then(()=>{
            return mongoose.connection
        })
        }

    try{
        cached.conn = await cached.promise
    } catch (err){
        cached.promise = null
        throw err
    }

    return cached.conn
}
