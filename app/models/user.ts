import mongoose from "mongoose";

mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role:{
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    cart: [
        {
            productId: { type: String, required: true },
            quantity: { type: Number, required: true, default: 1 },
        }
    ],

    cartCount: {
        type: Number,
        default: 0
    }
})


export default mongoose.models.User || mongoose.model('User', userSchema);;