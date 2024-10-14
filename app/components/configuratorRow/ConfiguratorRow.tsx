"use client";
import React from "react";

interface IConfiguratorRowProps {
  rowName: {
    ru: string;
    slug: string;
  };
  productCount: number;
  howManyComponentsMustBe: string;
  componentsArr: any[] | [];
  isComparison: null | true | false;
}
export function ConfiguratorRow<T extends IConfiguratorRowProps>({
  rowName = { ru: "", slug: "" },
  productCount = 0,
  howManyComponentsMustBe = "", // one | few //В конфигураторе есть поля где может быть только 1 компонет, например материнка
  componentsArr = [],
  isComparison = null,
}: T) {
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
    <div className="border-[1px] rounded-[20px] border-[#dde1e7] py-[31px] px-[35px] grid grid-cols-[0.9fr_2fr_1fr] gap-4 cursor-pointer ">
      <div className="flex flex-col justify-center max-lg:items-start">
        {isComparison !== null ? (
          isComparison == true ? (
            <p className="text-[14px] font-[400] text-[#7CD536]">Совместимо</p>
          ) : (
            <p className="text-[14px] font-[400] text-[#FF5252]">
              Не совместимо
            </p>
          )
        ) : (
          <></>
        )}
        <h3 className="text-[20px] font-[600] max-lg:text-[12px] max-lg:font-[400] max-lg:self-baseline">
          {rowName.ru}
        </h3>
      </div>

      <p className="text-[17px] font-[300] text-[#9E9E9E] max-lg:text-[11px] self-center max-lg:text-center">
        {pluralize(productCount)}
      </p>

      <div className="justify-self-end place-self-center">Тут кнопки</div>
    </div>
  );
}
