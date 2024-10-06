import mongoose from "mongoose";    

const MONGO_URI = 'mongodb://127.0.0.1:27017/e-commerce'

export default function connectToDatabase(){
    if (mongoose.connection.readyState >= 1) {
        return;
    }

    mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("Database Connected");
    })
}