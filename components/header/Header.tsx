import Image from "next/image";
import React from "react";
import Link from "next/link";

import { HeaderSecondLayer } from "./components/HeaderSecondLayer";
import { HeaderFirstLayer } from "./components/HeaderFirstLayer";

export default function Header() {
  return (
    <div className="w-full px-[15px] py-[15px]">
      <div className="flex flex-col gap-[15px] max-w-[1300px] mx-auto">
        <HeaderFirstLayer />
        <HeaderSecondLayer />
      </div>
    </div>
  );
}
