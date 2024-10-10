import { NextResponse } from "next/server";
import connectToDatabase from "@/app/lib/dbConnect";
import User from "@/app/models/user";

export async function DETETE(request: any) {
    
    const { productId, userId } = await request.json();

    if (!productId) {
        return NextResponse.json({ message: "Missing fields." }, { status: 400 });
    }

    try{
        await connectToDatabase();

        const user = await User.findById(userId);
        
        
    }
    catch(e){
        console.log(e);
        return NextResponse.json({message: "An error occurred. Please try again."}, {status: 500});
    }

}