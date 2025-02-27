"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const authToken = "cookie";
    if (!authToken) router.push("/login");
    else router.push("/devices");
  }, []);

  return null;
}
