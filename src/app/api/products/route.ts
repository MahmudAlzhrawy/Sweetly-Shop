import { NextRequest, NextResponse } from "next/server";
import {dbConection} from '@/lib/db'
import  Product from "@/models/Products";
import { writeFile } from "fs/promises";
import path from "path";
export async function GET() {
  try {
    await dbConection();
    const products = await Product.find({});
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}


export async function POST(request: NextRequest) {
  try {
    await dbConection();
    const formData = await request.formData();
    const file = formData.get("image") as File;
    const name = formData.get("name") as string;
    const category = formData.get("category") as string;
    const type =formData.get("type") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);

    // حفظ الصورة في مجلد /public/uploads
    let imageUrl = "";
    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const imageName = `${Date.now()}-${file.name}`;
      const imagePath = path.join(process.cwd(), "public/uploadsProducts", imageName);

      await writeFile(imagePath, buffer);
      imageUrl = `/uploadsProducts/${imageName}`;
    }

    const newProduct = new Product({ 
      category,
      type,
      name, 
      description,
      price,
      image: imageUrl
    });
    await newProduct.save();
    return NextResponse.json(newProduct, { status: 201 });
} catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
}
}