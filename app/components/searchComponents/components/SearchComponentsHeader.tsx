import Image from "next/image";
import React from "react";
import closeIconGray from "@/app/assets/icons/close-icon-gray.svg";
import sliderHorizontalIcon from "@/app/assets/icons/Sliders_horizontal.svg";
import { useIsMobileWindow } from "@/app/hooks/hooks";
interface ISearchComponentsHeader {
  headerName: { ru: string; slug: string };
  onClose?: () => void;
  setExpandFilter: (value: boolean) => void;
}

export function SearchComponentsHeader<T extends ISearchComponentsHeader>({
  onClose,
  headerName,
  setExpandFilter,
}: T): React.ReactNode {
  const { isMobileWindow } = useIsMobileWindow();
  return (
    <div className="flex items-center justify-between gap-[10px]">
      <div className="flex items-center gap-[20px] max-lg:gap-[10px]">
        <h2 className="text-[32px] font-normal max-lg:text-[20px]">
          {headerName.ru}
        </h2>
        <h3 className="text-[32px] font-normal text-[#9E9E9E] max-lg:text-[20px]">
          59 товаров
        </h3>
      </div>

      <div className="flex items-center gap-[30px]">
        {isMobileWindow && (
          <button
            onClick={(event) => {
              event.stopPropagation();
              setExpandFilter(true);
            }}
            className="min-w-[22px] hover:opacity-50"
          >
            <Image
              src={sliderHorizontalIcon}
              width={22}
              height={22}
              alt={"sliderHorizontalIcon"}
            />
          </button>
        )}
        <button
          className="text-[20px] font-normal flex items-center gap-[1px] hover:opacity-50 max-lg:hidden"
          onClick={(event) => {
            event.stopPropagation();
            onClose && onClose();
          }}
        >
          Закрыть
          <Image
            src={closeIconGray}
            width={23}
            height={23}
            alt="close img gray"
          />
        </button>
        <button
          className="text-[20px] font-normal flex items-center gap-[1px] hover:opacity-50 lg:hidden min-w-[22px]"
          onClick={(event) => {
            event.stopPropagation();
            onClose && onClose();
          }}
        >
          <Image
            src={closeIconGray}
            width={23}
            height={23}
            alt="close img gray"
          />
        </button>
      </div>
    </div>
  );
}
