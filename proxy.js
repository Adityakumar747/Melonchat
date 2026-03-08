import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/forum(.*)",
  "/contact(.*)",
  "/about(.*)",
  "/api/stream-token(.*)",
]);

export default clerkMiddleware((auth, req) => {

  if (!isPublicRoute(req)) {
    return NextResponse.next();
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};