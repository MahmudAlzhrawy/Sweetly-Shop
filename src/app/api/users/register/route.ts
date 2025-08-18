import { NextRequest, NextResponse } from "next/server";
import { dbConection } from "@/lib/db";
import User from "@/models/Users";
import { writeFile } from "fs/promises";
import path from "path";
import bcrypt from "bcryptjs";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const userName = formData.get("userName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const address = formData.get("address") as string;
    const file = formData.get("image") as File;

    await dbConection();

    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // ⬇️ حفظ الصورة داخل مجلد 
    let imageUrl = "";
    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const upload = await new Promise<{ secure_url: string }>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "users" }, // ⬅️ الصور هتتخزن في فولدر "users"
          (error, result) => {
            if (error || !result) reject(error);
            else resolve(result as { secure_url: string });
          }
        );
        stream.end(buffer);
      });

      imageUrl = upload.secure_url;
    }
    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
      role:"user",
      firstName,
      lastName,
      address,
      image: imageUrl,
    });

    await newUser.save();

    return NextResponse.json({ message: "User created" }, { status: 201 });
  } catch (err) {
    console.error("Error during signup:", err);
    return NextResponse.json({ message: "Error in signup" }, { status: 500 });
  }
}
