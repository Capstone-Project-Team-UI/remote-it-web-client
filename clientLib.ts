"use client";
export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  company: string;
}

export const login = async (username: string, password: string) => {
  try {
    const res = await fetch("http://localhost:8090/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) return;

    const user: User = await res.json();
    return user ?? null;
  } catch (err) {
    console.error(err);
  }
};

export const logout = async () => {
  try {
    const res = await fetch("http://localhost:8090/logout", {
      method: "POST",
      credentials: "include",
    });
    if (!res.ok) return;
    return await res.text();
  } catch (err) {
    console.error(err);
  }
};
