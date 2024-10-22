import React, { useEffect, useState } from "react";
import { SaveButtonComponent } from "../saveButtonComponent/SaveButtonComponent";
import heartWhiteIcon from "@/app/assets/icons/heart-white-icon.svg";
import comparisonWhiteIcon from "@/app/assets/icons/comparison-icon-white.svg";
import { useComponentsStore, useWishlistStore } from "@/app/hooks/hooks";
import { nanoid } from "@reduxjs/toolkit";

export function BuyConfigurationComponent() {
  const [price, setPrice] = useState(0);
  const [addedToWishList, setAddedToWishList] = useState(false);
  const { componentsStore, getPriceOfConfigurator } = useComponentsStore();
  const { addAssemblyToWishlist } = useWishlistStore();
  useEffect(() => {
    setPrice(getPriceOfConfigurator() || 0);
  }, [componentsStore]);

  useEffect(() => setAddedToWishList(false), [componentsStore]);

  return (
    <div className="rounded-[20px] flex flex-col gap-[20px] border-[1px] border-[#dde1e7] px-[25px] py-[20px] mb-[10px] max-lg:border-none max-lg:p-0 max-lg:mt-[9px]">
      <button className="w-full py-[12px] px-[26px] rounded-[38px] bg-[#0260E8] text-[white] text-[20px] font-[600] text-nowrap max-lg:w-full max-lg:flex max-lg:justify-between max-lg:items-center hover:opacity-50">
        Купить сборку <span>{price.toLocaleString()} ₽</span>
      </button>
      <button
        onClick={() => {
          if (!addedToWishList) {
            addAssemblyToWishlist({
              component: componentsStore,
              price: price,
              name: "Сборка",
              id: nanoid(),
              isAssembly: true,
            });
            setAddedToWishList(true);
          }
        }}
        className={`flex justify-between items-center gap-[5px] max-lg:hidden`}
      >
        <p className="text-[17px] font-[600] whitespace-nowrap">
          Сохранить конфигурацию
        </p>
        {heartWhiteIcon && (
          <SaveButtonComponent
            icon={heartWhiteIcon}
            isActive={addedToWishList}
            alt={"Сохранить конфигурацию"}
          />
        )}
      </button>
      {/* <div className="flex justify-between items-center gap-[5px] max-lg:hidden">
        <p className="text-[17px] font-[600]">Добавить в сравнение</p>
        {comparisonWhiteIcon && (
          <SaveButtonComponent
            icon={comparisonWhiteIcon}
            isActive={false}
            alt={"Добавить в сравнение"}
          />
        )}
      </div> */}
    </div>
  );
}
