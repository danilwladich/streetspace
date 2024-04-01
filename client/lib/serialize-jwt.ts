import cookie from "cookie";

const JWT_TOKEN = "jwtToken";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

export function serializeJwt(jwt: string) {
  // Serializing the JWT token as a cookie and setting the response headers
  const serialized = cookie.serialize(JWT_TOKEN, jwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: COOKIE_MAX_AGE,
    sameSite: "strict",
    path: "/",
  });

  return serialized;
}

export function emptyJwt() {
  const serialized = cookie.serialize(JWT_TOKEN, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: -1,
    sameSite: "strict",
    path: "/",
  });

  return serialized;
}
