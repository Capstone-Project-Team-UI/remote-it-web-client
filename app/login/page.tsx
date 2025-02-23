"use client";
import CustomFooter from "@/components/footer";
import CustomHeader from "@/components/header";
import { LogoHp, TextBox, Password, Button } from "@veneer/core";
import Link from "next/link";

export default function Login() {
  return (
    <div className="flex flex-col h-screen overflow-hidden xl:mx-auto">
      {/* HEADER */}
      <CustomHeader />
      {/* BODY */}
      <div className="flex items-center justify-center h-full bg-[#d3d3d3]">
        {/* MAIN */}
        <div className="flex flex-col items-start justify-center bg-white w-full max-w-md max-h-full px-12 py-9 rounded-2xl">
          {/* HEADER */}
          <div className="flex flex-col gap-y-4 pb-4">
            {/* LOGO */}
            <LogoHp size={48} className="w-12" />
            {/* TITLE */}
            <h1 className="text-4xl text-[#212121]">Sign in</h1>
          </div>
          {/* INPUTS */}
          <div className="flex flex-col gap-y-3 w-full pb-8">
            {/* USERNAME/EMAIL */}
            <TextBox label="Username or Email Address" placeholder="Enter your username or email" required />
            {/* PASSWORD */}
            <Password label="Password" placeholder="Enter your password" required />
          </div>
          {/* SIGN IN */}
          <Link href="/devices">
            <Button className="w-full">Sign in</Button>
          </Link>
        </div>
      </div>
      {/* FOOTER */}
      <CustomFooter />
    </div>
  );
}
