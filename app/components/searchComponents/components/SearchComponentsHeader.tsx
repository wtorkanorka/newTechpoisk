import Image from "next/image";
import React from "react";
import closeIconGray from "@/app/assets/icons/close-icon-gray.svg";
import sliderHorizontalIcon from "@/app/assets/icons/Sliders_horizontal.svg";
import { useIsMobileWindow } from "@/app/hooks/hooks";
import { usePathname, useSearchParams } from "next/navigation";
interface ISearchComponentsHeader {
  headerName: { ru: string; slug: string };
  onClose?: () => void;
  setExpandFilter: (value: boolean) => void;
  countOfComponents: number;
}

export function SearchComponentsHeader<T extends ISearchComponentsHeader>({
  onClose,
  headerName,
  setExpandFilter,
  countOfComponents,
}: T): React.ReactNode {
  const { isMobileWindow } = useIsMobileWindow();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());
  function pluralize(count: number) {
    //Функция для сколнения слова от числа
    const pluralRules = new Intl.PluralRules("ru-RU");
    const pluralForm = pluralRules.select(count);
    let word;

    switch (pluralForm) {
      case "zero":
        word = "нет товаров";
        break;
      case "one":
        word = "товар";
        break;
      case "two":
        word = "товара";
        break;
      case "few":
        word = "товара";
        break;
      case "many":
        word = "товаров";
        break;
      default:
        word = "товаров";
    }

    return `${count} ${word}`;
  }

  return (
    <div className="flex items-center justify-between gap-[10px]">
      <div className="flex items-center gap-[20px] max-lg:gap-[10px]">
        <h2 className="text-[32px] font-normal max-lg:text-[20px]">
          {pathname == "/"
            ? headerName.ru
            : params.search
            ? headerName.ru + ` - ${params.search}`
            : headerName.ru}
        </h2>
        <h3 className="text-[32px] font-normal text-[#9E9E9E] max-lg:text-[20px]">
          {pluralize(countOfComponents)}
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
        {pathname == "/" && (
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
        )}
        {pathname == "/" && (
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
        )}
      </div>
    </div>
  );
}
