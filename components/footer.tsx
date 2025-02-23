"use client";
import { Footer } from "@veneer/core";

export default function CustomFooter() {
  return (
    <Footer
      mainContent={{
        leadingArea: <span className="text-xs">© Copyright. All rights reserved.</span>,
        trailingArea: <span>HP</span>,
      }}
      customStyle={{ padding: 0 }}
      className="px-6 py-4"
    />
  );
}
