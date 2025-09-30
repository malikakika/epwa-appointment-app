export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { z, ZodError } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { DataSource } from "typeorm";
import { User } from "@/entities/User";
import { AppDataSource } from "@/db/data-source";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

async function getDS(): Promise<DataSource> {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  return AppDataSource;
}

export async function POST(req: NextRequest) {
  try {
    const body: unknown = await req.json();
    const { email, password } = schema.parse(body);

    const ds = await getDS();
    const repo = ds.getRepository(User);

    const user = await repo.findOne({ where: { email } });
    if (!user || !user.passwordHash) {
      return NextResponse.json({ ok: false, error: "Invalid email or password" }, { status: 401 });
    }

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      return NextResponse.json({ ok: false, error: "Invalid email or password" }, { status: 401 });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role, email: user.email },
      process.env.JWT_SECRET!, 
      { expiresIn: "1h" } 
    );

    return NextResponse.json({
      ok: true,
      token, 
      user: { id: user.id, email: user.email, role: user.role, name: user.name },
    });
  } catch (err) {
    console.error("[LOGIN_ERROR]", err);
    if (err instanceof ZodError) {
      return NextResponse.json({ ok: false, error: err.issues }, { status: 400 });
    }
    return NextResponse.json({ ok: false, error: "Unknown error" }, { status: 500 });
  }
}
