import { NextResponse } from "next/server";
import connectToDatabase from "@/app/lib/dbConnect";
import User from "@/app/models/user";
import bcrypt from "bcrypt";

const userFound = async (email : String, password: String) => {
    const user = await User.findOne({ email });
    
    if(!user){
        return null;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch ? user : null;
}
 
export async function POST(request: any){

    try{
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ message: "Missing fields." }, { status: 400 });
        }
        
        const user = await userFound(email, password);

        if (!user) {
            return NextResponse.json({ message: "Invalid credentials." }, { status: 401 });
        }


        return NextResponse.json({
            message: "Login Successful",
        },{status: 200});
    }
    catch(e){

    }
}