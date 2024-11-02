import { namesSearchTableName, useComponentsStore } from "@/hooks/hooks";
import Image from "next/image";
import React, { memo, useState } from "react";
import arrowBlack from "@/assets/icons/arrow-down-black-icon.svg";

export const CountOfComponentsChangerComponent = memo(
  ({
    data,
    currentState = 1,
  }: {
    data: {
      selectedOfferId: number;
      searchTableName: { ru: string; slug: namesSearchTableName };
      count: number;
    };
    currentState: number;
  }) => {
    const { changeCount } = useComponentsStore();
    const [isExpand, setIsExpand] = useState(false);
    return (
      <div className="relative">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsExpand((prev) => !prev);
          }}
          className="py-[3px] px-[7px] border-[black] rounded-[10px] border-[1px] flex items-center gap-[6px] z-0"
        >
          {currentState}
          <Image
            src={arrowBlack}
            width={16}
            height={16}
            alt="arrow black"
            className={isExpand ? "rotate-180" : ""}
          />
        </button>
        <ul
          className={`${
            isExpand
              ? "translate-x-0 opacity-100 transition-all"
              : "overflow-hidden opacity-0 pointer-events-none transition-all translate-x-[-100px]"
          } absolute  bg-[white] shadow-xl z-[1]`}
        >
          <li className="flex items-center justify-center hover:bg-[#ddd] rounded-t-[4px]">
            <button
              className="text-center py-[3px] px-[10px] whitespace-nowrap"
              onClick={(e) => {
                e.stopPropagation();
                changeCount({
                  offerId: data.selectedOfferId,
                  searchTableName: data.searchTableName,
                  count: 1,
                });
                setIsExpand(false);
              }}
            >
              1 шт
            </button>
          </li>
          <li className="flex items-center justify-center hover:bg-[#ddd] rounded-t-[4px]">
            <button
              className="text-center py-[3px] px-[10px] whitespace-nowrap"
              onClick={(e) => {
                e.stopPropagation();
                changeCount({
                  offerId: data.selectedOfferId,
                  searchTableName: data.searchTableName,
                  count: 2,
                });
                setIsExpand(false);
              }}
            >
              2 шт
            </button>
          </li>
          <li className="flex items-center justify-center hover:bg-[#ddd] rounded-t-[4px]">
            <button
              className="text-center py-[3px] px-[10px] whitespace-nowrap"
              onClick={(e) => {
                e.stopPropagation();
                changeCount({
                  offerId: data.selectedOfferId,
                  searchTableName: data.searchTableName,
                  count: 3,
                });
                setIsExpand(false);
              }}
            >
              3 шт
            </button>
          </li>
          <li className="flex items-center justify-center hover:bg-[#ddd] rounded-t-[4px]">
            <button
              className="text-center py-[3px] px-[10px] whitespace-nowrap"
              onClick={(e) => {
                e.stopPropagation();
                changeCount({
                  offerId: data.selectedOfferId,
                  searchTableName: data.searchTableName,
                  count: 4,
                });
                setIsExpand(false);
              }}
            >
              4 шт
            </button>
          </li>
          <li className="flex items-center justify-center hover:bg-[#ddd] rounded-t-[4px]">
            <button
              className="text-center py-[3px] px-[10px] whitespace-nowrap"
              onClick={(e) => {
                e.stopPropagation();
                changeCount({
                  offerId: data.selectedOfferId,
                  searchTableName: data.searchTableName,
                  count: 5,
                });
                setIsExpand(false);
              }}
            >
              5 шт
            </button>
          </li>
          <li className="flex items-center justify-center hover:bg-[#ddd] rounded-t-[4px]">
            <button
              className="text-center py-[3px] px-[10px] whitespace-nowrap"
              onClick={(e) => {
                e.stopPropagation();
                changeCount({
                  offerId: data.selectedOfferId,
                  searchTableName: data.searchTableName,
                  count: 6,
                });
                setIsExpand(false);
              }}
            >
              6 шт
            </button>
          </li>
        </ul>
      </div>
    );
  }
);
