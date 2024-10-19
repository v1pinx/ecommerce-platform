import { NextResponse } from "next/server";
import connectToDatabase from "@/app/lib/dbConnect";
import User from "@/app/models/user";

export async function DELETE(request: any) {
    const { productId, userId } = await request.json();

    if (!productId || !userId) {
        return NextResponse.json({ message: "Missing fields." }, { status: 400 });
    }

    try {
        await connectToDatabase();

        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return NextResponse.json({ message: "User not found." }, { status: 404 });
        }

        // Find the index of the product in the user's cart
        const productIndex = user.cart.findIndex((item: any) => item.productId === productId);

        if (productIndex === -1) {
            return NextResponse.json({ message: "Product not found in cart." }, { status: 404 });
        }

        if (user.cart[productIndex].quantity > 1) {
            user.cart[productIndex].quantity -= 1;
        } else {
            user.cart.splice(productIndex, 1);
        }

        user.cartCount = user.cart.reduce((count: any, item: any) => count + item.quantity, 0);

        await user.save();

        return NextResponse.json({ message: "Product removed from cart." }, { status: 200 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ message: "An error occurred. Please try again." }, { status: 500 });
    }
}
