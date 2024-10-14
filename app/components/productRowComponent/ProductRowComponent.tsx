"use client";

import Image from "next/image";
import React, { memo, useEffect, useState } from "react";
import settingImg from "@/app/assets//icons/settingImg.svg";
import arrowDownWhite from "@/app/assets/icons/arrow-down-white.svg";
import heartGrayIcon from "@/app/assets/icons/heart-icon-gray.svg";
import comparisonGrayIcon from "@/app/assets/icons/comparison-icon-gray.svg";
import Link from "next/link";
import { SellersComponents } from "./components/SellersComponents";
import { ProductManagerButton } from "../productManagerButton/ProductManagerButton";
import ModalPortal from "../modalPortal/ModalPortal";
import { useIsMobileWindow } from "@/app/hooks/hooks";
export const ProductRowComponent = memo(() => {
  const { isMobileWindow } = useIsMobileWindow();
  const [isShowPrices, setIsShowPrices] = useState(false);

  return (
    <>
      <div className="flex justify-between max-w-full gap-[30px] max-lg:gap-[20px] items-center py-[18px] max-xl:flex-wrap p-2 border-b border-[#DDE1E7]">
        <Link
          href={"/"}
          className="flex items-center gap-[65px] max-lg:gap-[10px]"
        >
          <Image
            src={settingImg}
            width={97}
            height={120}
            alt="productRowCard"
            className="max-w-[97px] max-lg:max-w-[70px] min-w-[69px]"
          />
          <div className="flex flex-col gap-[6px] max-w-[466px]">
            <h3 className="text-left text-[24px] font-[400] max-lg:text-[16px]">
              Процессор Intel Core i5 - 12400F OEM
            </h3>
            <p className="text-left text-[18px] font-[400] text-[#9e9e9e] max-lg:text-[12px]">
              LGA 1700, 6-ядерный, 2500 МГц, Turbo: 4400 МГц, Alder Lake, Кэш L2
              - 7.5 Мб, L3 - 18 Мб, 10 нм, 117 Вт
            </p>
          </div>
        </Link>
        <div className="flex items-end gap-[27px] max-lg:w-full max-lg:justify-between">
          <div className="flex items-center flex-col gap-[16px]">
            <p className="text-[24px] font-[600] max-lg:text-[16px]">
              10 000 - 16 490 ₽
            </p>
            <button
              onClick={(event) => {
                event.stopPropagation();
                setIsShowPrices((prev) => !prev);
              }}
              className="flex items-center justify-between py-[7px] px-[19px] bg-[#0260e8] rounded-[20px] text-[18px] text-[white] gap-[9px] font-[400] min-w-[201px] max-lg:text-[14px] max-lg:font-[600] max-lg:gap-[10px] max-lg:min-w-[95px] hover:opacity-50"
            >
              <p className="max-lg:hidden">Посмотреть цены</p>
              <p className="lg:hidden">Цены</p>
              <Image
                src={arrowDownWhite}
                width={14}
                height={14}
                alt="arrowDownWhite"
                className={`${isShowPrices ? "rotate-180" : ""}`}
              />
            </button>
          </div>
          <div className="flex items-center gap-[20px] min-w-[80px] mb-[6px] max-lg:mb-[3px] max-lg:gap-[10px]">
            <ProductManagerButton isWishListButton={true} iconSize={30} />
            <ProductManagerButton isComparisonButton={true} iconSize={30} />
          </div>
        </div>
      </div>
      <div
        onClick={(event) => {
          event.stopPropagation();
          isMobileWindow && isShowPrices && setIsShowPrices(false);
        }}
        className={`${
          isMobileWindow && isShowPrices
            ? "fixed inset-0 backdrop-blur-md z-[2] flex flex-col justify-end"
            : ""
        }`}
      >
        <div
          className={`${
            isShowPrices && !isMobileWindow ? "h-full opacity-1" : ""
          }${
            !isShowPrices
              ? "h-0 opacity-0 overflow-auto pointer-events-none"
              : ""
          }${
            isShowPrices && isMobileWindow
              ? "flex flex-col justify-end items-center translate-y-[0%]!"
              : ""
          }
          transition-transform`}
        >
          <SellersComponents />
        </div>
      </div>
    </>
  );
});
