import Image from "next/image";
import React from "react";

interface ISaveButtonComponent {
  icon: HTMLImageElement;
  isActive: boolean;
  alt: string;
}
export function SaveButtonComponent<T extends ISaveButtonComponent>({
  icon,
  isActive,
  alt = "",
}: T) {
  return (
    <div
      className={`rounded-[34px] flex items-center justify-between ${
        isActive ? "bg-[#FF5252]" : "bg-[#0260E8]"
      } min-w-[51px] min-h-[51px] p-[11px] w-[52px] h-[52px] hover:opacity-50`}
    >
      <Image src={icon} width={30} height={30} alt={alt} />
    </div>
  );
}
