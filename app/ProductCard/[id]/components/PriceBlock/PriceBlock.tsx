"use client";
import styles from "./style.module.css";
import heartBlack from "@/app/assets/icons/black-heart.svg";
// import heart from "../../../../../assets/icons/heart.svg";
import graph from "../../../../../assets/icons/comparison-black-icon.svg";
import Image from "next/image";
import { Sellers } from "./Sellers";

import { useState } from "react";
import {
  namesSearchTableName,
  useComponentsStore,
  useWishlistStore,
} from "@/app/hooks/hooks";
import { IComponentsResults, IOffers } from "@/app/types";
import { nanoid } from "@reduxjs/toolkit";

export const PriceBlock = ({
  offers,
  data,
}: {
  offers: IOffers[];
  data: IComponentsResults;
}) => {
  const { componentIsInWishlist, addComponentToWishlist, deleteFromWishlist } =
    useWishlistStore();
  function findMinAndMaxPrice(array: any): string | any {
    if (!array || array.length === 0) {
      return "";
    }

    const sortedPrices = array
      .map((obj: any) => obj.price)
      .sort((a: number, b: number) => a - b);

    if (sortedPrices[0] === sortedPrices[sortedPrices.length - 1]) {
      return (
        <p className="max-lg:text-[20px] whitespace-nowrap">
          <span className="max-lg:text-[24px]">
            {sortedPrices[0].toLocaleString()} ₽
          </span>
        </p>
      );
    } else {
      return (
        <p className="max-lg:text-[20px] font-extrabold max-lg:font-medium whitespace-nowrap">
          от{" "}
          <span className="max-lg:text-[24px] font-extrabold max-lg:font-medium ">
            {sortedPrices[0].toLocaleString()}
          </span>{" "}
          до{" "}
          <span className="max-lg:text-[24px] font-extrabold max-lg:font-medium">
            {sortedPrices[sortedPrices.length - 1].toLocaleString()} ₽
          </span>
        </p>
      );
    }
  }
  const searchTableNameNames: {
    [key: string]: {
      ru: string;
      slug: namesSearchTableName;
    };
  } = {
    motherboard: { ru: "Материнская плата", slug: "motherboard" },
    processor: { ru: "Процессор", slug: "processor" },
    ram: { ru: "Оперативная память", slug: "ram" },
    "hdd,ssd": { ru: "Хранение данных", slug: "hdd,ssd" },
    hdd: { ru: "Хранение данных", slug: "hdd,ssd" },
    ssd: { ru: "Хранение данных", slug: "hdd,ssd" },
    gpu: { ru: "Видеокарта", slug: "gpu" },
    power_supply: { ru: "Блок питания", slug: "power_supply" },
    case: { ru: "Корпус", slug: "case" },
    "cooler,liquid_cooling,case_fans": {
      ru: "Охлаждение",
      slug: "cooler,liquid_cooling,case_fans",
    },
    case_fans: {
      ru: "Охлаждение",
      slug: "cooler,liquid_cooling,case_fans",
    },
    liquid_cooling: {
      ru: "Охлаждение",
      slug: "cooler,liquid_cooling,case_fans",
    },
    cooler: {
      ru: "Охлаждение",
      slug: "cooler,liquid_cooling,case_fans",
    },
  };
  // const isInStore = componentIsInStore({
  //   searchTableName: {
  //     ru: searchTableNameNames[data.componentType].ru,
  //     slug: searchTableNameNames[data.componentType].slug,
  //   },
  //   data: data,
  // });
  const isInWishlist = componentIsInWishlist({ id: data.id });
  return (
    <div className={styles.container}>
      <div className={styles.price}>
        {/* от <span>8000</span> до <span>8680 ₽</span> */}
        {findMinAndMaxPrice(offers)}

        <div className={styles.buttonContainer}>
          <button
            onClick={() => {
              if (!isInWishlist) {
                const minPrice = Math.min(
                  ...data.offers.map((item) => item.price)
                );
                addComponentToWishlist({
                  component: data,
                  price: minPrice,
                  name: data.name,
                  id: nanoid(),
                  isAssembly: false,
                });
              } else {
                deleteFromWishlist({
                  id: data.id,
                  isAssembly: false,
                });
              }
            }}
            className={`${
              isInWishlist ? "bg-[#FF5252]" : "bg-[#dde1e7]"
            } hover:bg-[#ff8282] h-[51px] w-[51px] flex justify-center flex-col items-center  rounded-[50%]  max-lg:h-[37px] max-lg:w-[37px]`}
          >
            <svg
              width="26"
              height="23"
              viewBox="0 0 26 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.2003 3.23296C21.8753 1.90815 20.1189 1.09956 18.2483 0.953253C16.3777 0.806947 14.5163 1.33257 13.0003 2.43517C11.4099 1.2555 9.43033 0.720576 7.46024 0.938129C5.49016 1.15568 3.67589 2.10955 2.38281 3.60765C1.08973 5.10575 0.413872 7.03679 0.491346 9.01192C0.568819 10.9871 1.39387 12.8596 2.80034 14.2523L10.5628 22.0058C11.2129 22.6438 12.0883 23.0013 13.0003 23.0013C13.9124 23.0013 14.7878 22.6438 15.4378 22.0058L23.2003 14.2523C24.6598 12.788 25.479 10.8073 25.479 8.74265C25.479 6.67805 24.6598 4.69731 23.2003 3.23296ZM21.4378 12.5321L13.6753 20.2731C13.587 20.3621 13.4819 20.4327 13.366 20.4809C13.2502 20.529 13.1259 20.5539 13.0003 20.5539C12.8748 20.5539 12.7505 20.529 12.6347 20.4809C12.5188 20.4327 12.4137 20.3621 12.3253 20.2731L4.56284 12.4947C3.58254 11.4954 3.03361 10.1531 3.03361 8.75512C3.03361 7.35717 3.58254 6.0148 4.56284 5.01551C5.56179 4.03197 6.90906 3.48048 8.31284 3.48048C9.71663 3.48048 11.0639 4.03197 12.0628 5.01551C12.179 5.13234 12.3173 5.22508 12.4696 5.28836C12.6219 5.35165 12.7853 5.38423 12.9503 5.38423C13.1154 5.38423 13.2787 5.35165 13.4311 5.28836C13.5834 5.22508 13.7216 5.13234 13.8378 5.01551C14.8368 4.03197 16.1841 3.48048 17.5878 3.48048C18.9916 3.48048 20.3389 4.03197 21.3378 5.01551C22.3316 6.0017 22.8986 7.3368 22.9173 8.73478C22.936 10.1328 22.4049 11.4825 21.4378 12.4947V12.5321Z"
                fill={isInWishlist ? "white" : "black"}
              />
            </svg>
          </button>
          {/* <button className="h-[51px] w-[51px] flex justify-center items-center rounded-[50%] max-lg:rounded-[5px] bg-[#dde1e7] max-lg:h-[37.11px] max-lg:w-[37.11px]">
            <Image
              src={graph}
              alt="graph"
              className="max-lg:h-[22px] max-lg:w-[22px]"
            />
          </button> */}
        </div>
      </div>
      <div className="overflow-y-auto max-h-[306px] flex flex-col gap-[7px] overflow-x-[unset]">
        {offers?.map((e: IOffers) => {
          return <Sellers data={data} offerElement={e} key={e.id} />;
        })}
      </div>
    </div>
  );
};
