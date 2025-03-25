import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  // Placeholder
  const isAuthenticated = true;

  // If visiting a page that requires authentication while unauthenticated, reroute to login page.
  if (["/devices", "/kvm"].includes(pathname) && !isAuthenticated) return NextResponse.redirect(new URL("/login", req.url));

  // Handle kvm page with 'serialNumber' validation.
  if (pathname === "/kvm") {
    const serialNumber = searchParams.get("serialNumber");

    if (!serialNumber) return NextResponse.redirect(new URL("/devices", req.url));

    // Fetch device details (placeholder API call)
    const device = await fetchDevice(serialNumber);

    if (!device) return NextResponse.redirect(new URL("/devices", req.url));
  }

  // If visiting the login page while authenticated, reroute to home page.
  if (pathname === "/login" && isAuthenticated) return NextResponse.redirect(new URL("/", req.url));

  return NextResponse.next(); // Continue request normally
}

// Placeholder function to simulate fetching device from an API.
async function fetchDevice(serialNumber: string): Promise<boolean> {
  const devices = ["1234", "12345", "789", "Device123"];
  return devices.includes(serialNumber);
}

// Apply middleware only to these routes.
export const config = {
  matcher: ["/devices", "/kvm", "/login"],
};
