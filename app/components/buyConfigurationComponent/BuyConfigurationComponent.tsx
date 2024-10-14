import React from "react";
import { SaveButtonComponent } from "../saveButtonComponent/SaveButtonComponent";
import heartWhiteIcon from "@/app/assets/icons/heart-white-icon.svg";
import comparisonWhiteIcon from "@/app/assets/icons/comparison-icon-white.svg";

export function BuyConfigurationComponent() {
  return (
    <div className="rounded-[20px] flex flex-col gap-[20px] border-[1px] border-[#dde1e7] px-[25px] py-[20px] mb-[10px] max-lg:border-none max-lg:p-0 max-lg:mt-[9px]">
      <button className="w-full py-[12px] px-[26px] rounded-[38px] bg-[#0260E8] text-[white] text-[20px] font-[600] text-nowrap max-lg:w-full max-lg:flex max-lg:justify-between max-lg:items-center hover:opacity-50">
        Купить сборку <span>24 999 ₽</span>
      </button>
      <div className="flex justify-between items-center gap-[5px] max-lg:hidden">
        <p className="text-[17px] font-[600]">Сохранить конфигурацию</p>
        {heartWhiteIcon && (
          <SaveButtonComponent
            icon={heartWhiteIcon}
            isActive={false}
            alt={"Сохранить конфигурацию"}
          />
        )}
      </div>
      <div className="flex justify-between items-center gap-[5px] max-lg:hidden">
        <p className="text-[17px] font-[600]">Добавить в сравнение</p>
        {comparisonWhiteIcon && (
          <SaveButtonComponent
            icon={comparisonWhiteIcon}
            isActive={false}
            alt={"Добавить в сравнение"}
          />
        )}
      </div>
    </div>
  );
}
