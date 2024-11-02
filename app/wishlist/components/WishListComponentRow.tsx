"use client";

import { IWishList } from "@/redux/services/wishlistSlice";
import Image from "next/image";
import Link from "next/link";
import React, {
  Dispatch,
  memo,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import settingImg from "@/assets/icons/settingImg.svg";
import arrowDownWhite from "@/assets/icons/arrow-down-white.svg";
import { ProductManagerButton } from "@/components/productManagerButton/ProductManagerButton";
import { useIsMobileWindow, useWishlistStore } from "@/hooks/hooks";
import { SellersComponents } from "@/components/productRowComponent/components/SellersComponents";
import { IOffers } from "@/app/types";

export const WishListComponentRow = memo(
  ({
    product,
    selectedData,
    setSelectedData,
  }: {
    product: IWishList;
    selectedData: IWishList[];
    setSelectedData: Dispatch<SetStateAction<IWishList[]>>;
  }) => {
    const [isShowPrices, setIsShowPrices] = useState(false);
    const { deleteFromWishlist, wishlistStore } = useWishlistStore();
    const { isMobileWindow } = useIsMobileWindow();
    // const [isSelected, setIsSelected] = useState<boolean>(false);

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

    return (
      <>
        <div className="flex justify-between max-w-full items-center py-[18px] max-xl:flex-wrap p-2 border-b border-[#DDE1E7]">
          <div className="flex items-center gap-[36px] max-lg:gap-[10px]">
            <input
              type="checkbox"
              className="min-w-[16px] min-h-[16px]"
              onChange={() => {
                setSelectedData((prevSelected) => {
                  if (prevSelected.some((elem) => elem.id === product.id)) {
                    return prevSelected.filter(
                      (elem) => elem.id !== product.id
                    );
                  } else {
                    return [...prevSelected, product];
                  }
                });
              }}
            />

            <Link
              href={`/ProductCard/${product.component.id}`}
              className="flex items-center gap-[65px] max-lg:gap-[10px]"
            >
              <Image
                src={
                  product.component.pictures && product.component.pictures[0]
                    ? product.component.pictures[0].url
                    : settingImg
                }
                width={
                  product.component.pictures && product.component.pictures[0]
                    ? product.component.pictures[0].width
                    : 97
                }
                height={
                  product.component.pictures && product.component.pictures[0]
                    ? product.component.pictures[0].height
                    : 120
                }
                alt="productRowCard"
                className={`max-w-[97px] max-lg:min-w-[70px] max-lg:max-w-[71px]`}
              />
              <div className="flex flex-col gap-[6px] max-w-[466px]">
                <h3 className="text-left text-[24px] font-[400] max-lg:text-[16px]">
                  {product.name}
                </h3>
                <p className="text-left text-[18px] font-[400] text-[#9e9e9e] max-lg:text-[12px]">
                  {product.component?.propertyCategories.properties
                    ?.map((prop: any) => prop.value)
                    .join(", ")}
                </p>
              </div>
            </Link>
          </div>
          <div className="flex items-end gap-[27px] max-lg:w-full max-lg:justify-between">
            <div className="flex items-center flex-col gap-[16px]">
              <p className="text-[24px] font-[600] max-lg:text-[16px] text-center w-full">
                {findMinAndMaxPrice(product.component.offers)}
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

            <ProductManagerButton
              isWishListButton={true}
              title="Убрать из избранного"
              onClickFunc={() => {
                deleteFromWishlist({ id: product.id });
              }}
            />
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
            <SellersComponents
              offers={product.component.offers}
              data={product.component}
            />
          </div>
        </div>
      </>
    );
  }
);
