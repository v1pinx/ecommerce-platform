import { NextResponse } from "next/server";
import connectToDatabase from "@/app/lib/dbConnect";
import User from "@/app/models/user";
import bcrypt from "bcrypt";
import { error } from "console";

async function createUser(name: string, email: string, password: string) {
    await connectToDatabase();

    try {
        let userFound = await User.findOne({ email });
        if (userFound) {
            return { message: "User already exists" }
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword,
        })
        await user.save();


        return {
            message: "User Registration Successfully"
        }
    }
    catch (e) {
        console.error(e);
        return {
            message: "Internal Server Error (createUser)."
        };
    }
}

export async function POST(request: any) {
    try {
        const { name, email, password } = await request.json();

        if (!name || !email || !password) {
            return NextResponse.json({ message: "Missing fields." }, { status: 400 });
        }
        const user = await createUser(name, email, password);

        if(user.message === "User already exists"){
            return NextResponse.json(user, { status: 409 });
        }

        return NextResponse.json(user, { status: 201 });
    }
    catch (error) {
        console.error(error)
        return NextResponse.json({ message: "Internal server error (POST)" }, { status: 500 });
    }

}