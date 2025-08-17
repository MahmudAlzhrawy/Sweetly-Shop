import { dbConection } from "@/lib/db";
import Product from "@/models/Products";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await dbConection();
    const productId = params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return NextResponse.json({ message: "❌ Product not found" }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ error: "⚠️ Failed to fetch product" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await dbConection();
    const productId = params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return NextResponse.json({ message: "❌ Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "✅ Product deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ error: "⚠️ Failed to delete product" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    await dbConection();
    const productId = params.id;
    const updatedData = await req.json();

    const updatedProduct = await Product.findByIdAndUpdate(productId, updatedData, { new: true });

    if (!updatedProduct) {
      return NextResponse.json({ message: "❌ Product not found" }, { status: 404 });
    }

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ error: "⚠️ Failed to update product" }, { status: 500 });
  }
}
