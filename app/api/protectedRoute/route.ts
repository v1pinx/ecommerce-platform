import { NextResponse } from "next/server";
import  {authenticateToken}  from "@/app/middleware/authenticateToken";

export const dynamic = "force-dynamic";
export async function GET(request: Request) {
    try {
        const user = await authenticateToken(request);

        if (user) {
            return NextResponse.json([{ message: "You have access" }, { user }], { status: 200 });
        } else {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
    } catch (error) {
        console.error("Authentication error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
