import { NextRequest, NextResponse } from "next/server";
import { checkSession } from "./lib/api/serverApi";

const privateRoutes = ["/profile", "/notes"];
const authRoutes = ["/sign-in", "/sign-up"];

function applySetCookie(response: NextResponse, setCookie?: string[]) {
  setCookie?.forEach((cookie) => {
    response.headers.append("Set-Cookie", cookie);
  });

  return response;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const cookieHeader = request.headers.get("cookie") ?? "";

  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route),
  );

  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  let isAuthenticated = Boolean(accessToken);
  let setCookie: string[] | undefined;

  if (!accessToken && refreshToken) {
    const session = await checkSession(cookieHeader);
    const sessionSetCookie = session.headers["set-cookie"];

    isAuthenticated = session.data.success;
    setCookie = Array.isArray(sessionSetCookie)
      ? sessionSetCookie
      : sessionSetCookie
        ? [sessionSetCookie]
        : [];
  }

  if (!isAuthenticated && isPrivateRoute) {
    return applySetCookie(
      NextResponse.redirect(new URL("/sign-in", request.url)),
      setCookie,
    );
  }

  if (isAuthenticated && isAuthRoute) {
    return applySetCookie(
      NextResponse.redirect(new URL("/profile", request.url)),
      setCookie,
    );
  }

  return applySetCookie(NextResponse.next(), setCookie);
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};
