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
  const loginUrl = new URL("/auth", req.nextUrl);

  // Getting pathname without locale prefix
  const pathname = req.nextUrl.pathname.replace(
    RegExp(`(/(${locales.join("|")}))?`, "i"),
    "",
  );

  const redirectUrl = pathname + req.nextUrl.search;
  loginUrl.searchParams.set("redirect", redirectUrl);
  return NextResponse.redirect(loginUrl);
}

function secureRedirect(req: NextRequest) {
  req.nextUrl.protocol = "https";
  return NextResponse.redirect(req.nextUrl);
}

const protectedApiRoutes = [
  "/api/admin",
  "/api/auth/me",
  "/api/user",
  "/api/marker",
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

const protectedPages = ["/adding"];
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
  if (
    process.env.NODE_ENV === "production" &&
    req.nextUrl.protocol !== "https:"
  ) {
    // return secureRedirect(req);
  }

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

      if (authUser.blocked) {
        return new NextResponse("Forbidden", { status: 403 });
      }

      // If user is not an admin and trying to access an admin route, return a Forbidden response
      const isAdminRoute = req.nextUrl.pathname.startsWith("/api/admin");
      if (isAdminRoute && authUser.role !== "ADMIN") {
        return new NextResponse("Forbidden", { status: 403 });
      }

      // Adding header with the authenticated user data
      const headers = new Headers(req.headers);
      headers.set("x-auth-user", JSON.stringify(authUser));

      // Allowing the request to proceed with the updated headers
      return NextResponse.next({
        request: {
          headers,
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
    if (!authUser) {
      return authRedirect(req);
    }

    if (authUser.role !== "ADMIN") {
      const notFoundUrl = new URL("/404", req.url);
      return NextResponse.redirect(notFoundUrl);
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
    const redirectTo = req.nextUrl.searchParams.get("redirect");
    const redirectUrl = new URL(
      redirectTo || `/profile/${authUser.username}`,
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
