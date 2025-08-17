import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Order from "@/models/Orders";
import Product from "@/models/Products";
import { dbConection } from "@/lib/db";
import User from "@/models/Users";

export async function POST(req) {
  try {
    await dbConection();
    const { userId, cart } = await req.json();

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ error: "❌ userId غير صالح" }, { status: 400 });
    }

    if (!cart || cart.length === 0) {
      return NextResponse.json({ error: "❌ السلة فارغة" }, { status: 400 });
    }

    // جلب المنتجات للتأكد من وجودها وحساب السعر
    const productsWithPrices = await Promise.all(
      cart.map(async (item) => {
        const product = await Product.findById(item.productId);
        if (!product) {
          throw new Error(`❌ المنتج ${item.productId} غير موجود`);
        }
        return {
          product: product._id,
          quantity: item.quantity,
          price: product.price,
        };
      })
    );

    // حساب الإجمالي
    const totalAmount = productsWithPrices.reduce(
      (sum, p) => sum + p.price * p.quantity,
      0
    );

    // إنشاء الأوردر
    const newOrder = new Order({
      user: userId,
      products: productsWithPrices.map((p) => ({
        product: p.product,
        quantity: p.quantity,
      })),
      totalAmount,
      status: "pending",
    });

    await newOrder.save();

    return NextResponse.json(
      { message: "✅ تم إنشاء الأوردر بنجاح", order: newOrder },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "حدث خطأ غير متوقع" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    await dbConection();

    // قراءة الباراميتر من الـ URL
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    let query = {};
    if (userId) {
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return NextResponse.json(
          { error: "❌ userId not vaild " },
          { status: 400 }
        );
      }
      query = { user: userId };
    }

    const orders = await Order.find(query)
      .populate({ path: "user", model: User, select: "userName address email" })
      .populate({
        path: "products.product",
        model: Product,
        select: "name price image",
      });

    return NextResponse.json({ orders }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "ther is an error" },
      { status: 500 }
    );
  }
}
