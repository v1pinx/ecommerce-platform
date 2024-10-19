import { NextResponse } from "next/server";
import Product from "@/app/models/products";
import connectToDatabase from "@/app/lib/dbConnect";


export async function GET(req: Request, { params }: { params: { id?: string } }) {

    await connectToDatabase();

    if (params.id == 'category') {
        try {
            const products = await Product.find({});

            const categories = Array.from(new Set(products.map(product => product.category)));

            return NextResponse.json({categories}, {status: 200});

        }
        catch (e: any) {
            console.error(e);
            return NextResponse.json({ message: "An error occurred while fetching categories." }, { status: 500 });
        }
    }
    else {


        try {
            const product = await Product.findOne({ id: params.id });
            if (!product) {
                return NextResponse.json({ message: "Product not found" }, { status: 404 });
            }
            return NextResponse.json(product, { status: 200 });
        }
        catch (e) {
            console.error(e);
            return NextResponse.json({ message: "An error occurred." }, { status: 500 });
        }
    }
}

export async function DELETE(req: Request, { params }: { params: { id?: Number } }) {
    await connectToDatabase();

    try {
        const deletedProduct = await Product.findOneAndDelete({ id: params.id });
        if (!deletedProduct) {
            return NextResponse.json({ message: "Product not found." }, { status: 404 });
        }
        return NextResponse.json({ message: "Product deleted successfully." }, { status: 200 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ message: "An error occurred." }, { status: 500 });
    }
}