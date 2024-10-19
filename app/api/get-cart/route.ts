import { NextResponse } from "next/server";
import connectToDatabase from "@/app/lib/dbConnect";
import User from "@/app/models/user";

export async function GET(request: any) {
    // return NextResponse.json({message: "Hello World!"}, {status: 200});
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if(!userId){
        return NextResponse.json({message: "Please Login First."}, {status: 400});
    }
    try{
        const user = await User.findById(userId);
        if(!user){
            return NextResponse.json({message: "User not found."}, {status: 404});
        }
        const cartItems = user.cart;
        return NextResponse.json({cart: cartItems}, {status: 200});
    }
    catch(e){
        console.error(e);
        return NextResponse.json({message: "An error occurred. Please try again."}, {status: 500});
    }
}