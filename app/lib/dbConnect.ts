import mongoose from "mongoose";    

const MONGO_URI = process.env.MONGO_URI || "";

export default function connectToDatabase(){
    mongoose.connect(MONGO_URI)
    .then(() => {
        ("Database Connected");
    })
}