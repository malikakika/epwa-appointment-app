export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { z, ZodError } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { DataSource } from "typeorm";
import { User } from "@/entities/User";
import { AppDataSource } from "@/db/data-source";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(["PATIENT", "DOCTOR", "ADMIN"]),
  adminToken: z.string().optional().nullable(),

  firstName: z.string().min(1).optional().nullable(),
  lastName: z.string().min(1).optional().nullable(),
  phone: z.string().optional().nullable(),
  streetNumber: z.string().optional().nullable(),
  street: z.string().optional().nullable(),
  postalCode: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  specialty: z.string().optional().nullable(),
  rpps: z.string().optional().nullable(),
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
    const {
      email,
      password,
      role,
      adminToken,
      firstName,
      lastName,
      phone,
      streetNumber,
      street,
      postalCode,
      city,
      specialty,
      rpps,
    } = schema.parse(body);

    if (role === "ADMIN") {
      if (!adminToken || adminToken !== process.env.ADMIN_SIGNUP_TOKEN) {
        return NextResponse.json(
          { ok: false, error: "Invalid or missing admin token" },
          { status: 403 }
        );
      }
    }

    const ds = await getDS();
    const repo = ds.getRepository(User);

    const existing = await repo.findOne({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { ok: false, error: "Email already registered" },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = repo.create({
      email,
      passwordHash,
      role,
      firstName: firstName ?? null,
      lastName: lastName ?? null,
      name: `${firstName ?? ""} ${lastName ?? ""}`.trim() || null,
      phone: phone ?? null,
      streetNumber: streetNumber ?? null,
      street: street ?? null,
      postalCode: postalCode ?? null,
      city: city ?? null,
      specialty: role === "DOCTOR" ? specialty ?? null : null,
      rpps: role === "DOCTOR" ? rpps ?? null : null,
    });

    await repo.save(user);

    const token = jwt.sign(
      { id: user.id, role: user.role, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    return NextResponse.json({
      ok: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        city: user.city,
        specialty: user.specialty,
        rpps: user.rpps,
      },
    });
  } catch (err) {
    console.error("[REGISTER_ERROR]", err);
    if (err instanceof ZodError) {
      return NextResponse.json(
        { ok: false, error: err.issues.map((i) => i.message) },
        { status: 400 }
      );
    }
    if (err instanceof Error) {
      return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
    }
    return NextResponse.json({ ok: false, error: "Unknown error" }, { status: 500 });
  }
}
