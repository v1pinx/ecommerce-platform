import mongoose from "mongoose";    

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/e-commerce";

export default function connectToDatabase(){
    mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("Database Connected");
    })
}