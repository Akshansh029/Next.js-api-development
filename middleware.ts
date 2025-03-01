import { NextResponse } from "next/server";
import { authMiddleware } from "./middlewares/api/authMiddleware";

export const config = {
  matcher: "/api/:path*",
};

export default function middleware(req: Request) {
  const authResult = authMiddleware(req);

  if (!authResult?.isValid) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }
  return NextResponse.next();
}
