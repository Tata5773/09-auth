import { NextRequest, NextResponse } from "next/server";

const privateRoutes = ["/profile", "/notes"];
const authRoutes = ["/sing-in", "/sing-up"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refrechToken")?.value;

  const isAuthenticated = Boolean(accessToken || refreshToken);

  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route),
  );

  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  if (!isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL("/sing-in", request.url));
  }

  if (!isAuthenticated && isPrivateRoute) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sing-in", "sing-up"],
};
