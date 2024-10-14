import React, { memo } from "react";
import magnifierGrayIcon from "@/app/assets/icons/magnifier-gray-icon.svg";
import Image from "next/image";

export const SearchComponentsInput = memo(() => {
  return (
    <div className="flex justify-between gap-[8px] rounded-[30px] border border-[#dde1e7] py-[10px] px-[19px] items-center w-full">
      <input
        type="text"
        className="outline-none h-[20px] w-full placeholder-[#9E9E9E]"
        placeholder="Поиск по категории"
      />
      <Image
        src={magnifierGrayIcon}
        width={21}
        height={21}
        alt="magnifierGrayIcon"
      />
    </div>
  );
});