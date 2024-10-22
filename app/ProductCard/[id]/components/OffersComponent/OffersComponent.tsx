"use client";
import React, { Dispatch, memo, SetStateAction, useState } from "react";
import { OfferItem } from "../OfferItem/OfferItem";
import { IComponentsResults } from "@/app/types";

export const OffersComponent = memo(function OffersComponent({
  data,
  offersLimit,
  setOffersLimit,
}: {
  data: IComponentsResults;
  offersLimit: boolean;
  setOffersLimit: Dispatch<SetStateAction<boolean>>;
}) {
  // const [offersLimit, setOffersLimit] = useState(data?.offers?.length | 3);
  if (!data.offers) {
    return;
  }
  return (
    <div className="max-lg:flex max-lg:flex-col max-lg:gap-[10px]">
      {data?.offers
        .slice(0, offersLimit ? data?.offers.length : 2)
        .map((offer: any, index: number) => {
          return <OfferItem key={index} offer={offer} data={data} />;
        })}
      <button
        className={`w-[215px] mt-[20px]  bg-[#0260E8] ml-auto text-[white] rounded-[38px] text-[18px] py-[8px] px-[12px] mb-[23px] max-lg:hidden ${
          data?.offers?.length <= 2 && "hidden"
        }`}
        onClick={() => {
          setOffersLimit((prev: boolean) => !prev);
        }}
      >
        {!offersLimit ? "Смотреть все цены" : "Скрыть все цены"}
      </button>
    </div>
  );
});
