import { cookies } from "next/headers";
import { User } from "./clientLib";

export const getAuthenticatedUser = async () => {
  const cookieStore = cookies();
  const tokenCookie = cookieStore.get("token");

  try {
    const res = await fetch("http://localhost:8090/me", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${tokenCookie?.value}`,
      },
      cache: "no-store",
    });

    if (!res.ok) return;

    const user: User = await res.json();
    return user ?? null;
  } catch (err) {
    return;
  }
};

export const getIsAuthenticated = async () => ((await getAuthenticatedUser()) ? true : false);
