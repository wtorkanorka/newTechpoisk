"use client";

import React, { memo, useState } from "react";
import blackArrowDown from "@/assets/icons/arrow-down-black-icon.svg";
import Image from "next/image";

interface IHiddenComponent {
  children: React.ReactNode;
  title: string;
}

export const HiddenComponent = memo(({ children, title }: IHiddenComponent) => {
  const [isExpand, setIsExpand] = useState(false);
  return (
    <div className={`flex flex-col items-start `}>
      <h4 className="text-[20px] text-left font-[400] mb-[14px]">{title}</h4>
      {isExpand && (
        <button
          className="text-[16px] font-[300] text-[#474747] hover:opacity-50 w-full text-left"
          onClick={(event) => {
            event.stopPropagation();
            setIsExpand((prev) => !prev);
          }}
        >
          {isExpand ? "Скрыть" : "Показать всё"}
        </button>
      )}
      <div className={`${!isExpand && "max-h-[200px] overflow-hidden"} w-full`}>
        {children}
      </div>
      <button
        className="text-[16px] font-[300] text-[#474747] hover:opacity-50 w-full text-left"
        onClick={(event) => {
          event.stopPropagation();
          setIsExpand((prev) => !prev);
        }}
      >
        {isExpand ? "Скрыть" : "Показать всё"}
      </button>
    </div>
  );
});
