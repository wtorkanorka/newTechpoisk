"use client";

import Image from "next/image";
import React, { memo, useEffect, useState } from "react";
import settingImg from "@/assets//icons/settingImg.svg";
import arrowDownWhite from "@/assets/icons/arrow-down-white.svg";
import heartGrayIcon from "@/assets/icons/heart-icon-gray.svg";
import comparisonGrayIcon from "@/assets/icons/comparison-icon-gray.svg";
import Link from "next/link";
import { SellersComponents } from "./components/SellersComponents";
import { ProductManagerButton } from "../productManagerButton/ProductManagerButton";
import ModalPortal from "../modalPortal/ModalPortal";
import { useIsMobileWindow, useWishlistStore } from "@/hooks/hooks";
import { IComponentsGlobal, IComponentsResults, IOffers } from "@/app/types";
import { nanoid } from "@reduxjs/toolkit";

export const ProductRowComponent = memo(
  ({ data }: { data: IComponentsResults }) => {
    const { isMobileWindow } = useIsMobileWindow();
    const {
      addComponentToWishlist,
      wishlistStore,
      componentIsInWishlist,
      deleteFromWishlist,
    } = useWishlistStore();
    const [isShowPrices, setIsShowPrices] = useState(false);
    function findMinAndMaxPrice(array: IOffers[]): string {
      //Возвращает строку такого типа 10 000 - 10 490 ₽

      if (!array || array.length === 0) {
        return "";
      }

      const sortedPrices = array
        .map((obj: any) => obj.price)
        .sort((a: number, b: number) => a - b);

      if (sortedPrices[0] === sortedPrices[sortedPrices.length - 1]) {
        return `${sortedPrices[0].toLocaleString()} ₽`;
      } else {
        return `${sortedPrices[0].toLocaleString()} - ${sortedPrices[
          sortedPrices.length - 1
        ].toLocaleString()} ₽`;
      }
    }
    const isActive = componentIsInWishlist({ id: data.id });
    return (
      <>
        <div className="flex justify-between max-w-full gap-[30px] max-lg:gap-[20px] items-center py-[18px] max-xl:flex-wrap p-2 border-b border-[#DDE1E7]">
          <Link
            href={`/ProductCard/${data.id}`}
            className="flex items-center gap-[65px] max-lg:gap-[10px]"
          >
            <Image
              src={
                data.pictures && data.pictures[0]
                  ? data.pictures[0].url
                  : settingImg
              }
              width={
                data.pictures && data.pictures[0] ? data.pictures[0].width : 97
              }
              height={
                data.pictures && data.pictures[0]
                  ? data.pictures[0].height
                  : 120
              }
              alt="productRowCard"
              className={`max-w-[97px] min-w-[99px] max-lg:min-w-[70px] max-lg:max-w-[71px]`}
            />
            <div className="flex flex-col gap-[6px] max-w-[466px]">
              <h3 className="text-left text-[24px] font-[400] max-lg:text-[16px]">
                {data.name}
              </h3>
              <p className="text-left text-[18px] font-[400] text-[#9e9e9e] max-lg:text-[12px]">
                {data?.propertyCategories.properties
                  ?.map((prop: any) => prop.value)
                  .join(", ")}
              </p>
            </div>
          </Link>
          <div className="flex items-end gap-[27px] max-lg:w-full max-lg:justify-between">
            <div className="flex items-center flex-col gap-[16px]">
              <p className="text-[24px] font-[600] max-lg:text-[16px] text-center w-full">
                {findMinAndMaxPrice(data.offers)}
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
            <div className="flex items-center gap-[20px] min-w-[80px] max-lg:gap-[10px]">
              <ProductManagerButton
                isActive={isActive}
                title="Добавить в избранное"
                isWishListButton={true}
                iconSize={30}
                onClickFunc={() => {
                  const minPrice = Math.min(
                    ...data.offers.map((item) => item.price)
                  );
                  const dataForWishlist = {
                    component: data,
                    price: minPrice, //Для компонента я испльзую минимальную цену
                    name: data.name,
                    isAssembly: false,
                    id: nanoid(),
                  };
                  if (isActive) {
                    deleteFromWishlist({ id: data.id });
                  } else {
                    addComponentToWishlist(dataForWishlist);
                  }
                }}
              />
              {/* <ProductManagerButton isComparisonButton={true} iconSize={30} /> */}
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
              ? "fixed inset-0 backdrop-blur-md  flex flex-col justify-end z-20"
              : ""
          }`}
        >
          <div
            className={`${
              isShowPrices && !isMobileWindow ? "h-full opacity-1" : ""
            }${
              !isShowPrices
                ? "h-0 opacity-0 overflow-auto pointer-events-none translate-x-[0]"
                : "translate-x-[100%]"
            }${
              isShowPrices && isMobileWindow
                ? "flex flex-col justify-end items-center translate-y-[0%]!"
                : "translate-y-[100%]"
            }
          transition-all`}
          >
            <SellersComponents offers={data.offers} data={data} />
          </div>
        </div>
      </>
    );
  }
);
