import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { createSession } from "@/lib/session";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json({ error: "Missing username or password" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { username }
    });

    if (!user) {
      // For demo/setup purposes: Create an initial admin if no users exist
      const userCount = await prisma.user.count();
      if (userCount === 0 && username === "admin@gmail.com") {
        const hashedPassword = await bcrypt.hash("admin123@", 10);
        const newUser = await prisma.user.create({
          data: {
            username: "admin@gmail.com",
            password: hashedPassword,
          }
        });
        
        await createSession(newUser.id, newUser.username);
        return NextResponse.json({ success: true });
      }
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    await createSession(user.id, user.username);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
