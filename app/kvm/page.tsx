"use client";
import CustomFooter from "@/components/footer";
import CustomHeader from "@/components/header";
import { Button } from "@veneer/core";

export default function Login() {
  return (
    <div className="flex flex-col h-screen overflow-hidden xl:mx-auto">
      {/* HEADER */}
      <CustomHeader />
      {/* BODY */}
      <div className="flex items-center justify-center h-full bg-[#d3d3d3]">
        {/* MAIN */}
        <div className="flex flex-col items-center justify-center gap-y-6 w-full max-w-screen-xl h-full pt-12 pb-6">
          {/* KVM */}
          <div className="bg-white w-full h-full rounded-2xl"></div>
          {/* BUTTONS */}
          <div className="flex items-center justify-center gap-x-12">
            {/* POWER ON/OFF */}
            <Button customStyle={{ paddingLeft: 48, paddingRight: 48 }}>Power On</Button>
            {/* END KVM */}
            <Button customStyle={{ paddingLeft: 48, paddingRight: 48 }}>End KVM</Button>
          </div>
        </div>
      </div>
      {/* FOOTER */}
      <CustomFooter />
    </div>
  );
}
