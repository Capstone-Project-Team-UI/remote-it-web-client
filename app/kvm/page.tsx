"use client";
import CustomFooter from "@/components/footer";
import CustomHeader from "@/components/header";
import { Button } from "@veneer/core";
import { useState } from "react";

export default function Login() {
  const [isPowerOn, setIsPowerOn] = useState(false);

  const powerOn = () => {
    console.log("Power On");
    setIsPowerOn(true);
  };

  const powerOff = () => {
    console.log("Power Off");
    setIsPowerOn(false);
  };

  const endKVM = () => {
    console.log("End KVM");
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden xl:mx-auto">
      {/* HEADER */}
      <CustomHeader user="user" page="kvm" />
      {/* BODY */}
      <div className="flex items-center justify-center h-full bg-[#d3d3d3]">
        {/* MAIN */}
        <div className="flex flex-col items-center justify-center gap-y-6 w-full max-w-screen-xl h-full pt-12 pb-6">
          {/* KVM */}
          <div className="bg-white w-full h-full rounded-2xl"></div>
          {/* BUTTONS */}
          <div className="flex items-center justify-center gap-x-12">
            {/* POWER ON/OFF */}
            <Button customStyle={{ paddingLeft: 48, paddingRight: 48 }} onClick={isPowerOn ? powerOff : powerOn}>
              {isPowerOn ? "Power Off" : "Power On"}
            </Button>
            {/* END KVM */}
            <Button customStyle={{ paddingLeft: 48, paddingRight: 48 }} onClick={endKVM}>
              End KVM
            </Button>
          </div>
        </div>
      </div>
      {/* FOOTER */}
      <CustomFooter />
    </div>
  );
}
