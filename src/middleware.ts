export const runtime = "nodejs";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import createMiddleware from "next-intl/middleware";

const intlMiddleware = createMiddleware({
  locales: ["fr", "en", "ar"],
  defaultLocale: "fr",
  localePrefix: "as-needed",
  localeDetection: true,     
});

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/api/dashboard")) {
    const token = req.headers.get("authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.json(
        { ok: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET!);
      return NextResponse.next();
    } catch {
      return NextResponse.json(
        { ok: false, error: "Unauthorized" },
        { status: 401 }
      );
    }
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: [
    "/api/dashboard/:path*",

    "/((?!api|_next|.*\\..*).*)",
  ],
};
