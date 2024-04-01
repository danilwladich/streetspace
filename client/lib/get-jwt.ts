import { cookies } from "next/headers";

export function getJwt() {
  // Extracting JWT token from the "jwtToken" cookie
  const cookieStore = cookies();
  const jwtToken = cookieStore.get("jwtToken")?.value;

  return jwtToken;
}
