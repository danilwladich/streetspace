import { NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { authValidation } from "@/lib/auth-validation";
import { localePrefix, locales } from "@/i18n";

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: "en",
  localePrefix,
});

function authRedirect(req: NextRequest) {
  const loginUrl = new URL("/auth", req.url);
  loginUrl.searchParams.set("from", req.url);

  return NextResponse.redirect(loginUrl);
}

const protectedApiRoutes = [
  "/api/admin",
  "/api/auth/me",
  "/api/user",
  "/api/map/add",
];
const protectedApiPathnameRegex = RegExp(
  `^(${protectedApiRoutes.join("|")})(/.*|/?)$`,
  "i",
);

const protectedAdminPages = ["/admin"];
const protectedAdminPathnameRegex = RegExp(
  `^(/(${locales.join("|")}))?(${protectedAdminPages.join("|")})(/.*|/?)$`,
  "i",
);

const protectedPages = ["/map/adding"];
const protectedPathnameRegex = RegExp(
  `^(/(${locales.join("|")}))?(${protectedPages.join("|")})(/.*|/?)$`,
  "i",
);

const authPagePathnameRegex = RegExp(
  `^(/(${locales.join("|")}))?(/auth)(/.*|/?)$`,
  "i",
);

const profilePagePathnameRegex = RegExp(
  `^(/(${locales.join("|")}))?(/profile)(/.*|/?)$`,
  "i",
);

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/api")) {
    const isProtectedApiRoute = protectedApiPathnameRegex.test(
      req.nextUrl.pathname,
    );

    if (isProtectedApiRoute) {
      // Checking authentication status
      const authUser = await authValidation();

      // If not authenticated, return an Unauthorized response
      if (!authUser) {
        return new NextResponse("Unauthorized", { status: 401 });
      }

      // If user is not an admin and trying to access an admin route, return a Forbidden response
      const isAdminRoute = req.nextUrl.pathname.startsWith("/api/admin");
      if (isAdminRoute && authUser.role !== "ADMIN") {
        return new NextResponse("Forbidden", { status: 403 });
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

    return NextResponse.next();
  }

  const isProtectedAdminPage = protectedAdminPathnameRegex.test(
    req.nextUrl.pathname,
  );

  if (isProtectedAdminPage) {
    // Checking authentication status
    const authUser = await authValidation();

    // If not authenticated, redirect to the login page and store the original URL
    if (!authUser || authUser.role !== "ADMIN") {
      return authRedirect(req);
    }

    // If authenticated and user is admin allow the request to proceed
    return intlMiddleware(req);
  }

  const isProtectedPage = protectedPathnameRegex.test(req.nextUrl.pathname);

  if (isProtectedPage) {
    // Checking authentication status
    const authUser = await authValidation();

    // If not authenticated, redirect to the login page and store the original URL
    if (!authUser) {
      return authRedirect(req);
    }

    // If authenticated allow the request to proceed
    return intlMiddleware(req);
  }

  const isAuthPage = authPagePathnameRegex.test(req.nextUrl.pathname);

  if (isAuthPage) {
    // Checking authentication status
    const authUser = await authValidation();

    // If not authenticated, allow the request to proceed
    if (!authUser) {
      return intlMiddleware(req);
    }

    // If authenticated, redirect to the specified URL or default to "/profile"
    const fromUrl = req.nextUrl.searchParams.get("from");
    const redirectUrl = new URL(
      fromUrl || `/profile/${authUser.username}`,
      req.url,
    );

    return NextResponse.redirect(redirectUrl);
  }

  const isProfilePage = profilePagePathnameRegex.test(req.nextUrl.pathname);

  if (isProfilePage) {
    // Extract the searched user from the URL
    const searchedUser: string | undefined =
      req.nextUrl.pathname.split("/profile")[1];

    // Allow the request to proceed if searched user was provided
    if (searchedUser) {
      return intlMiddleware(req);
    }

    // Checking authentication status
    const authUser = await authValidation();

    // If authenticated but searched user not provided, redirect to the auth user profile
    if (authUser) {
      const userProfileUrl = new URL(`/profile/${authUser.username}`, req.url);
      return NextResponse.redirect(userProfileUrl);
    }

    // If not authenticated and searched user not provided, redirect to the login page and store the original URL
    return authRedirect(req);
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
