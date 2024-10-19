import { NextResponse } from "next/server";
import connectToDatabase from "@/app/lib/dbConnect";
import User from "@/app/models/user";

export async function GET(req: any) {
    await connectToDatabase();
    try {
        const users = await User.find({});
        
        return NextResponse.json({ success: true, data: users });
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ success: false, message: "Error fetching users" }, { status: 500 });
    }
}
