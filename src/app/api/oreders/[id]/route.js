import { dbConection } from "@/lib/db";
import Order from "@/models/Orders";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  const orderId = params.id;
  try {
    await dbConection();
    if (mongoose.isValidObjectId(orderId)) {
      const res = await Order.findOneAndDelete({ _id: orderId });

      if (res) {
        return NextResponse.json({ message: "✅ order deleted successfully" });
      } else {
        return NextResponse.json({ message: "⚠️ order delete failed" });
      }
    }
    return NextResponse.json({ message: "❌ id not valid" });
  } catch (err) {
    return NextResponse.json(
      { message: "❌ There was an error while deleting", error: err },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  const orderId = params.id;
  const { status } = await req.json();

  try {
    await dbConection();
    if (mongoose.isValidObjectId(orderId)) {
      const res = await Order.findOneAndUpdate(
        { _id: orderId },
        { status },
        { new: true } // عشان يرجع الدوكمنت بعد التحديث
      );

      if (res) {
        return NextResponse.json({ message: "✅ order updated successfully" });
      } else {
        return NextResponse.json({ message: "⚠️ order update failed" });
      }
    }
    return NextResponse.json({ message: "❌ id not valid" });
  } catch (err) {
    return NextResponse.json(
      { message: "❌ There was an error while updating", error: err },
      { status: 500 }
    );
  }
}
