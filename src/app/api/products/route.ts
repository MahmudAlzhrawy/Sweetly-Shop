import { NextRequest, NextResponse } from "next/server";
import {dbConection} from '@/lib/db'
import  Product from "@/models/Products";
import { writeFile } from "fs/promises";
import path from "path";
import cloudinary from "@/lib/cloudinary";
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

    
    let imageUrl = "";
if (file) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const upload = await new Promise<{ secure_url: string }>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "products",
        format: "webp",        // ⬅️ يحفظ الصورة بصيغة WebP (أخف من JPG/PNG)
        quality: "auto:good",  // ⬅️ يختار جودة مناسبة مع ضغط ممتاز
        fetch_format: "auto",  // ⬅️ يحفظها بأفضل صيغة مدعومة للمتصفح
      },
      (error, result) => {
        if (error || !result) reject(error);
        else resolve(result as { secure_url: string });
      }
    );
    stream.end(buffer);
  });

  imageUrl = upload.secure_url;
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