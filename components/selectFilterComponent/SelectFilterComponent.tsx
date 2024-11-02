"use client";

import Image from "next/image";
import React, { useState } from "react";
import arrowDownBlackIcon from "@/assets/icons/arrow-down-black-icon.svg";
import { ISelectFilterComponent } from "@/app/types";
import { useFiltersName } from "@/hooks/hooks";

export const SelectFilterComponent = ({
  filters,
  componentName,
}: {
  filters: ISelectFilterComponent[];
  componentName: string; //searchComponents или wishlist
}) => {
  const [isExpand, setIsExpand] = useState<boolean>(false);
  const { filter, setFilter } = useFiltersName(componentName);

  return (
    <div className="flex flex-col relative">
      <button
        onClick={(event) => {
          event.stopPropagation();
          setIsExpand((prev) => !prev);
        }}
        className="flex max-w-full gap-[6px] items-center select-none"
      >
        <p className="text-[20px] font-[400]">{filter[componentName]?.name}</p>
        <Image
          src={arrowDownBlackIcon}
          width={14}
          height={14}
          alt="arrowDownBlackIcon"
          className="rotate-180"
        />
      </button>
      <div
        className={`flex flex-col overflow-hidden bg-[white] p-[15px] items-start transition-transform ${
          isExpand ? "block" : "hidden"
        } absolute top-[34px] left-[1px] gap-[10px] text-[20px] font-[400] shadow-[0_1px_6px_0_rgba(0,0,0,0.25)]`}
      >
        {filters.map((e, index) => {
          return (
            <button
              key={index}
              onClick={(event) => {
                event.stopPropagation();
                setFilter({
                  newFiltersName: e.name,
                  newFiltersType: e.type,
                });
                setIsExpand(false);
              }}
              className="w-full hover:opacity-50 text-left whitespace-nowrap"
            >
              {e.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};
