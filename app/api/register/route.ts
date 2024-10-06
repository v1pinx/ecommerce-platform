import { NextResponse } from "next/server";
import connectToDatabase from "@/app/lib/dbConnect";
import User from "@/app/models/user";

async function createUser(name: string, email: string, password: string){
    await connectToDatabase();

    const user = new User({
        name,
        email,
        password,
    })
    await user.save();
    return user;
}

export async function POST(request : any){
    try{
        const { name, email, password } = await request.json();
        const user = await createUser(name, email, password);
        
        console.log("User Created:> ", user);
        return NextResponse.json({ message: "User registered successfully!" }, { status: 201 });
    }
    catch(error){
        return NextResponse.json({ message: "Internal server error." }, { status: 500 });
    }
    
}