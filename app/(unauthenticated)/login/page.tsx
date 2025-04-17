"use client";
import CustomFooter from "@/components/footer";
import CustomHeader from "@/components/header";
import { LogoHp, TextBox, Password, Button } from "@veneer/core";
import { login } from "@/clientLib";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = await login(username, password);
    if (!user) return;

    router.push("/devices");
  };

  const updateUsername = (username: string) => setUsername(username);
  const updatePassword = (password: string) => setPassword(password);

  return (
    <div className="flex flex-col h-screen overflow-hidden xl:mx-auto">
      {/* HEADER */}
      <CustomHeader page="login" />
      {/* BODY */}
      <div className="flex items-center justify-center h-full bg-[#d3d3d3]">
        {/* MAIN */}
        <form onSubmit={onLogin} className="flex flex-col items-start justify-center bg-white w-full max-w-md max-h-full px-12 py-9 rounded-2xl">
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
            <TextBox label="Username or Email Address" placeholder="Enter your username or email" onChange={updateUsername} required />
            {/* PASSWORD */}
            <Password label="Password" placeholder="Enter your password" onChange={updatePassword} required />
          </div>
          {/* SIGN IN */}
          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </form>
      </div>
      {/* FOOTER */}
      <CustomFooter />
    </div>
  );
}
