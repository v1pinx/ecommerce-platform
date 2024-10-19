import { NextResponse } from "next/server";
import connectToDatabase from "@/app/lib/dbConnect";
import User from "@/app/models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = "secret";

const userFound = async (email : string, password: string) => {
    await connectToDatabase();

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

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                role: user.role,
            },
            JWT_SECRET,
            { expiresIn : '1h'}
        );
        return NextResponse.json({
            message: "Login Successful",
            id: user._id,
            role: user.role,
            token
        },{status: 200});
    }
    catch(e){

    }
}