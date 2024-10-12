import { NextResponse } from "next/server";
import Product from "@/app/models/products";
import connectToDatabase from "@/app/lib/dbConnect";

export async function GET(req: Request) {
    await connectToDatabase();

    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '20');
    const category = url.searchParams.get('type');
    const sort = url.searchParams.get('sort');

    const skip = (page - 1) * limit;

    try {
        let query: any = {};
        if (category) {
            query.category = category;
        }

        let productQuery = Product.find(query).skip(skip).limit(limit);

        if (sort) {
            const sortOrder = sort === 'desc' ? -1 : 1; 
            productQuery = productQuery.sort({ price: sortOrder });
        }
        const products = await productQuery;
        return NextResponse.json(products, { status: 200 });
    } catch (e: any) {
        console.error(e);
        return NextResponse.json({ message: "An error occurred. Please try again." }, { status: 500 });
    }
}



export async function POST(req: Request) {
    await connectToDatabase();

    try {
        const body = await req.json();

        const existingProducts = await Product.find().sort({ id: -1 }).limit(1);
        const nextId = existingProducts.length > 0 ? existingProducts[0].id + 1 : 1;

        const newProduct = new Product({ id: nextId, ...body });
        await newProduct.save();

        return NextResponse.json({ message: "Product added successfully.", product: newProduct }, { status: 201 });
    } catch (e: any) {
        console.error(e);
        return NextResponse.json({ message: "Error adding product.", error: e.message }, { status: 500 });
    }
}

