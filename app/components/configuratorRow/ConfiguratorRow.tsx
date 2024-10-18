"use client";
import { IComponentsResults, IComponentsResultsInStore } from "@/app/types";
import React from "react";
import { ConfiguratorRowComponent } from "./components/ConfiguratorRowComponent";
import { namesSearchTableName } from "@/app/hooks/hooks";
import plusIcon from "@/app/assets/icons/plus-icon-black.svg";
import Image from "next/image";

interface IConfiguratorRowProps {
  rowName: {
    ru: string;
    slug: namesSearchTableName;
  };
  productCount: number;
  howManyComponentsMustBe: "one" | "few";
  componentsArr: IComponentsResultsInStore[] | [];
  isComparison: null | true | false;
}
export function ConfiguratorRow<T extends IConfiguratorRowProps>({
  rowName = { ru: "Процессор", slug: "processor" },
  productCount = 0,
  howManyComponentsMustBe = "one", // one | few //В конфигураторе есть поля где может быть только 1 компонет, например материнка
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
    <div
      className={`border-[1px] rounded-[20px] border-[#dde1e7] py-[31px] px-[35px] grid ${
        componentsArr.length == 0
          ? "grid-cols-[0.9fr_2fr_1fr]"
          : "grid-cols-[0.4fr_2fr]"
      } gap-4 cursor-pointer`}
    >
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

      {componentsArr.length == 0 && (
        <p className="text-[17px] font-[300] text-[#9E9E9E] max-lg:text-[11px] self-center max-lg:text-center">
          {pluralize(productCount)}
        </p>
      )}
      {componentsArr.length !== 0 && (
        <div className="flex flex-col">
          {componentsArr.map((component, index) => {
            return (
              <ConfiguratorRowComponent
                component={component}
                key={index}
                howManyComponentsMustBe={howManyComponentsMustBe}
                rowName={rowName}
              />
            );
          })}
        </div>
      )}
      {componentsArr.length == 0 && (
        <Image
          src={plusIcon}
          width={24}
          height={24}
          alt="plus"
          className="min-w-[24px] max-lg:min-w-[17px] justify-self-end place-self-center"
        />
      )}
    </div>
  );
}
