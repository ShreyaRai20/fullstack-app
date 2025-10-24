import mongoose, {Schema, model, models} from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser {
    email:string;
    password: string;
    _id?: mongoose.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

const userSchema = new Schema<IUser>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required:[true, 'Password is required'],
        }
    },
    {
        timestamps: true
    }
)

export const User = model('User', userSchema)
