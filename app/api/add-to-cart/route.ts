import { NextResponse } from "next/server";
import connectToDatabase from "@/app/lib/dbConnect";
import User from "@/app/models/user";

export async function POST(request: any) {
    await connectToDatabase();

    const { productId, userId } = await request.json();

    if (!productId) {
        return NextResponse.json({ message: "Missing fields." }, { status: 400 });
    }

    try {
        const user = await User.findById(userId);

        if (!user) {
            return NextResponse.json({ message: "User not found." }, { status: 404 });
        }

        const existingProductIndex = user.cart.findIndex((item: any) => item.productId === productId);

        if (existingProductIndex !== -1) {
            user.cart[existingProductIndex].quantity += 1;
        }
        else {
            user.cart.push({ productId, quantity: 1 });
        }

        user.cartCount = user.cart.reduce((count: any, item: any) => count + item.quantity, 0);
        await user.save();

        return NextResponse.json({ message: "Added to cart." }, { status: 200 });
    }
    catch (e) {
        console.error(e);
        return NextResponse.json({ message: "An error occurred. Please try again." }, { status: 500 });
    }
}