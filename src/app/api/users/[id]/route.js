import { dbConection } from "@/lib/db";
import User from "@/models/Users";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await dbConection();

    const userId = params.id;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return NextResponse.json({ message: "❌ User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ message: "⚠️ Error fetching user" }, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  const userId = params.id;
  const { firstName, lastName, address } = await req.json();

  try {
    await dbConection();

    if (mongoose.isValidObjectId(userId)) {
      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        { firstName, lastName, address },
        { new: true }
      );

      if (updatedUser) {
        return NextResponse.json({ message: "✅ User updated successfully" });
      } else {
        return NextResponse.json({ message: "❌ User update failed" }, { status: 400 });
      }
    }

    return NextResponse.json({ message: "⚠️ Invalid user id" }, { status: 400 });
  } catch (err) {
    console.error("Error updating user:", err);
    return NextResponse.json(
      { message: "⚠️ There was an error while updating", error: err.message },
      { status: 500 }
    );
  }
}
