export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { DataSource } from "typeorm";
import { User } from "@/entities/User";
import { AppDataSource } from "@/db/data-source";

async function getDS(): Promise<DataSource> {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  return AppDataSource;
}

export async function GET() {
  try {
    const ds = await getDS();
    const repo = ds.getRepository(User);

   const users = await repo.find({
  select: [
    "id",
    "firstName",
    "lastName",
    "email",
    "role",
    "phone",
    "streetNumber",
    "street",
    "postalCode",
    "city",
    "specialty",
    "rpps",
  ],
  order: { role: "ASC", firstName: "ASC" },
});


    return NextResponse.json({ ok: true, users });
  } catch (err) {
    console.error("[ADMIN_USERS_ERROR]", err);
    return NextResponse.json({ ok: false, error: "Erreur serveur" }, { status: 500 });
  }
}
