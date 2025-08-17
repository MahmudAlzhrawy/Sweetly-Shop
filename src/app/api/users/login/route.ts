import {dbConection} from '@/lib/db'
import User from'@/models/Users'
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();
export async function POST(request: Request) {
    try {
        await dbConection();
        const { userName, password } = await request.json();

        if (!userName || !password) {
            return NextResponse.json({ error: "Username and password are required" }, { status: 400 });
        }

        const user = await User.findOne({ userName });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json({ error: "Invalid password" }, { status: 401 });
        }
        const token = jwt.sign({ userId: user._id, role: user.role ,userName: user.userName  }, process.env.JWT_SECRET!, { expiresIn: '1h' });
        return NextResponse.json({ message: "Login successful", userId: user._id, token, role: user.role }, { status: 200 });
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

