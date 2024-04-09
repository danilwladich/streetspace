import { NextRequest, NextResponse } from "next/server";
import { getMe } from "@/lib/server-actions";

function authRedirect(req: NextRequest) {
  const loginUrl = new URL("/auth", req.url);
  loginUrl.searchParams.set("from", req.url);

  return NextResponse.redirect(loginUrl);
}

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/api/admin")) {
    // Checking authentication status
    const authUser = await getMe();

    // If not authenticated or not admin, return an Unauthorized response
    if (!authUser || authUser.role !== "admin") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // If user is authenticated
    const reqHeaders = new Headers(req.headers);

    // Adding header with the authenticated user data
    reqHeaders.set("x-auth-user", JSON.stringify(authUser));

    // Allowing the request to proceed with the updated headers
    return NextResponse.next({
      request: {
        headers: reqHeaders,
      },
    });
  }

  if (req.nextUrl.pathname.startsWith("/admin")) {
    // Checking authentication status
    const authUser = await getMe();

    // If authenticated and user is admin allow the request to proceed
    if (authUser && authUser.role === "admin") {
      return NextResponse.next();
    }

    // If not authenticated, redirect to the login page and store the original URL
    return authRedirect(req);
  }

  if (req.nextUrl.pathname.startsWith("/api")) {
    // Checking authentication status
    const authUser = await getMe();

    // If not authenticated, return an Unauthorized response
    if (!authUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // If user is authenticated
    const reqHeaders = new Headers(req.headers);

    // Adding header with the authenticated user data
    reqHeaders.set("x-auth-user", JSON.stringify(authUser));

    // Allowing the request to proceed with the updated headers
    return NextResponse.next({
      request: {
        headers: reqHeaders,
      },
    });
  }

  if (req.nextUrl.pathname.startsWith("/auth")) {
    // Checking authentication status
    const authUser = await getMe();

    // If not authenticated, allow the request to proceed
    if (!authUser) {
      return NextResponse.next();
    }

    // If authenticated, redirect to the specified URL or default to "/profile"
    const fromUrl = req.nextUrl.searchParams.get("from");
    const redirectUrl = new URL(
      fromUrl || `/profile/${authUser.username}`,
      req.url,
    );

    return NextResponse.redirect(redirectUrl);
  }

  if (req.nextUrl.pathname.startsWith("/profile")) {
    // Extract the searched user from the URL
    const searchedUser: string | undefined = req.nextUrl.pathname.split("/")[2];

    // Allow the request to proceed if searched user was provided
    if (searchedUser) {
      return NextResponse.next();
    }

    // Checking authentication status
    const authUser = await getMe();

    // If authenticated but searched user not provided, redirect to the auth user profile
    if (authUser) {
      const userProfileUrl = new URL(`/profile/${authUser.username}`, req.url);
      return NextResponse.redirect(userProfileUrl);
    }

    // If not authenticated and searched user not provided, redirect to the login page and store the original URL
    return authRedirect(req);
  }

  const protectedPath = ["/map/adding"];

  if (protectedPath.some((path) => req.nextUrl.pathname.startsWith(path))) {
    // Checking authentication status
    const authUser = await getMe();

    // If authenticated allow the request to proceed
    if (authUser) {
      return NextResponse.next();
    }

    // If not authenticated, redirect to the login page and store the original URL
    return authRedirect(req);
  }
}

// Configuration for the middleware, specifying the routes to apply the middleware to
export const config = {
  matcher: [
    "/auth",
    "/admin",
    "/profile/:path?",
    "/map/adding",
    "/api/auth/me",
    "/api/admin/:path*",
    "/api/user/:path*",
    "/api/map/:path*",
  ],
};
